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

    async addBookmark(userId: string, propertyId: string): Promise<string>{
        await this.userModel.findByIdAndUpdate(userId, {$addToSet: {bookmarks: propertyId}});
        return 'Bookmark saved successfully'
        
    }

    async removeBookmark(userId: string, propertyId: string): Promise<string>{
        const bookmarks = (await this.userModel.findById(userId)).bookmarks;
        if(bookmarks.length == 0){
            throw new NotFoundException ('You have not bookmarked any properties');
        }
        await this.userModel.findByIdAndUpdate(userId, {$pull: {bookmarks: propertyId}});
        return 'Bookmark removed successfully'
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
