
const mysql = require('mysql');

exports.conn1 = mysql.createConnection({
    host: 'mysql_server',
    user: "mysql",
    password: "root",
    database: "docker_jwt_user",
})

exports.conn2 = mysql.createConnection({
    host: 'mysql_server2',
    user: "mysql",
    password: "root",
    database: "docker_jwt_buku",
})
