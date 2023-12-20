var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can not be empty!"],
        minlenght: 5,
        maxlength: [100, "Maximum length can not exceed 100 characters"]
    }
})

var CategoryModel = mongoose.model("categories", categorySchema);
module.exports = CategoryModel;