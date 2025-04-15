import { IsEmail, IsIn, IsJWT, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateUserDto{
    @IsNotEmpty()
    username:string

    @IsNotEmpty()
    password:string

    @IsString()
    @IsNotEmpty()
    mobile:string

    @IsNotEmpty()
    @IsIn(["buyer","seller"])
    type:string
}

export class VerifyDto{
    @IsNotEmpty()
    mobile:string
    @IsNotEmpty()
    code:string
}

export class LoginDto{
    @IsNotEmpty()
    mobile:string
    @IsNotEmpty()
    password:string
}

export class TokenDto{
    @IsNotEmpty()
    @IsJWT()
    token:string
}

export class ForgotPasswordDto{
    @IsNotEmpty()
    mobile:string

    @IsString()
    @IsOptional()
    code?:string

    @IsString()
    @IsOptional()
    password?:string
}