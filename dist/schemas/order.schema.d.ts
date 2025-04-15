export declare class Order {
    user: string;
    status: string;
    address: string;
    acceptedBy: string;
    type: string;
    quantityType: string;
    quantity: number;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, import("mongoose").Document<unknown, any, Order> & Order & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
