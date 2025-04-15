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
exports.FinishOrderParamDto = exports.DeleteOneOrderParamDto = exports.GetOneOrderParamDto = exports.AcceptOrderParamDto = exports.GetManyOrderQueryDto = exports.CreateOrderDto = void 0;
const class_validator_1 = require("class-validator");
class CreateOrderDto {
    type;
    quantityType;
    quantity;
    address;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["dry", "fresh"]),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsIn)(["kilo", "unit"]),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "quantityType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "address", void 0);
class GetManyOrderQueryDto {
    type;
    page;
    limit;
    user;
    acceptedBy;
    status;
}
exports.GetManyOrderQueryDto = GetManyOrderQueryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["dry", "fresh"]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetManyOrderQueryDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetManyOrderQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetManyOrderQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetManyOrderQueryDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetManyOrderQueryDto.prototype, "acceptedBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(["pending", "done", "accepted"]),
    __metadata("design:type", String)
], GetManyOrderQueryDto.prototype, "status", void 0);
class AcceptOrderParamDto {
    id;
}
exports.AcceptOrderParamDto = AcceptOrderParamDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], AcceptOrderParamDto.prototype, "id", void 0);
class GetOneOrderParamDto {
    id;
}
exports.GetOneOrderParamDto = GetOneOrderParamDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetOneOrderParamDto.prototype, "id", void 0);
class DeleteOneOrderParamDto {
    id;
}
exports.DeleteOneOrderParamDto = DeleteOneOrderParamDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], DeleteOneOrderParamDto.prototype, "id", void 0);
class FinishOrderParamDto {
    id;
}
exports.FinishOrderParamDto = FinishOrderParamDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FinishOrderParamDto.prototype, "id", void 0);
//# sourceMappingURL=dto.js.map