require('dotenv').config();
const mysql= require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'KrishPathak25',
    database: 'krishdb'
})
module.exports = db;