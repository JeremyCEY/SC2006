import { Body, Controller, Post, Patch, Request, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { Sign } from 'crypto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}

    //CREATE data
    @Post('/signup')
    signUp(@Body() SignUpDto: SignUpDto): Promise <{token: string}> {
        return this.authService.signUp(SignUpDto);
    }

    @Post('/login')
    login(@Body() LoginDto: LoginDto): Promise <{token: string}> {
        return this.authService.login(LoginDto);
    }

    //MODIFY data
    @Patch('/update-email')
    async updateEmail(@Request() req, @Body('newEmail') newEmail: string) {
        return this.authService.updateEmail(req.user.id, newEmail);
    }

    @Patch('/update-password')
    async updatePassword(@Request() req, @Body() updatePasswordDto: { currentPassword: string, newPassword: string }) {
        return this.authService.updatePassword(req.user.id, updatePasswordDto.currentPassword, updatePasswordDto.newPassword);
    }

    @Patch('/update-name')
    @UseGuards(AuthGuard())
    async updateName(@Request() req, @Body('name') name: string) {
        return this.authService.updateName(req.user.id, name);
    }

    //GET data
    @Get(':userId')
    @UseGuards(AuthGuard())
    async getAccount(@Request() req) {
        return this.authService.getAccount(req.user.id);
    }

}
