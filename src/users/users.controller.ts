import { Body, Controller, Get, Headers, Param, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ForgotPasswordDto, LoginDto, TokenDto, VerifyDto } from './dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    @Post()
    createUser(@Body(ValidationPipe) createUserDto:CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }

    @Post("verify")
    verify(@Body(ValidationPipe) verifyDto:VerifyDto){
        return this.usersService.verify(verifyDto)
    }

    @Post("login")
    login(@Body(ValidationPipe) loginDto:LoginDto){
        return this.usersService.login(loginDto)
    }

    @Post("token")
    token(@Body(ValidationPipe) tokenDto:TokenDto){
        return this.usersService.token(tokenDto)
    }

    @Post("forgot-password")
    forgotPassword(@Body(ValidationPipe) forgotPasswordDto:ForgotPasswordDto){
        return this.usersService.forgotPassword(forgotPasswordDto);
    }


}
