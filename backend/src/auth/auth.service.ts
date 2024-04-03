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
        const {name, email, password, security} = signUpDto;
        const existingemail = await this.userModel.findOne({email});
        if(existingemail){
            throw new ConflictException('This email has already been used');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            security
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

    async forgetPassword(email: string, answer: string): Promise<string>{
        const user = await this.userModel.findOne({email});
        if(!user){
            throw new UnauthorizedException('Invalid email');
        }        
        if(user.security!=answer){
            return 'Wrong Answer'
        }
        else{
            const defaultPassword = '123456';
            const hashedPassword = await bcrypt.hash(defaultPassword, 10)
            user.password = hashedPassword
            await user.save()
            return 'Your password has been changed to 123456. Please change your password after you logged in'
        }
    }
    

}
