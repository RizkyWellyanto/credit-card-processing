var assert = require('assert');
var expect = require('chai').expect;

var account = require("../methods/account");

describe('Credit Card Processor', function() {
    describe('clearAllAccounts', function() {
        it('should make the database empty', function() {

        });
    });

    describe('showAllAccounts', function() {
        it('should select all form database', function() {

        });
    });

    describe('addNewAccount', function() {
        it('should store name, card_num, and money to database', function() {
            account.addNewAccount(["Rizky", "4111111111111111", "20"]);
        });
    });

    describe('chargeAccount', function() {
        it('should deduct money from an account in database', function() {
            account.chargeAccount();
        });
    });

    describe('creditAccount', function() {
        it('should add money to an account in database', function() {
            account.creditAccount();
        });
    });
});