import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { AcceptOrderParamDto, CreateOrderDto, DeleteOneOrderParamDto, FinishOrderParamDto, GetManyOrderQueryDto, GetOneOrderParamDto } from './dto';
export declare class OrdersService {
    private Order;
    constructor(Order: Model<Order>);
    createOrder(createOrderDto: CreateOrderDto, req: any): Promise<any>;
    getManyOrder(getManyOrderQueryDto: GetManyOrderQueryDto, req: any): Promise<any>;
    getOneOrder(getOneOrderParamDto: GetOneOrderParamDto, req: any): Promise<any>;
    acceptOrder(acceptOrderParamDto: AcceptOrderParamDto, req: any): Promise<any>;
    deleteOneOrder(deleteOneOrderparamDto: DeleteOneOrderParamDto, req: any): Promise<any>;
    finishOrder(finishOrderParamDto: FinishOrderParamDto, req: any): Promise<any>;
}
