import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
//import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @InjectModel(User.name) private User:Model<User>,
        private jwt:JwtService
    ){}
  async use(req: any, res: any, next: () => void) {
    try{
      let token:string = req.headers.authorization;
      if(!token){
        return res.status(400).send("invalid token")
      }
      if(token.startsWith("Bearer")){
        token = token.split(" ")[1];
      }
      const secret:any = process.env.JWT_SECRET
      if(!this.jwt.verify(token,secret)){
        return res.status(400).send("invalid token")
      }
      const doc = await this.User.findOne({token:token});
      if(!doc){
        return res.status(400).send("invalid token")
      }
      req.user = doc;
  
      next();
    }catch(err){
      res.status(400).send(err)
    }

  }
}
