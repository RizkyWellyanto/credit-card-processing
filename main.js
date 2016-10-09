var readline = require('readline');
var fs = require('fs');
var parseLine = require('./methods/parser').parseLine;
var showAllAccounts = require('./methods/account').showAllAccounts;

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
        showAllAccounts();
    });
}

// run the program
main();