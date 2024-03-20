import { Module } from '@nestjs/common';
import { ResaleController } from './resale.controller';
import { ResaleService } from './resale.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResaleScehma } from './resale.model';

@Module({
  imports: [MongooseModule.forFeature([{name:'Resale', schema: ResaleScehma}])],
  controllers: [ResaleController],
  providers: [ResaleService]
})
export class ResaleModule {}
