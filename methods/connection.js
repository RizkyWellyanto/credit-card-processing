var mysql = require('mysql');
var fs = require('fs');

module.exports = {
// get connection to mysql
    getConnection: function () {
        // mysql user and password stored here
        var secret = JSON.parse(fs.readFileSync('./secrets/secret.json', 'utf8'));

        return mysql.createConnection({
            host: "localhost",
            user: secret["user"],
            password: secret["password"],
            database: "credit_card_processing"
        });
    }
};