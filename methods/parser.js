var Account = require("./account");

module.exports = {
    parseLine: function (line) {
        var arr = line.split(" ");

        // call specific functions based on the command
        switch (arr.shift()) {
            case("Add"):
                Account.addNewAccount.apply(null, arr);
                break;
            case("Charge"):
                Account.chargeAccount.apply(null, arr);
                break;
            case("Credit"):
                Account.creditAccount.apply(null, arr);
                break;
            default:
        }
    }
}