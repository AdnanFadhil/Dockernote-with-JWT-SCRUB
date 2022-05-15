
const mysql = require('mysql');

const conn1 = mysql.createConnection({
    host: 'localhost',
    user: "root",
    database: "docker_jwt_user",
})

module.exports = conn1;