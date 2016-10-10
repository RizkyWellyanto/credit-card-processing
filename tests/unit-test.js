/*
    Obviously this unit test doesn't have much coverage
    but it's good enough for the scope of this demo
 */

var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require ("sinon");

// var stub functions
var query = sinon.spy();
var end = sinon.spy();
var beginTransaction = sinon.spy();

// mock objects
var Account = proxyquire("../methods/account", {
    "./connection":{
        getConnection: function () {
            return {
                query:query,
                end:end,
                beginTransaction:beginTransaction
            };
        }
    }
});

// unit test the main methods
describe('Accounts', function() {
    describe('clearAllAccounts', function() {
        it('should make the database empty', function(done) {
            Account.clearAllAccounts();
            assert(query.called);
            done();
        });
    });

    describe('showAllAccounts', function() {
        it('should select all from database', function(done) {
            Account.showAllAccounts();
            assert(query.called);
            done();
        });
    });

    describe('addNewAccount', function() {
        it('should store name, card_num, and money to database', function(done) {
            Account.addNewAccount("Rizky", "4111111111111111", "20");
            assert(query.called);
            done();
        });
    });

    describe('chargeAccount', function() {
        it('should deduct money from an Accounts in database', function(done) {
            Account.chargeAccount("Rizky", "20");
            assert(beginTransaction.called);
            done();
        });
    });

    describe('creditAccount', function() {
        it('should add money to an Accounts in database', function(done) {
            Account.creditAccount("Rizky", "20");
            assert(beginTransaction.called);
            done();
        });
    });

    describe('closeConnection', function() {
        it('should call connection end()', function(done) {
            Account.closeConnection();
            assert(end.called);
            done();
        });
    });
});