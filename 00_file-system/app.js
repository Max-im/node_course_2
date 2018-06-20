const fs    = require("fs");
const os    = require("os");
const _     = require("lodash");
const input = require("./input");

const user = os.userInfo();

const res = input.add(5, 8);
console.log(res);

const arr = [3,4,56,7,8,9,2,3,4,5,56,6,2,34];
const uniqArr = _.uniq(arr);
console.log(uniqArr);

fs.appendFile('output.txt', `${user.username} - ${input.number} \n`);