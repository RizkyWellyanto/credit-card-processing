## Credit Card Processing Program

This program demonstrates a simple credit card processing system
A parallel version of this program is available on a branch called
"improved_paralell_card_processing" which implemented using promises,
totally asynchronous, uses MySQL database.

## Overview of design decision
1. Written in JS as NodeJS app
- Simply because I've been using NodeJS stack in the past 5 months
- Easy integration with the web environment. NodeJS is built This could be turned into a server that handles credit card processing API easily. If written
- Can be scaled easily by spawning multiple instances of the program. set some master programs to do the load balancing
- If written in Java or C++, requires tons of infrastructure setting to do the stuff above. Saves time to do it this way
- A ton of open source packages. i.e. the luhn package. no need to reinvent the wheel
2. File structure
- The main entry point is main. main only handles the top level important things. main calls other modules
- This app could be turned into a web server by adding say Express framework to main.js which is just 1 single file
- All methods are made modular in their specific modules so that it could be easily unit tested
- For future expansion, say adding more API could be added inside methods/ folder
- Modularity helps the team code different part of the code
3. Dependencies
- This version only have a small amount of external dependencies
- All dependencies have lenient license such as MIT, so no legal headache
- The parallel version has promises and mysql packages
- I chose to use luhn package instead of writing one because there's really no need for me to rewrite this. the package is maintained by the open source community, so it's good code, and I could spend my time coding on other things that's new rather than try to reinvent the wheel
4. Extras
- The master branch is a simple version. easily coded under an hour. but the parallel version took me ~10hrs so far, and yet it's not entirely done
- Database schema in the improved version takes id as primary key. even though the example shows that we use the name as keys for each account. in real life scenario, a lot of people might have the same name
- We could also put a SQL index in name and credit card, because as far as I know credit card numbers are unique
- 2 tests are available so far since for the scope of this demo, unit-test helps to make sure the methods work, and the end-to-end test the program handles the input correctly 

## Future Improvements
Some features are already implemented in the parallel version. However it's not fully tested use with care
1. Use an actual database. The improved version uses an existing database such as MySQL. we could use some NoSQL database like mongodb, but I have a feeling that when it comes to payment system, consistency and atomicity are more important than availability and eventuality. ACID vs BASE
2. Asynchronous execution. we could make the program faster by utilizing javascript's asynchronous nature. However this might cause race conditions. In the improved version there is still no guarantee on the ordering. However in the future, I'd put some locks to make sure one account's input handled in order. While at the same time other accounts could be processed
3. Paralelization. We could paralellize this program more on top of async execution. however, since Javascript is single threaded, we could not spawn threads to handle more inputs. But we could move up the paralellization one level up by spawning multiple processes. Make some processes as master and handle the load balance while the other as slaves that handles each inputs
4. Security. A layer of encryption would help anonymize the data if somehow our system is breached

## Code Example

for interactive terminal
```node main.js```

passing inputs to stding
```node main.js < inputs/given```

taking inputs from a file
```node main.js inputs/given```

## Installation
1. make sure you have the latest version of nodejs and npm
2. get the repository
3. run `npm install` to install all dependencies

## Tests

all tests are inside tests/ folder
unit test can be run using the mocha testing framework by running 
```mocha tests/unit-test.js```

testing the whole program by feeding inputs from files can be done by running 
```node tests/end-to-end-test.js```
this will run the program by reading all inputs from the inputs/ folder

## License

New license called IDC