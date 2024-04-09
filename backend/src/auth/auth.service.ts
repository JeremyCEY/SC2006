import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{token: string}> {
        const {name, email, password} = signUpDto;
        const existingemail = await this.userModel.findOne({email});
        if(existingemail){
            throw new ConflictException('This email has already been used');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = this.jwtService.sign({id: user._id});

        return {token};
    }

    async login(loginDto: LoginDto): Promise<{token: string}>{
        const {email, password} = loginDto;
        const user = await this.userModel.findOne({email});
        if(!user){
            throw new UnauthorizedException('Invalid email');
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched){
            throw new UnauthorizedException('Invalid password');
        }
        
        const token = this.jwtService.sign({id: user._id});
        return {token};
    }

    async updateEmail(userId: string, newEmail: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const existingUser = await this.userModel.findOne({ email: newEmail });
        if (existingUser) {
            throw new ConflictException('This email is already in use');
        }
        user.email = newEmail;
        await user.save();
        return user;
    }

    async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const passwordMatched = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatched) {
            throw new UnauthorizedException('Current password is incorrect');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return user;
    }

    async updateName(userId: string, newName: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        user.name = newName;
        await user.save();
        return user;
    }

    async getAccount(userId: string): Promise<{name: string, email: string}> {
        const user = await this.userModel.findById(userId).select('name email -_id');
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return { name: user.name, email: user.email };
    }

}
