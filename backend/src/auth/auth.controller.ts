import { Body, Controller, Post, Get, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { Sign } from 'crypto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() SignUpDto: SignUpDto): Promise <{token: string}> {
        return this.authService.signUp(SignUpDto);
    }

    @Post('/login')
    login(@Body() LoginDto: LoginDto): Promise <{token: string}> {
        return this.authService.login(LoginDto);
    }

    @Patch('/forgetpassword')
    async forgetPassword(@Body ('email') email: string, @Body ('answer')answer: string): Promise<string>{
        return this.authService.forgetPassword(email, answer)
    }

}
