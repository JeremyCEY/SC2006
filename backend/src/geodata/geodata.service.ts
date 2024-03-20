// geodata.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GeoData } from './interfaces/geodata.interface'; // Assuming you have defined an interface

import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class GeodataService {
    async combineGeoJsonFiles(): Promise<any> {
        const directoryPath = path.join(__dirname, '..', 'geodata');
        const files = await fs.readdir(directoryPath);
        const featureCollection = {
          type: "FeatureCollection",
          features: [],
        };

        for (let filename of files) {
            // Filter out files that are not JSON files
            if (!filename.endsWith('.json')) {
                continue;
            }

            const filePath = path.join(directoryPath, filename);

            let data;
            let json;

            try {
              data = await fs.readFile(filePath, 'utf-8');
              json = JSON.parse(data);
            } catch (error) {
              console.error(`Error reading or parsing ${filename}:`, error);
              continue; // Skip this file and move to the next one
            }
            // Assuming the JSON file is a GeoJSON Feature or FeatureCollection,
            // adjust the logic here if your files might contain other JSON structures.
            if (json.type === "FeatureCollection") {
              featureCollection.features = featureCollection.features.concat(json.features);
            } else if (json.type === "Feature") {
              featureCollection.features.push(json);
            }
            // Optionally, you can add an else block to handle non-GeoJSON files,
            // depending on whether you expect other types of JSON structures
        }
        return featureCollection;
    }
}