var mysql = require('mysql');
var luhn = require('luhn');
var fs = require('fs');

// mysql user and password stored here
var secret = JSON.parse(fs.readFileSync('./secrets/secret.json', 'utf8'));

// get connection to mysql
var con = mysql.createConnection({
    host: "localhost",
    user: secret["user"],
    password: secret["password"],
    database: "credit_card_processing"
});

module.exports = {
    addNewAccount: function (name, card_num, limit) {
        // create new Accounts object
        var account = {
            name: name,
            card_num: luhn.validate(card_num) ? card_num : null,
            balance: 0,
            credit_limit: limit.replace("$", "")
        };
        // insert into database
        con.query('INSERT INTO accounts SET ?', account, function (err) {
            if (err) throw err;
        });
    },
    chargeAccount: function (name, amount) {
        con.beginTransaction(function (err) {
            if (err) {
                return con.rollback(function () {
                    throw err;
                });
            }
            // get info about the Accounts
            con.query('SELECT balance, credit_limit, card_num FROM accounts WHERE name = ?', name, function (err, rows) {
                if (err) {
                    return con.rollback(function () {
                        throw err;
                    });
                }
                var account = rows[0];
                if(account){
                    var newBalance = Number(account.balance) + Number(amount.replace("$",""));
                    // if card_num is valid && balance doesn't go over the limit then update Accounts
                    if (account.card_num && newBalance <= account.credit_limit) {
                        con.query('UPDATE accounts SET balance = ? WHERE name = ?', [newBalance, name], function (err, res) {
                            if(err){
                                return con.rollback(function () {
                                    throw err;
                                });
                            }
                            // commit the queries
                            con.commit(function(err) {
                                if (err) {
                                    return con.rollback(function() {
                                        throw err;
                                    });
                                }
                            });
                        })
                    }
                }
            })
        });
    },
    creditAccount: function (name, amount) {
        con.beginTransaction(function (err) {
            if (err) {
                return con.rollback(function () {
                    throw err;
                });
            }
            // get the info about the Accounts
            con.query('SELECT balance, card_num FROM accounts WHERE name = ?', name, function (err, rows) {
                if (err) {
                    return con.rollback(function () {
                        throw err;
                    });
                }
                var account = rows[0];
                if(account){
                    var newBalance = Number(account.balance) - Number(amount.replace("$",""));
                    // if card_num is valid, update balance
                    if(account.card_num){
                        con.query('UPDATE accounts SET balance = ? WHERE name = ?', [newBalance, name], function (err) {
                            if(err){
                                return con.rollback(function () {
                                    throw err;
                                });
                            }
                            // commit the queries
                            con.commit(function(err) {
                                if (err) {
                                    return con.rollback(function() {
                                        throw err;
                                    });
                                }
                            });
                        })
                    }
                }
            })
        });
    },
    showAllAccounts: function () {
        // get all rows, print to stdout
        con.query('SELECT name, balance, card_num FROM accounts ORDER BY name', function (err, rows) {
            if (err) throw err;
            rows.forEach(function (account) {
                var balance = account.card_num ? "$" + account.balance : "error";
                console.log(account.name + ": " + balance);
            });
        });
    },
    clearAllAccounts: function () {
        // THIS IS FOR DEBUGGING PURPOSES. DELETE ALL ROWS IN DATABASE
        con.query('DELETE FROM accounts', function (err) {
            if (err) throw err;
        });
    },
    closeConnection : function (){
        // if connection is active end it
        if(con){
            con.end();
            con = null;
        }
    }
};