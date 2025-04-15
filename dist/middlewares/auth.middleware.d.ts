import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
export declare class AuthMiddleware implements NestMiddleware {
    private User;
    private jwt;
    constructor(User: Model<User>, jwt: JwtService);
    use(req: any, res: any, next: () => void): Promise<any>;
}
