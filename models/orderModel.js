var mongoose = require('mongoose');
var oderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    toy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'toys'
    },
})

var OderModel = mongoose.model("orders", oderSchema);
module.exports = OderModel;