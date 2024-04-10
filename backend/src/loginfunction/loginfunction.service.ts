import {BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from "src/auth/user.schema";
import { isEmail} from 'class-validator';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class LoginFunctionService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async changeName(userId: string, newName: string): Promise<string>{
        const user = await this.userModel.findById(userId);
        const oldname = user.name;
        while (oldname == newName){
            return 'Please enter a new name';
        }
        user.name = newName;
        await user.save()
        return 'Name  changed successfully';
    }

    async changeEmail(userId: string, newEmail: string): Promise<string>{
        const user = await this.userModel.findById(userId);
        if (!isEmail(newEmail)) {
            throw new BadRequestException('Please enter valid email address');
        }
        const oldemail = user.email;
        while (oldemail == newEmail){
            return 'Please enter a new email';
        }
        const existinguser = await this.userModel.findOne({email: newEmail});
        if (existinguser && existinguser._id.toString() !== userId)
            throw new ConflictException('Email address is already in used')
        user.email = newEmail;
        await user.save()
        return 'Email changed successfully';
    }

    async changePassword(userId: string, oldPassword: string, newPassword: string, confirmPassword: string): Promise<string>{
        const user = await this.userModel.findById(userId);
        const oldMatched = await bcrypt.compare(oldPassword, user.password);
        while(!oldMatched){
            throw new UnauthorizedException('Incorrect old password! Please try again');
        }
        while (newPassword.length<6) {
            throw new BadRequestException('password must be longer than or equal to 6 characters ');
        }
        const newMatched = await bcrypt.compare(newPassword, user.password);
        while(newMatched){
            throw new BadRequestException('New password cannot be same as old password');
        }
        while(confirmPassword != newPassword){
            throw new BadRequestException('Your passwords do not match');
        }
        const hashedPassword = await bcrypt.hash(confirmPassword, 10);
        user.password = hashedPassword;
        await user.save()
        return 'Password changed successfully';
    }


}