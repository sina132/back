import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Order{
    @Prop({ref:"User",required:true})
    user:string

    @Prop({enum:["pending","done","accepted"],default:"pending"})
    status:string

    @Prop({required:true})
    address:string

    @Prop({ref:"User",default:null})
    acceptedBy:string

    @Prop({required:true,enum:["dry","fresh"]})
    type:string

    @Prop({required:true,enum:["kilo","unit"]})
    quantityType:string

    @Prop({required:true})
    quantity:number

}

export const OrderSchema = SchemaFactory.createForClass(Order);