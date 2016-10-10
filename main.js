var readline = require('readline');
var fs = require('fs');
var parseLine = require('./methods/parser').parseLine;
var Accounts = require('./methods/account');

function main(){
    // check input file or stdin
    var file = process.argv[2];
    var stream_in;

    if(file){
        // read from file
        stream_in = readline.createInterface({
            input: fs.createReadStream(file)
        });
    }
    else {
        // read from stdin
        stream_in = readline.createInterface({
            input: process.stdin
        });
    }

    // handle every line
    stream_in.on('line', function (line) {
        parseLine(line);
    });

    // show all the accounts in the database
    stream_in.on('close', function (line) {
        Accounts.showAllAccounts();
        Accounts.clearAllAccounts();
        Accounts.closeConnection();
    });
}

// run the program
main();