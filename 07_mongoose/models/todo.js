const mongoose = require("mongoose");

var Todo = mongoose.model("Todo", {
    text: { type: String, required: true, minlength: 2, trim: true },
    complited: { type: Boolean, default: false },
    completedTime: Number
});



module.exports = { Todo };