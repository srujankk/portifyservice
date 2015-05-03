/**
 * Requires the mongoose module
 */

var mongoose = require('mongoose'),
    StockSchema = require('../models/stockSchema'),
    stockModel = mongoose.model('Stock', StockSchema);

/**
 * TODO: Validations
 */

module.exports = stockModel;
