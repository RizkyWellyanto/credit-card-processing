var readline = require('readline');
var fs = require('fs');
var parseLine = require('./methods/parser').parseLine;
var Accounts = require('./methods/account');

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

    // read every line
    var lines = [];
    stream_in.on('line', function (line) {
        lines.push(line);
    });

    // handle every line
    stream_in.on('close', function () {
        lines.forEach(function (line) {
            parseLine(line);
        });

        // show everything in database
        Accounts.showAllAccounts();
    });
}

// run the program
main();