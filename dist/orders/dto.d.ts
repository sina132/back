export declare class CreateOrderDto {
    type: string;
    quantityType: string;
    quantity: number;
    address: string;
}
export declare class GetManyOrderQueryDto {
    type: string;
    page: number;
    limit: number;
    user: string;
    acceptedBy: string;
    status: string;
}
export declare class AcceptOrderParamDto {
    id: string;
}
export declare class GetOneOrderParamDto {
    id: string;
}
export declare class DeleteOneOrderParamDto {
    id: string;
}
export declare class FinishOrderParamDto {
    id: string;
}
