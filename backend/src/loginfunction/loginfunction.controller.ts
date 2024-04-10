import { Body, Controller, Delete, Get, Param, Post, UseGuards , Req, Patch} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { LoginFunctionService } from "./loginfunction.service";
import { MinLength } from "class-validator";



@Controller('loginfunction')
export class LoginFunctionController {
    constructor (private readonly LoginFunctionService: LoginFunctionService){}

    @Patch(':userId/changename')
    @UseGuards(AuthGuard())
    async changeName(@Param('userId') userId: string, @Body('newName') newName: string): Promise<string> {
        return this.LoginFunctionService.changeName(userId, newName);
    }

    @Patch(':userId/changeemail')
    @UseGuards(AuthGuard())
    async changeemail(@Param('userId') userId: string, @Body('newEmail') newEmail: string): Promise<string> {
        return this.LoginFunctionService.changeEmail(userId, newEmail);
    }

    @Patch(':userId/changepassword')
    @UseGuards(AuthGuard())
    async changepassword(@Param('userId') userId: string, @Body('oldPassword') oldPassword: string, @Body('newPassword') newPassword: string, @Body('confirmPassword') confirmPassword: string): Promise<string> {
        return this.LoginFunctionService.changePassword(userId, oldPassword, newPassword, confirmPassword);
    }
    

}