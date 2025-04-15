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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
let AuthMiddleware = class AuthMiddleware {
    User;
    jwt;
    constructor(User, jwt) {
        this.User = User;
        this.jwt = jwt;
    }
    async use(req, res, next) {
        try {
            let token = req.headers.authorization;
            if (!token) {
                return res.status(400).send("invalid token");
            }
            if (token.startsWith("Bearer")) {
                token = token.split(" ")[1];
            }
            const secret = process.env.JWT_SECRET;
            if (!this.jwt.verify(token, secret)) {
                return res.status(400).send("invalid token");
            }
            const doc = await this.User.findOne({ token: token });
            if (!doc) {
                return res.status(400).send("invalid token");
            }
            req.user = doc;
            next();
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map