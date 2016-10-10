var mysql = require('mysql');
var fs = require('fs');

module.exports = {
    // get connection to mysql
    getPool: function () {
        // mysql user and password stored here
        var secret = JSON.parse(fs.readFileSync('./secrets/secret.json', 'utf8'));

        return mysql.createPool({
            connectionLimit: 10,
            host: "localhost",
            user: secret["user"],
            password: secret["password"],
            database: "credit_card_processing"
        });
    }
};