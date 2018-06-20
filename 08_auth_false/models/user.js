const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, trim: true, minlength: 1, validate: {validator: validator.isEmail, message: '{VALUE} is not a valid email'}},
    password: {type: String, required: true, minlength: 3},
    tokens: [
        {
            access: {type: String, required: true},
            token: {type: String, required: true}
        }    
    ]
});


UserSchema.generateAuthToken = function() {
  var user = this;  
  var access = "auth";
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'solt').toString();
  user.tokens.push({access, token});
  return user.save().then(
    () => token
  );
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };