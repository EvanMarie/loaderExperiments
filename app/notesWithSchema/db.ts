import { Pool } from 'pg';

const pool = new Pool({
    user: 'evancarr',  // replace with your system username
    host: 'localhost',
    database: 'blogapi',
    password: '',  // if you set one during PostgreSQL setup
    port: 5432,
});

export default pool;
