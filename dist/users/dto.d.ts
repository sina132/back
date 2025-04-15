export declare class CreateUserDto {
    username: string;
    password: string;
    mobile: string;
    type: string;
}
export declare class VerifyDto {
    mobile: string;
    code: string;
}
export declare class LoginDto {
    mobile: string;
    password: string;
}
export declare class TokenDto {
    token: string;
}
export declare class ForgotPasswordDto {
    mobile: string;
    code?: string;
    password?: string;
}
