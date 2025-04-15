import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto, ForgotPasswordDto, LoginDto, TokenDto, VerifyDto } from './dto';
export declare class UsersService {
    private User;
    private jwt;
    constructor(User: Model<User>, jwt: JwtService);
    createUser(createUserDto: CreateUserDto): Promise<"user created, verification sms sent" | "verification code sent">;
    verify(verifyDto: VerifyDto): Promise<string>;
    login(loginDto: LoginDto): Promise<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    token(tokenDto: TokenDto): Promise<string>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<"verification code sent via sms" | "password changed">;
}
