"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const utils_1 = require("../utils");
const bcrypt_1 = require("bcrypt");
let UsersService = class UsersService {
    User;
    jwt;
    constructor(User, jwt) {
        this.User = User;
        this.jwt = jwt;
    }
    async createUser(createUserDto) {
        try {
            const { username, password, mobile, type } = createUserDto;
            let doc = await this.User.findOne({ mobile: mobile, verified: false, type: type });
            if (!doc) {
                const hashedPassword = (0, utils_1.hash)(password);
                const code = (0, utils_1.generateCode)(6);
                const newDoc = new this.User({
                    username: username,
                    mobile: mobile,
                    password: hashedPassword,
                    type: type,
                    code: code
                });
                await newDoc.save();
                return "user created, verification sms sent";
            }
            else {
                const code = (0, utils_1.generateCode)(6);
                doc.code = code;
                doc.password = (0, utils_1.hash)(password);
                await doc.save();
                return "verification code sent";
            }
        }
        catch (err) {
            console.log(err);
            if (err.code == 11000) {
                throw new common_1.ForbiddenException("user exists");
            }
            console.log(err);
            throw err;
        }
    }
    async verify(verifyDto) {
        try {
            const { mobile, code } = verifyDto;
            const doc = await this.User.findOne({ mobile: mobile });
            if (!doc) {
                throw new common_1.NotFoundException("no user found");
            }
            if (doc.code != code) {
                throw new common_1.ForbiddenException("invalid code");
            }
            if (doc.verified) {
                throw new common_1.ForbiddenException("user already verified");
            }
            doc.verified = true;
            doc.code = "";
            await doc.save();
            return "user verified";
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async login(loginDto) {
        try {
            const { mobile, password } = loginDto;
            const doc = await this.User.findOne({ mobile: mobile });
            if (!doc) {
                throw new common_1.NotFoundException("no user found");
            }
            if (!(0, bcrypt_1.compareSync)(password, doc.password)) {
                throw new common_1.ForbiddenException("invalid password");
            }
            if (!doc.verified) {
                throw new common_1.ForbiddenException("user not verified");
            }
            if (doc.token) {
                try {
                    this.jwt.verify(doc.token);
                    const user = await this.User.findOne({ mobile: mobile }).select("-password");
                    return user;
                }
                catch (err) {
                    console.log("expired token");
                }
            }
            const token = this.jwt.sign({ _id: doc._id });
            doc.token = token;
            await doc.save();
            const user = await this.User.findOne({ mobile: mobile }).select("-password");
            return user;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async token(tokenDto) {
        try {
            const token = tokenDto.token;
            if (!this.jwt.verify(token)) {
                throw new common_1.ForbiddenException("token expired");
            }
            const doc = await this.User.findOne({ token: token });
            if (!doc) {
                throw new common_1.ForbiddenException("invalid token");
            }
            return "valid token";
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async forgotPassword(forgotPasswordDto) {
        try {
            if (!forgotPasswordDto.code) {
                const { mobile } = forgotPasswordDto;
                const doc = await this.User.findOne({ mobile: mobile });
                if (!doc) {
                    throw new common_1.NotFoundException("no user found");
                }
                const code = (0, utils_1.generateCode)(6);
                doc.code = code;
                await doc.save();
                return "verification code sent via sms";
            }
            else {
                const { code, mobile, password } = forgotPasswordDto;
                if (!password) {
                    throw new common_1.ForbiddenException("password not provided");
                }
                const doc = await this.User.findOne({ mobile: mobile });
                if (!doc) {
                    throw new common_1.NotFoundException("no user found");
                }
                if (doc.code != code) {
                    throw new common_1.ForbiddenException("invalid code");
                }
                doc.password = (0, utils_1.hash)(password);
                doc.code = "";
                await doc.save();
                return "password changed";
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map