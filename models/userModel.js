var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    //no validation -> name : String,
    //with validation in server side:
    name : {
        type: String,
        required: [true, "Name can not be empty!"],
        minlenght: 3,
        maxlength: [100, "Maximum length can not exceed 100 characters"]
    },  
    email : {
        type: String,
        required: [true, "Email can not be empty!"],
        minlenght: 3,
        maxlength: [100, "Maximum length can not exceed 100 characters"],
        unique: true 
    },
    password : {
        type: String,
        required: [true, "Password can not be empty!"],
        minlenght: 3,
        maxlength: [100, "Maximum length can not exceed 100 characters"]
    },
    role : {
        type: String,
        required: [true, "Password can not be empty!"],
        minlenght: 3,
        maxlength: [100, "Maximum length can not exceed 100 characters"],
        default: "user"
    }
})

var UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;