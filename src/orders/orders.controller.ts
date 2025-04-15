import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AcceptOrderParamDto, CreateOrderDto, DeleteOneOrderParamDto, FinishOrderParamDto, GetManyOrderQueryDto, GetOneOrderParamDto } from './dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService:OrdersService){}

    @Post()
    createOrder(@Body(ValidationPipe) createOrderDto:CreateOrderDto, @Req() req:any){
        return this.ordersService.createOrder(createOrderDto,req)
    }

    @Patch("/accept/:id")
    acceptOrder(@Param(ValidationPipe) acceptOrderParamDto:AcceptOrderParamDto,@Req() req:any){
        return this.ordersService.acceptOrder(acceptOrderParamDto,req)
    }

    @Get()
    getManyOrder(@Query(ValidationPipe) getManyOrderQueryDto:GetManyOrderQueryDto,@Req() req:any){
        return this.ordersService.getManyOrder(getManyOrderQueryDto,req)
    }

    @Get("/:id")
    getOneOrder(@Param(ValidationPipe) getOneOrderParamDto:GetOneOrderParamDto,@Req() req:any){
        return this.ordersService.getOneOrder(getOneOrderParamDto,req)
    }

    @Delete("/:id")
    deleteOneOrder(@Param(ValidationPipe) deleteOneOrderParamDto:DeleteOneOrderParamDto,@Req() req:any){
        return this.ordersService.deleteOneOrder(deleteOneOrderParamDto,req)
    }

    @Patch("/done/:id")
    finishOrder(@Param(ValidationPipe) finishOrderParamDto:FinishOrderParamDto,@Req() req:any){
        return this.ordersService.finishOrder(finishOrderParamDto,req)
    }
}
