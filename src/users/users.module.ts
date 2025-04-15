import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:User.name,
        schema:UserSchema
      },
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
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
