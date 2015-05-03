/**
 * Requiring the modules
 * requires the stock model
 */
var express = require('express'),
    mongoose = require('../models/mongo'),
    stockModel = require('../models/stockModel'),
    markitData = require('node-markitondemand'),
    router = express.Router();

/**
 * show would be called when the user is routed with the GET call for '/stocks'
 */
router.get('/', function (req, res) {
    /**
     * Get the Database connection
     */
    var db = mongoose.connection,
        /**
         * Get the collection from the db connection
         */
        stocksCollection = db.collection('stocks');
    /**
     * Get all the records from the collection
     */
    stocksCollection.find().toArray(function (err, stocks) {
        /**
         * send the json object as the response
         */
        var updatedStock = [];
        stocks.forEach(function (stock) {
            markitData.lookup(stock.symbol, function (err, stockData) {
                if (err) {
                    console.log("ERROR:" + err);
                    stock.currentprice = 0;
                } else {
                    console.log(stock.symbol + " --- " + stockData);
                    stock.currentprice = 100;
                }
                updatedStock.push(stock);
                if (stocks.length === updatedStock.length) {
                    res.send(updatedStock);
                }
            });
        });
    });
});

/**
 * add would be called when the user is routed with the POST call for '/stocks'
 */
router.post('/', function (req, res) {
    /**
     * Create a new stockModel with the request body
     */
    var stock = new stockModel(req.body);
    /**
     * Call the save on stock model
     */
    stock.save(function (e, stock) {
        /**
         * send the stock in response so that the UI can display it
         */
        res.send(stock);
    });
});

module.exports = router;
