import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { AcceptOrderParamDto, CreateOrderDto, DeleteOneOrderParamDto, FinishOrderParamDto, GetManyOrderQueryDto, GetOneOrderParamDto } from './dto';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private Order:Model<Order>){}
    
    async createOrder(createOrderDto:CreateOrderDto,req:any){
        try{
            const {type,quantityType,quantity,address} = createOrderDto;
            const doc = new this.Order({
                user:req.user._id,
                type:type,
                quantityType:quantityType,
                quantity:quantity,
                address:address
            });
            await doc.save();
            return "order created"

        }catch(err){
            console.log(err);
            return err
        }
    }

    async getManyOrder(getManyOrderQueryDto:GetManyOrderQueryDto,req:any){
        try{
            const {type,page,limit,acceptedBy,status,user} = getManyOrderQueryDto;
            console.log(getManyOrderQueryDto)

            let query:any = {}

            if(type){
                query.type = type;
            }
            if(acceptedBy){
                query.acceptedBy = acceptedBy
            }
            if(status){
                query.status = status
            }
            if(user){
                query.user = user;
            }

            const skip:number = (page-1)*limit

            const docs = await this.Order.find(query).populate([
                {
                    path:"user",
                    select:"mobile username"
                },
                {
                    path:"acceptedBy",
                    select:"mobile username"
                }
            ]).skip(skip).limit(limit);

            return docs



        }catch(err){
            console.log(err);
            return err
        }
    }

    async getOneOrder(getOneOrderParamDto:GetOneOrderParamDto,req:any){
        try{
            const id = getOneOrderParamDto.id;
            const doc = await this.Order.findById(id).populate([
                {
                    path:"user",
                    select:"mobile username"
                },
                {
                    path:"acceptedBy",
                    select:"mobile username"
                }
            ]);
            if(!doc){
                throw new NotFoundException("no orders found");
            }
            if(doc.acceptedBy!=null && doc.acceptedBy!=req.user._id.toString() && doc.user!=req.user._id.toString()){
                throw new ForbiddenException("forbidden action")
            }
            return doc;

        }catch(err){
            console.log(err);
            return err;
        }
    }

    async acceptOrder(acceptOrderParamDto:AcceptOrderParamDto,req:any){
        try{
            const id = acceptOrderParamDto.id;
            const doc = await this.Order.findById(id);
            if(!doc){
                throw new NotFoundException("no order found");
            }
            if(doc.acceptedBy!=null){
                throw new ForbiddenException("forbidden action, already accepted")
            }
            doc.status = "accepted";
            doc.acceptedBy = req.user._id;
            await doc.save();
            return "accepted order"
        }catch(err){
            console.log(err);
            return err;
        }
    }

    async deleteOneOrder(deleteOneOrderparamDto:DeleteOneOrderParamDto,req:any){
        try{
            const id = deleteOneOrderparamDto.id;
            const doc = await this.Order.findById(id);
            if(!doc){
                throw new NotFoundException("no doc found");
            }
            if(doc.user.toString()!=req.user._id.toString()){
                throw new ForbiddenException("forbidden action");
            }
            const deletedDoc = await this.Order.findByIdAndDelete(id);
            return "order deleted"

        }catch(err){
            console.log(err);
            return err;
        }
    }

    async finishOrder(finishOrderParamDto:FinishOrderParamDto,req:any){
        try{
            const id = finishOrderParamDto.id;
            const doc = await this.Order.findById(id);
            if(!doc){
                throw new NotFoundException("no doc found")
            }
            if(doc.user.toString()!=req.user._id.toString()){
                throw new ForbiddenException("forbidden action")
            }
            doc.status= "done";
            await doc.save();
            return "order status changed to done"

        }catch(err){
            console.log(err);
            return err;
        }
    }

}
