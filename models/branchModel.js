var mongoose = require('mongoose');
var branchSchema = mongoose.Schema({
    //no validation -> name : String,
    //with validation in server side:
    location : {
        type: String,
        required: [true, "Location can not be empty!"],
        minlenght: 3,
        maxlength: [100, "Maximum length can not exceed 100 characters"]
    },
    city : {
        type: String,
        required: [true, "City can not be empty!"],
        minlenght: 3,
        maxlength: [100, "Maximum length can not exceed 100 characters"]
    }
})

var BranchModel = mongoose.model("branches", branchSchema);
module.exports = BranchModel;