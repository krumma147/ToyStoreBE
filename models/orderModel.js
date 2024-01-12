var mongoose = require('mongoose');

var orderItemSchema = mongoose.Schema({
    toy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'toys'
    },
    quantity: {
        type: Number,
        required: true
    }
});

var orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    toys: [orderItemSchema],
    price: {
        type: Number,
        required: true
    }
});
var OderModel = mongoose.model("orders", orderSchema);
module.exports = OderModel;