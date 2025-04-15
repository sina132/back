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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const dto_1 = require("./dto");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    createOrder(createOrderDto, req) {
        return this.ordersService.createOrder(createOrderDto, req);
    }
    acceptOrder(acceptOrderParamDto, req) {
        return this.ordersService.acceptOrder(acceptOrderParamDto, req);
    }
    getManyOrder(getManyOrderQueryDto, req) {
        return this.ordersService.getManyOrder(getManyOrderQueryDto, req);
    }
    getOneOrder(getOneOrderParamDto, req) {
        return this.ordersService.getOneOrder(getOneOrderParamDto, req);
    }
    deleteOneOrder(deleteOneOrderParamDto, req) {
        return this.ordersService.deleteOneOrder(deleteOneOrderParamDto, req);
    }
    finishOrder(finishOrderParamDto, req) {
        return this.ordersService.finishOrder(finishOrderParamDto, req);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Patch)("/accept/:id"),
    __param(0, (0, common_1.Param)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AcceptOrderParamDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "acceptOrder", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GetManyOrderQueryDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getManyOrder", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GetOneOrderParamDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOneOrder", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DeleteOneOrderParamDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "deleteOneOrder", null);
__decorate([
    (0, common_1.Patch)("/done/:id"),
    __param(0, (0, common_1.Param)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FinishOrderParamDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "finishOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map