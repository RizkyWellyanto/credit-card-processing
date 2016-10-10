/*
 Obviously this unit test doesn't have much coverage
 but it's good enough for the scope of this demo
 */

var assert = require('chai').assert;
var expect = require('chai').expect;
var proxyquire = require('proxyquire');

// mock objects
var database = {
    "test2": {
        name: "test2",
        card_num: "4485845429146222",
        balance: 0,
        credit_limit: 1000
    },
    "test3": {
        name: "test3",
        card_num: "4485845429146222",
        balance: 600,
        credit_limit: 1000
    }
};
var Account = proxyquire("../methods/account", {
    "./database": database
});

// unit test the main methods
describe('Accounts', function () {
    describe('addNewAccount', function () {
        it('should store name, card_num, and money to database', function () {
            var account = {
                name: "test1",
                card_num: "4111111111111111",
                balance: 0,
                credit_limit: 1000
            };

            Account.addNewAccount("test1", "4111111111111111", "$1000");

            expect(database[account.name]).to.deep.equal(account);
        });

        it('should put fake card num as null', function () {
            var account = {
                name: "fake card",
                card_num: "123123123",
                credit_limit: "1000"
            };

            Account.addNewAccount(account.name, account.card_num, account.credit_limit);
            assert.isNull(database[account.name].card_num);
        });
    });

    describe('chargeAccount', function () {
        it('should increace balance', function () {
            Account.chargeAccount("test2", "$600");

            assert.equal(database["test2"].balance, 600);
        });

        it('should not increace balance if its over the limit', function () {
            Account.chargeAccount("test2", "$600");

            assert.equal(database["test2"].balance, 600);
        });
    });

    describe('creditAccount', function () {
        it('should reduce the balance in database', function () {
            Account.creditAccount("test3", "$500");

            assert.equal(database["test3"].balance, 100);
        });

        it('should go to negative if it should', function () {
            Account.creditAccount("test3", "$200");

            assert.equal(database["test3"].balance, -100);
        });
    });
});