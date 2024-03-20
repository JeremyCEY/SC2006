import {Module} from '@nestjs/common';
import {ResaleController} from './resale.controller';
import {ResaleService} from './resale.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ResaleSchema} from './resale.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Resale', schema: ResaleSchema}]),
  ],
  controllers: [ResaleController],
  providers: [ResaleService],
})
export class ResaleModule {}
