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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Order = class Order {
    user;
    status;
    address;
    acceptedBy;
    type;
    quantityType;
    quantity;
};
exports.Order = Order;
__decorate([
    (0, mongoose_1.Prop)({ ref: "User", required: true }),
    __metadata("design:type", String)
], Order.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ["pending", "done", "accepted"], default: "pending" }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ ref: "User", default: null }),
    __metadata("design:type", String)
], Order.prototype, "acceptedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ["dry", "fresh"] }),
    __metadata("design:type", String)
], Order.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ["kilo", "unit"] }),
    __metadata("design:type", String)
], Order.prototype, "quantityType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "quantity", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_1.Schema)()
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.schema.js.map