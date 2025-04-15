import { MiddlewareConsumer, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
    imports:[
      MongooseModule.forFeature([
        {
          name:Order.name,
          schema:OrderSchema
        },
        {
          name:User.name,
          schema:UserSchema
        }
      ]),
      JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory:(configService:ConfigService)=>({
          secret:configService.get<string>("JWT_SECRET"),
          signOptions:{
            expiresIn:"3d"
          }
        })
      })
    ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(OrdersController);
  }
}
