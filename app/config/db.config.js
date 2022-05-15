
const mysql = require('mysql');

exports.conn1 = mysql.createConnection({
    host: 'localhost',
    user: "root",
    database: "docker_jwt_user",
})

exports.conn2 = mysql.createConnection({
    host: 'localhost',
    user: "root",
    database: "docker_jwt_buku",
})
