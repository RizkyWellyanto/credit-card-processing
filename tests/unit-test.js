/*
    This unit test doesn't have much coverage
    but it's good enough
 */

var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

// mock objects
var clearAllAccounts = require("../methods/account").clearAllAccounts();
var showAllAccounts = require("../methods/account").showAllAccounts();
var addNewAccount = require("../methods/account").addNewAccount();
var chargeAccount = require("../methods/account").chargeAccount();
var creditAccount = require("../methods/account").creditAccount();


// unit test the main methods
describe('Credit Card Processor primary methods', function() {
    describe('clearAllAccounts', function() {
        it('should make the database empty', function(done) {
            var spy = chai.spy(Accounts.con.query);

            clearAllAccounts();

            expect(spy).to.have.been.called();
        });
    });

    describe('closeConnection', function() {
        it('should call connection end()', function(done) {
            var spy = chai.spy(Accounts.con.end);

            closeConnection();

            expect(spy).to.have.been.called();
        });
    });

    describe('showAllAccounts', function() {
        it('should select all from database', function() {
            var spy = chai.spy(Accounts.con.query);

            showAllAccounts();

            expect(spy).to.have.been.called();
        });
    });

    describe('addNewAccount', function() {
        it('should store name, card_num, and money to database', function() {
            var spy = chai.spy(Accounts.con.query);

            addNewAccount(["Rizky", "4111111111111111", "20"]);

            expect(spy).to.have.been.called();
        });
    });

    describe('chargeAccount', function() {
        var spy = chai.spy(Accounts.con.query);

        it('should deduct money from an Accounts in database', function() {
            chargeAccount(["Rizky", "20"]);
        });

        expect(spy).to.have.been.called();
    });

    describe('creditAccount', function() {
        it('should add money to an Accounts in database', function() {
            var spy = chai.spy(Accounts.con.query);

            creditAccount(["Rizky", "20"]);

            expect(spy).to.have.been.called();
        });
    });
});