var mongoose = require('mongoose');
var toySchema = mongoose.Schema({
    //no validation -> name : String,
    //with validation in server side:
    name : {
        type: String,
        required: [true, "Name can not be empty!"],
        minlenght: 3,
        maxlength: [100, "Maximum length can not exceed 100 characters"]
    },  
    price : Number,
    image : String,
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branches'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
})

var ToyModel = mongoose.model("toy", toySchema);
module.exports = ToyModel;