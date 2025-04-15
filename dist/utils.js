"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = hash;
exports.generateCode = generateCode;
const bcrypt_1 = require("bcrypt");
const saltRounds = process.env.SALT_ROUND;
function hash(password) {
    const salt = (0, bcrypt_1.genSaltSync)(Number(saltRounds));
    return (0, bcrypt_1.hashSync)(password, salt);
}
function generateCode(length) {
    const data = "0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += data[Math.floor(Math.random() * data.length)];
    }
    return code;
}
//# sourceMappingURL=utils.js.map