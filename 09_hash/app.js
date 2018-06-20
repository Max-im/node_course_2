const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");


// 11111111111111111111111
// const msg = "message 333";
// const hash = SHA256(msg).toString();

// console.log(msg, hash);


const userData = {
    id: 111
}

// const token = {
//     userData,
//     hash: SHA256(JSON.stringify(userData) + 'solt').toString()
// }

// const resultHash = SHA256(JSON.stringify(token.userData) + 'solt').toString()


// if(resultHash === token.hash) {
//     console.log("true")
// }
// else {
//     console.log("data changed")
// }



// 2222222222222222222222222222222222222
const token = jwt.sign(userData, 'solt');
console.log(token);

const decoded = jwt.verify(token, "solt")
console.log(decoded);