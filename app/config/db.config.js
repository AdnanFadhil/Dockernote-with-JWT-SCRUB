
//const mysql = require('mysql');
const mysql = require('mysql2');

exports.conn1 = mysql.createConnection({
    host: 'mysql_server',
    user: "root",
    password: "root",
    database: "docker_jwt_user",
})

exports.conn2 = mysql.createConnection({
    host: 'mysql_server2',
    user: "root",
    password: "root",
    database: "docker_jwt_buku",
})
