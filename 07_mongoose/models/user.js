const mongoose = require("mongoose");

var User = mongoose.model("User", {
    email: { type: String, trim: true, minlength: 4, required: true }
});



module.exports = { User };