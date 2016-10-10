var Account = require("./account");

module.exports = {
    parseLine: function (line) {
        line = line.split(" ");

        // call specific functions based on the command
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
            // THIS IS FOR DEBUGGING PURPOSE. CLEARS ALL ENTRY IN DATABASE
            // case("Clear"):
            //     Account.clearAllAccounts();
            //     break;
            // THIS IS FOR DEBUGGING PURPOSE. END THE CONNECTION
            // case("Close"):
            //     Account.closeConnection();
            //     break;
            default:
        }
    }
}