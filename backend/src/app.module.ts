import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResaleModule } from './resale/resale.module';
import { AuthModule } from './auth/auth.module';
import { TestDataModule } from './testData/testData.module';

const url = 'mongodb+srv://tanw0272:UVdMb8aeATcDmYuc@sc2006.fa1n11l.mongodb.net/ResaleHDBInfo?retryWrites=true&w=majority&appName=SC2006';

@Module({
  imports: [TasksModule, ResaleModule, TestDataModule, MongooseModule.forRoot(url), AuthModule]
})
export class AppModule {}
