
const mysql = require('mysql');

const conn1 = mysql.createConnection({
    host: 'localhost',
    USER: "root",
    PASSWORD: "",
    DB: "docker_jwt_user",
})

module.exports = conn1;