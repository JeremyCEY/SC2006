import {Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from "src/auth/user.schema";



@Injectable()
export class FrequentAddressService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async addFrequentAddress(userId: string, location: string): Promise<string>{
        await this.userModel.findByIdAndUpdate(userId, {$addToSet: {frequentaddress: location}});
        return 'Frequent address saved successfully';
    }

    async removeFrequentAddress(userId: string, location: string): Promise<string>{
        const frequentaddress = (await this.userModel.findById(userId)).frequentaddress;
        if(frequentaddress.length == 0){
            throw new NotFoundException ('You have not added any frequent addresses');
        }
        await this.userModel.findByIdAndUpdate(userId, {$pull: {frequentaddress: location}});
        return "Frequent address removed successfully";
    }

    async getFrequentAddress(userId: string): Promise<string[]>{
        const frequentaddress = (await this.userModel.findById(userId)).frequentaddress;
        if(frequentaddress.length == 0){
            throw new NotFoundException ('You have not added any frequent addresses');
        }
        else
            return frequentaddress;
        }
}