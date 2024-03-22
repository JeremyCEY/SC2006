import {Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from "src/auth/user.schema";






@Injectable()
export class BookmarkService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async addBookmark(userId: string, propertyId: string): Promise<void>{
        await this.userModel.findByIdAndUpdate(userId, {$addToSet: {bookmarks: propertyId}});
        
    }

    async removeBookmark(userId: string, propertyId: string): Promise<void>{
        const bookmarks = (await this.userModel.findById(userId)).bookmarks;
        if(bookmarks.length == 0){
            throw new NotFoundException ('You have not bookmarked any properties');
        }
        await this.userModel.findByIdAndUpdate(userId, {$pull: {bookmarks: propertyId}});
    }

    async getBookmark(userId: string): Promise<string[]>{
        const bookmarks = (await this.userModel.findById(userId)).bookmarks;
        if(bookmarks.length == 0){
            throw new NotFoundException ('You have not bookmarked any properties');
        }
        else
            return bookmarks
        }
}
