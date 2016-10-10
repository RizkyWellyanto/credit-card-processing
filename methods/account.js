var luhn = require('luhn');
var database = require('./database');

module.exports = {
    addNewAccount: function (name, card_num, limit) {
        // create new object put it in the database
        database[name] = {
            name: name,
            card_num: luhn.validate(card_num) ? card_num : null,
            balance: 0,
            credit_limit: Number(limit.replace("$", ""))
        };
    },
    chargeAccount: function (name, amount) {
        var account = database[name];
        if (account) {
            // update the balance
            var newBalance = Number(account.balance) + Number(amount.replace("$", ""));

            // if card_num is valid and newBalance doesn't go over the credit limit update the database
            if (account.card_num && newBalance <= account.credit_limit) {
                account.balance = newBalance;
                database[name] = account;
            }
        }
    },
    creditAccount: function (name, amount) {
        var account = database[name];
        if(account && account.card_num){
            // update the balance if it's valid
            account.balance = Number(account.balance) - Number(amount.replace("$", ""));
            database[name] = account;
        }
    },
    showAllAccounts: function () {
        var keys = Object.keys(database).sort();
        // print all entries
        keys.forEach(function (key) {
            var account = database[key];
            var balance = account.card_num ? "$" + account.balance : "error";
            console.log(account.name + ": " + balance);
        })
    }
};