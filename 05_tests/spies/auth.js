const db = require('./db');

const signup = (email, password) => {
    db.saveUser({email, password});
}


module.exports.signup = signup;