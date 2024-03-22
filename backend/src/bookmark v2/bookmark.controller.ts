import { Body, Controller, Delete, Get, Param, Post, UseGuards , Req } from "@nestjs/common";
import { BookmarkService } from './bookmark.service';
import { AuthGuard } from "@nestjs/passport";



@Controller('bookmark')
export class BookmarkController {
    constructor (private readonly BookmarkService: BookmarkService){}

    @Post(':userId/:propertyId')
    @UseGuards(AuthGuard())
    async addBookmark(@Param('userId') userId: string, @Param('propertyId') propertyId: string): Promise<void> {
        await this.BookmarkService.addBookmark(userId, propertyId);
    }

    @Delete(':userId/:propertyId')
    @UseGuards(AuthGuard())
    async removeBookmark(@Param('userId') userId: string, @Param('propertyId') propertyId: string): Promise<void> {
        await this.BookmarkService.removeBookmark(userId, propertyId);
    }

    @Get(':userId/bookmarks')
    @UseGuards(AuthGuard())
    async getBookmark(@Param('userId') userId: string): Promise<string[]>{
        return this.BookmarkService.getBookmark(userId);
    }
}
