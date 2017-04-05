module.exports = function(req, res, next) {
    var ExpressBrute = require('express-brute'),
        moment       = require('moment'),
        store;

    store = new ExpressBrute.MemoryStore();
    
    var failCallback = function(req, res, next, nextValidRequestDate) {
        res.json({ success: false, message: "You've made too many failed attempts in a short period of time, please try again " + moment(nextValidRequestDate).fromNow() });

    };
    
    var handleStoreError = function(error) {
        // log this error so we can figure out what went wrong 
        // cause node to exit, hopefully restarting the process fixes the problem 
        log.error(error); 

        throw {
            message: error.message,
            parent: error.parent
        };
    }
    
    // No more than 1000 login attempts per day per IP 
    var globalBruteforce = new ExpressBrute(store, {
        freeRetries: 2,
        attachResetToRequest: false,
        refreshTimeoutOnRequest: false,
        minWait: 5 * 60 * 1000, // 5 minutes 
        maxWait: 60 * 60 * 1000, // 1 hour,
        lifetime: 24 * 60 * 60, // 1 day (seconds not milliseconds) 
        failCallback: failCallback,
        handleStoreError: handleStoreError
    });

    return globalBruteforce;
}