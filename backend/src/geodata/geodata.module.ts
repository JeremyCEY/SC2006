//geodata.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeoDataService } from './geodata.service'; // Import your service
import { GeoDataController } from './geodata.controller'; // Import your controller
// Import your GeoData schema
import { GeoDataModel, FeatureCollectionSchema } from './geodata.model';

@Module({
  imports: [
    // Register your GeoData schema with Mongoose
    MongooseModule.forFeature([{ name: GeoDataModel.name, schema: FeatureCollectionSchema }]),
  ],
  controllers: [
    GeoDataController, // Your new controller
  ],
  providers: [
    GeoDataService, // Your new service
  ],
})
export class GeoDataModule {}
