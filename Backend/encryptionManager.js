'use strict';
var bcrypt = require('bcrypt-nodejs');
var  encryptionManager = {};

encryptionManager.createHash = function (data, successCallback, failureCallback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            failureCallback(err);
            return;
        }
        bcrypt.hash(data, salt, null, function (err, hash) {
            if (err) {
                failureCallback(err);
                return;
                }
            successCallback(hash);
        });
    });
};

encryptionManager.compareHash = function (data, encrypted, successCallback, failureCallback) {
    bcrypt.compare(data, encrypted, function (err, isMatch) {
        if (err) {
            console.log("bcrypt");
            console.log(isMatch);
            failureCallback(err);
            return;
        }
        successCallback(err, isMatch);
    });
};

module.exports = encryptionManager;
