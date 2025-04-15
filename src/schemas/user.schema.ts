import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class User{
    @Prop({required:true})
    username:string
    @Prop({required:true,unique:true})
    mobile:string
    @Prop({required:true})
    password:string
    @Prop({required:true,enum:["buyer","seller"]})
    type:string
    @Prop({required:false})
    token:string
    @Prop({default:false})
    verified:boolean
    @Prop({required:false})
    code:string

}


export const UserSchema = SchemaFactory.createForClass(User);