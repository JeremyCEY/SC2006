import { Bookmark, BookmarkDocument } from "./bookmark.schema";
import {Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { CreateBookMarkDto } from "./dto/createbookmark.dto";
import { User } from "src/auth/user.schema";





@Injectable()
export class BookmarkService {
    constructor(
        @InjectModel(Bookmark.name)
        private readonly BookmarkModel: Model<BookmarkDocument>,
    ) {}

    async create(CreateBookMarkDto: CreateBookMarkDto, user: User): Promise<Bookmark>{
        const data = Object.assign(CreateBookMarkDto, { userId: user._id});
        const CreatedBookmark = await this.BookmarkModel.create(data);
        return CreatedBookmark;
    }

    /*/async findall (userId:string): Promise<Bookmark[]>{
        return this.BookmarkModel.find({userId}).exec();
    }

    async delete(userId:string, bookmarkId: string): Promise<void>{
        await this.BookmarkModel.findOneAndDelete({userId, _id: bookmarkId}).exec();
    }/*/
}

