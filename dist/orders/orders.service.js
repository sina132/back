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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("../schemas/order.schema");
let OrdersService = class OrdersService {
    Order;
    constructor(Order) {
        this.Order = Order;
    }
    async createOrder(createOrderDto, req) {
        try {
            const { type, quantityType, quantity, address } = createOrderDto;
            const doc = new this.Order({
                user: req.user._id,
                type: type,
                quantityType: quantityType,
                quantity: quantity,
                address: address
            });
            await doc.save();
            return "order created";
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
    async getManyOrder(getManyOrderQueryDto, req) {
        try {
            const { type, page, limit, acceptedBy, status, user } = getManyOrderQueryDto;
            console.log(getManyOrderQueryDto);
            let query = {};
            if (type) {
                query.type = type;
            }
            if (acceptedBy) {
                query.acceptedBy = acceptedBy;
            }
            if (status) {
                query.status = status;
            }
            if (user) {
                query.user = user;
            }
            const skip = (page - 1) * limit;
            const docs = await this.Order.find(query).populate([
                {
                    path: "user",
                    select: "mobile username"
                },
                {
                    path: "acceptedBy",
                    select: "mobile username"
                }
            ]).skip(skip).limit(limit);
            return docs;
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
    async getOneOrder(getOneOrderParamDto, req) {
        try {
            const id = getOneOrderParamDto.id;
            const doc = await this.Order.findById(id).populate([
                {
                    path: "user",
                    select: "mobile username"
                },
                {
                    path: "acceptedBy",
                    select: "mobile username"
                }
            ]);
            if (!doc) {
                throw new common_1.NotFoundException("no orders found");
            }
            if (doc.acceptedBy != null && doc.acceptedBy != req.user._id.toString() && doc.user != req.user._id.toString()) {
                throw new common_1.ForbiddenException("forbidden action");
            }
            return doc;
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
    async acceptOrder(acceptOrderParamDto, req) {
        try {
            const id = acceptOrderParamDto.id;
            const doc = await this.Order.findById(id);
            if (!doc) {
                throw new common_1.NotFoundException("no order found");
            }
            if (doc.acceptedBy != null) {
                throw new common_1.ForbiddenException("forbidden action, already accepted");
            }
            doc.status = "accepted";
            doc.acceptedBy = req.user._id;
            await doc.save();
            return "accepted order";
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
    async deleteOneOrder(deleteOneOrderparamDto, req) {
        try {
            const id = deleteOneOrderparamDto.id;
            const doc = await this.Order.findById(id);
            if (!doc) {
                throw new common_1.NotFoundException("no doc found");
            }
            if (doc.user.toString() != req.user._id.toString()) {
                throw new common_1.ForbiddenException("forbidden action");
            }
            const deletedDoc = await this.Order.findByIdAndDelete(id);
            return "order deleted";
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
    async finishOrder(finishOrderParamDto, req) {
        try {
            const id = finishOrderParamDto.id;
            const doc = await this.Order.findById(id);
            if (!doc) {
                throw new common_1.NotFoundException("no doc found");
            }
            if (doc.user.toString() != req.user._id.toString()) {
                throw new common_1.ForbiddenException("forbidden action");
            }
            doc.status = "done";
            await doc.save();
            return "order status changed to done";
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrdersService);
//# sourceMappingURL=orders.service.js.map