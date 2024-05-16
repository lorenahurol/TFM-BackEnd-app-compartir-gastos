const mysql = require('mysql2');
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'exp_sharing_pass',
    database: 'expenses_sharing',
    port: 3306
});

global.db = pool.promise();