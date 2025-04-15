import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { buffer } from 'stream/consumers';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal:true
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async(configService:ConfigService)=>({
        uri:configService.get<string>("MONGO_CONNECTION_STRING")
      })
    }),
    OrdersModule,
    ServeStaticModule.forRoot({  
      rootPath: join(__dirname, "..", "/public"),
    })  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
