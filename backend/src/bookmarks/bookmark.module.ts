import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark, BookmarkSchema } from './bookmark.schema';
import { AuthModule } from 'src/auth/auth.module';




@Module({
    imports: [
      AuthModule,
      MongooseModule.forFeature([{name:Bookmark.name, schema: BookmarkSchema}])],
    controllers: [BookmarkController],
    providers: [BookmarkService]
  })
  export class BookmarkModule {}