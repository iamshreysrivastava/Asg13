const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',         
    password: 'Shrey@11', 
    database: 'test_sql_db',  
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log("✔ MySQL Connection Pool Initialized.");
module.exports = pool;