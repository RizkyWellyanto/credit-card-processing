var Account = require("./account");
var Promise = require("bluebird");

module.exports = {
    parseLine: function (line) {
        var arr = line.split(" ");

        // call specific functions based on the command
        switch (arr.shift()) {
            case("Add"):
                return new Promise(function (resolve, reject) {
                    Account.addNewAccount.apply(null, arr).then(function () {
                        console.log("Add done!");
                        resolve();
                    });
                });
            case("Charge"):
                return new Promise(function (resolve, reject) {
                    Account.chargeAccount.apply(null, arr).then(function () {
                        console.log("Charge done!");
                        resolve();
                    });
                });
            case("Credit"):
                return new Promise(function (resolve, reject) {
                    Account.creditAccount.apply(null, arr).then(function () {
                        console.log("Credit done!");
                        resolve();
                    });
                });
            default:
        }
    }
}