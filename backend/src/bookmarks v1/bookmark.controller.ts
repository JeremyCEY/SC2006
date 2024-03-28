/*/import { Body, Controller, Delete, Get, Param, Post, UseGuards , Req } from "@nestjs/common";
import { BookmarkService } from './bookmark.service';
import { CreateBookMarkDto } from "./dto/createbookmark.dto";
import { Bookmark } from "./bookmark.schema";
import { AuthGuard } from "@nestjs/passport";


@Controller('bookmark')
export class BookmarkController {
    constructor (private readonly BookmarkService: BookmarkService){}

    @Post()
    @UseGuards(AuthGuard())
    async create(@Body() CreateBookMarkDto: CreateBookMarkDto, @Req() req): Promise <Bookmark>{
        return this.BookmarkService.create(CreateBookMarkDto, req.user);
    }

    @Get(':userId')
    async findAll(@Param('userId') userId:string): Promise <Bookmark[]>{
        return this.BookmarkService.findall(userId);
    }

    @Delete(':userId/:bookmarkId')
  async delete(@Param('userId') userId: string, @Param('bookmarkId') bookmarkId: string): Promise<void> {
    await this.BookmarkService.delete(userId, bookmarkId);
  }
}/*/

