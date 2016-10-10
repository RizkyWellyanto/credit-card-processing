var readline = require('readline');
var fs = require('fs');
var parseLine = require('./methods/parser').parseLine;
var Accounts = require('./methods/account');
var Promise = require('bluebird');

function main() {
    // check input file or stdin
    var file = process.argv[2];
    var stream_in;

    if (file) {
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

    // handle every line asynchronously
    var parsers = [];
    stream_in.on('line', function (line) {
        parsers.push(parseLine(line));
    });

    // wait for all the parsers, and when stdin closes show all the accounts in the database
    stream_in.on('close', function () {
        Promise.all(parsers).then(function () {
            Accounts.showAllAccounts();
        }).then(function () {
            Accounts.clearAllAccounts();
        }).then(function () {
            Accounts.closeConnection();
        });
    });
}

// run the program
main();