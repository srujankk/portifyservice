var mongoose = require('mongoose'),
    config = require('../config.js'),
    mongoOptions = {
        db: {
            safe: true
        }
    };

/**
 * Connecting to localDB
 * Uncomment the below lines to connect to localDB
 */
var connectingTo = config.localDBConn;

/**
 * Connecting to MongoLab DB
 * Uncomment the below lines to connect to MongoLab DB
 */
//var connectingTo = config.dbConn;

/**
 * Db connection for mongoose
 */
mongoose.connect(connectingTo, mongoOptions, function (err, res) {
    if (err) {
        console.log('Error connecting to: ' + connectingTo + ' > ' + err)
    } else {
        console.log('Success Connecting to: ' + connectingTo);
    }
});

module.exports = mongoose;
