import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResaleModule } from './resale/resale.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmarks/bookmark.module';

const url = 'mongodb+srv://tanw0272:UVdMb8aeATcDmYuc@sc2006.fa1n11l.mongodb.net/ResaleHDBInfo?retryWrites=true&w=majority&appName=SC2006';

@Module({
  imports: [TasksModule, ResaleModule, MongooseModule.forRoot(url), AuthModule, BookmarkModule]
})
export class AppModule {}
