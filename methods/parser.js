var Account = require("./account");

module.exports = {
    parseLine: function (line) {
        line = line.split(" ");

        // call specific functions
        switch (line.shift()) {
            case("Add"):
                Account.addNewAccount.apply(null, line);
                break;
            case("Charge"):
                Account.chargeAccount.apply(null, line);
                break;
            case("Credit"):
                Account.creditAccount.apply(null, line);
                break;
            case("Show"):
                Account.showAllAccounts();
                break;
            case("Clear"):
                Account.clearAllAccounts();
                break;
            default:
        }
    }
}