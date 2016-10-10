/*
 This test run every input file inside the inputs folder
 This could be improved by auto generating input and expected output
 */

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');

function test() {
    // read list of files inside inputs
    var files = fs.readdirSync(path.join(__dirname, "../inputs"));

    // exec the main program
    files.forEach(function (file) {
        // spawn child process that process each file asynchronously
        var args = [path.join(__dirname, "../main.js"), path.join(__dirname, "../inputs/") + file];
        var child = spawn('node', args);

        // show all output
        child.stdout.on('data', function (data) {
            process.stdout.write(data);
        });
    })
}

// run the test
test();


