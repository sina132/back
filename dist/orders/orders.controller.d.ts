import { OrdersService } from './orders.service';
import { AcceptOrderParamDto, CreateOrderDto, DeleteOneOrderParamDto, FinishOrderParamDto, GetManyOrderQueryDto, GetOneOrderParamDto } from './dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderDto: CreateOrderDto, req: any): Promise<any>;
    acceptOrder(acceptOrderParamDto: AcceptOrderParamDto, req: any): Promise<any>;
    getManyOrder(getManyOrderQueryDto: GetManyOrderQueryDto, req: any): Promise<any>;
    getOneOrder(getOneOrderParamDto: GetOneOrderParamDto, req: any): Promise<any>;
    deleteOneOrder(deleteOneOrderParamDto: DeleteOneOrderParamDto, req: any): Promise<any>;
    finishOrder(finishOrderParamDto: FinishOrderParamDto, req: any): Promise<any>;
}
