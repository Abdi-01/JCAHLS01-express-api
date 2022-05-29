const mysql = require('mysql');

const dbConf = mysql.createConnection({
    host: 'localhost',
    user: 'AL',
    password: '007@001',
    database: 'commerce_ah',
    port: 3306
})

module.exports = {
    dbConf
}