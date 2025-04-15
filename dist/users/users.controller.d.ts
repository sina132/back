import { UsersService } from './users.service';
import { CreateUserDto, ForgotPasswordDto, LoginDto, TokenDto, VerifyDto } from './dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<"user created, verification sms sent" | "verification code sent">;
    verify(verifyDto: VerifyDto): Promise<string>;
    login(loginDto: LoginDto): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    token(tokenDto: TokenDto): Promise<string>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<"verification code sent via sms" | "password changed">;
}
