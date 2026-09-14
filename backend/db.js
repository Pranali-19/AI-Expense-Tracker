import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool , types } = pkg;

// Date
types.setTypeParser(1082, (val) => val);

const pool = new Pool({
    connectionString: process.env.DATABASE_URI,
    ssl: { rejectUnauthorized: false },
});

pool.on('connect', () => {
    console.log('Connected to Noen Postgres');
});

pool.on('error',(err) => {
    console.error("Unexpected Postegress");
    process.exit(-1);
});

export default pool;


