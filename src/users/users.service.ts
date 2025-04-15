import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto, ForgotPasswordDto, LoginDto, TokenDto, VerifyDto } from './dto';
import { generateCode, hash } from 'src/utils';
import { compareSync } from 'bcrypt';
import axios, { Axios } from 'axios';



@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private User:Model<User>,
        private jwt:JwtService
    ){}

    async createUser(createUserDto:CreateUserDto){
        try{
            const {username,password,mobile,type} = createUserDto;
            let doc = await this.User.findOne({mobile:mobile,verified:false,type:type});
            
            if(!doc){
                const hashedPassword = hash(password);
                const code = generateCode(6)
                const newDoc = new this.User({
                    username:username,
                    mobile:mobile,
                    password:hashedPassword,
                    type:type,
                    code:code
                });
                await newDoc.save();
                //sms

                return "user created, verification sms sent"
            }
            else{
                const code = generateCode(6);
                doc.code = code;
                doc.password = hash(password);
                await doc.save();
                //sms
                
                return "verification code sent"

            }


        }catch(err){
            console.log(err)
            if(err.code==11000){
                throw new ForbiddenException("user exists")
            }
            console.log(err);
            throw err;
        }
    }

    async verify(verifyDto:VerifyDto){
        try{
            const {mobile,code} = verifyDto;
            const doc = await this.User.findOne({mobile:mobile});
            if(!doc){
                throw new NotFoundException("no user found");
            }
            if(doc.code!=code){
                throw new ForbiddenException("invalid code");
            }
            if(doc.verified){
                throw new ForbiddenException("user already verified")
            }
            doc.verified = true;
            doc.code= "";
            await doc.save()
            return "user verified"

        }catch(err){
            console.log(err)
            throw err;
        }
    }

    async login(loginDto:LoginDto){
        try{
            const {mobile,password} = loginDto;
            const doc = await this.User.findOne({mobile:mobile})
            if(!doc){
                throw new NotFoundException("no user found");
            }
            if(!compareSync(password,doc.password)){
                throw new ForbiddenException("invalid password")
            }
            if(!doc.verified){
                throw new ForbiddenException("user not verified")
            }
            
            if(doc.token){
                try{
                    
                    this.jwt.verify(doc.token);
                    const user = await this.User.findOne({mobile:mobile}).select("-password");
                    return user;
                    
                }catch(err){
                    console.log("expired token")
                }
            }
            
            const token = this.jwt.sign({_id:doc._id});
            doc.token = token;
            await doc.save();
            const user = await this.User.findOne({mobile:mobile}).select("-password");
            return user;
    
        }catch(err){
            console.log(err);
            
            throw err;
        }
    }

    async token(tokenDto:TokenDto){
        try{
            const token = tokenDto.token;
            if(!this.jwt.verify(token)){
                throw new ForbiddenException("token expired");
            }
            const doc = await this.User.findOne({token:token});
            if(!doc){
                throw new ForbiddenException("invalid token");
            }
            return "valid token"

        }catch(err){
            console.log(err);
            throw err;
        }
    }

    async forgotPassword(forgotPasswordDto:ForgotPasswordDto){
        try{
            if(!forgotPasswordDto.code){
                const {mobile} = forgotPasswordDto;
                const doc = await this.User.findOne({mobile:mobile});
                if(!doc){
                    throw new NotFoundException("no user found");
                }
                const code = generateCode(6);
                doc.code = code;
                await doc.save();
    
                //sms
                return "verification code sent via sms"
            }
            else{
                const {code,mobile,password} = forgotPasswordDto;
                if(!password){
                    throw new ForbiddenException("password not provided");
                }
                const doc = await this.User.findOne({mobile:mobile});
                if(!doc){
                    throw new NotFoundException("no user found");
                }
                if(doc.code!=code){
                    throw new ForbiddenException("invalid code")
                }
                doc.password = hash(password);
                doc.code = "";
                await doc.save();
                return "password changed"
            }

        }catch(err){
            console.log(err);
            throw err; 

        }
    }

}
