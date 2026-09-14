import bcrypt from 'bcryptjs';
import pool from '../db.js';
import defaultCategories from '../utils/defaultCategories.js';

const DEMO_USER = {
	name: 'Rani',
	email: 'rani@gmail.com',
	password: '123456',
	currency: 'USD',
};

const roundMoney = (value) => Math.round(value * 100) / 100;

const dateForMonth = (monthsAgo, day) => {
	const date = new Date();
	date.setUTCDate(1);
	date.setUTCMonth(date.getUTCMonth() - monthsAgo);
	const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
	date.setUTCDate(Math.min(day, lastDay));
	return date.toISOString().slice(0, 10);
};

const buildTransactions = (categoryIds) => {
	const transactions = [];
	const monthSizes = [];
	const category = (name, type) => categoryIds[`${name}:${type}`];

	for (let monthsAgo = 23; monthsAgo >= 0; monthsAgo -= 1) {
		const monthIndex = 23 - monthsAgo;
		const monthStart = transactions.length;
		transactions.push(
			{ categoryId: category('Salary', 'income'), amount: 4800 + (monthIndex % 6) * 100, type: 'income', description: 'Monthly salary', notes: 'Primary income', day: 1 },
			{ categoryId: category('Rent', 'expense'), amount: 1450, type: 'expense', description: 'Apartment rent', notes: 'Monthly housing payment', day: 3 },
			{ categoryId: category('Utilities', 'expense'), amount: 155 + (monthIndex % 4) * 12, type: 'expense', description: 'Electricity and internet', notes: 'Monthly utilities', day: 8 },
			{ categoryId: category('Groceries', 'expense'), amount: 260 + (monthIndex % 5) * 18, type: 'expense', description: 'Grocery shopping', notes: 'Household groceries', day: 6 },
			{ categoryId: category('Food & Dining', 'expense'), amount: 180 + (monthIndex % 4) * 25, type: 'expense', description: 'Restaurants and coffee', notes: 'Dining out', day: 14 },
			{ categoryId: category('Transportation', 'expense'), amount: 120 + (monthIndex % 3) * 20, type: 'expense', description: 'Fuel and public transit', notes: 'Monthly transportation', day: 11 },
			{ categoryId: category('Entertainment', 'expense'), amount: 75 + (monthIndex % 3) * 15, type: 'expense', description: 'Movies and subscriptions', notes: 'Entertainment', day: 19 },
			{ categoryId: category('Shopping', 'expense'), amount: 110 + (monthIndex % 4) * 30, type: 'expense', description: 'Home and personal shopping', notes: 'Discretionary spending', day: 22 },
		);

		if (monthIndex % 3 === 0) {
			transactions.push({ categoryId: category('Freelance', 'income'), amount: 650 + (monthIndex % 4) * 75, type: 'income', description: 'Freelance project', notes: 'Side income', day: 17 });
		}
		if (monthIndex % 4 === 1) {
			transactions.push({ categoryId: category('Travel', 'expense'), amount: 420 + (monthIndex % 3) * 80, type: 'expense', description: 'Weekend trip', notes: 'Travel and lodging', day: 25 });
		}
		if (monthIndex % 5 === 2) {
			transactions.push({ categoryId: category('Healthcare', 'expense'), amount: 95 + (monthIndex % 3) * 35, type: 'expense', description: 'Pharmacy and checkup', notes: 'Healthcare', day: 12 });
		}
		monthSizes.push(transactions.length - monthStart);
	}
	return { transactions, monthSizes };
};

const seed = async () => {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		await client.query('DELETE FROM users WHERE email = $1', [DEMO_USER.email]);

		const passwordHash = await bcrypt.hash(DEMO_USER.password, 10);
		const userResult = await client.query(
			`INSERT INTO users (name, email, password_hash, currency)
			 VALUES ($1, $2, $3, $4) RETURNING id`,
			[DEMO_USER.name, DEMO_USER.email, passwordHash, DEMO_USER.currency],
		);
		const userId = userResult.rows[0].id;
		const categoryIds = {};

		for (const item of defaultCategories) {
			const result = await client.query(
				`INSERT INTO categories (user_id, name, type, icon, color, is_default)
				 VALUES ($1, $2, $3, $4, $5, true) RETURNING id`,
				[userId, item.name, item.type, item.icon, item.color],
			);
			categoryIds[`${item.name}:${item.type}`] = result.rows[0].id;
		}

		const { transactions, monthSizes } = buildTransactions(categoryIds);
		for (let index = 0; index < transactions.length; index += 1) {
			const item = transactions[index];
			let monthPosition = 0;
			let monthOffset = 0;
			while (index >= monthOffset + monthSizes[monthPosition]) {
				monthOffset += monthSizes[monthPosition];
				monthPosition += 1;
			}
			const monthsAgo = 23 - monthPosition;
			await client.query(
				`INSERT INTO transactions
					(user_id, category_id, amount, type, description, notes, transaction_date)
				 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				[userId, item.categoryId, roundMoney(item.amount), item.type, item.description, item.notes, dateForMonth(monthsAgo, item.day)],
			);
		}

		const budgets = [
			['Rent', 1500], ['Groceries', 400], ['Food & Dining', 300],
			['Transportation', 220], ['Utilities', 220], ['Entertainment', 150],
			['Shopping', 250], ['Healthcare', 150], ['Travel', 300],
		];
		for (const [categoryName, amount] of budgets) {
			await client.query(
				`INSERT INTO budgets (user_id, category_id, amount, period, start_date)
				 VALUES ($1, $2, $3, 'monthly', date_trunc('month', CURRENT_DATE)::date)`,
				[userId, categoryIds[`${categoryName}:expense`], amount],
			);
		}

		await client.query(
			`INSERT INTO ai_insights (user_id, insight_type, period_start, period_end, content_json)
			 VALUES ($1, 'monthly_summary', date_trunc('month', CURRENT_DATE)::date, CURRENT_DATE, $2)`,
			[userId, JSON.stringify({
				healthScore: 82,
				summary: 'Rani is building a steady financial routine with consistent income and controlled spending.',
				topSpendingCategory: 'Rent',
				estimatedMonthlySavings: 1850,
				highlights: ['Income is consistent', 'Most spending stays within planned categories'],
				concerns: ['Dining and shopping can be watched during busy months'],
				recommendations: ['Keep a three-month emergency fund', 'Review discretionary spending monthly'],
			})],
		);

		await client.query('COMMIT');
		console.log(`Demo data created for ${DEMO_USER.name}.`);
		console.log(`Login email: ${DEMO_USER.email}`);
		console.log(`Login password: ${DEMO_USER.password}`);
		console.log(`Created ${transactions.length} transactions, ${budgets.length} budgets, categories, and one AI insight.`);
	} catch (error) {
		await client.query('ROLLBACK');
		console.error('Seed failed:', error.message);
		process.exitCode = 1;
	} finally {
		client.release();
		await pool.end();
	}
};

seed();

