import { Injectable, NotFoundException } from '@nestjs/common';
import { TestData } from './testData.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {v1 as uuid} from  'uuid';



@Injectable()
export class TestDataService {
    constructor(@InjectModel('TestData') private readonly testDataModel: Model<TestData>){}

    private testDatas = [];

    getAllResaleData(): TestData[]{
        return this.testDatas;
    }

    // createResaleData(month: string,town: string,
    //     flat_type: string, block_no: number,
    //     street_name: string, storey_range: string,
    //     floor_area_sqm: number, flat_model: string,
    //     lease_commense_date: number, remaining_lease: string,
    //     resale_price: number,) : Resale{

    //     const resale: Resale = {
    //         id: null,
    //         month: month,
    //         town: town,
    //         flat_type: flat_type,
    //         block_no: block_no,
    //         street_name: street_name,
    //         storey_range: storey_range,
    //         floor_area_sqm: floor_area_sqm,
    //         flat_model: flat_model,
    //         lease_commense_date: lease_commense_date,
    //         remaining_lease: remaining_lease,
    //         resale_price: resale_price,
    //     };

    //     this.resales.push(resale);
    //     return resale;
    // }

    getResaleDataById(town: string): TestData{
        const found = this.testDatas.find(resale => resale.town === town);

        if(!found){
            throw new NotFoundException("Resale HDB not found");
        }

        return found;
    }

    deleteResaleDataById(town:string){
        const found = this.getResaleDataById(town);
        this.testDatas = this.testDatas.filter(resale => resale.town !== found.town);
    }

    updateResaleData(
        month: string,town: string,
        flat_type: string, block_no: number,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number): TestData{

        const resale = this.getResaleDataById(town);
        
        if(month){
            resale.month = month;
        }

        if(town){
            resale.town = town;
        }

        if(flat_type){
            resale.flat_type = flat_type;
        }

        if(block_no){
            resale.block_no = block_no;
        }

        if(street_name){
            resale.street_name = street_name;
        }

        if(storey_range){
            resale.storey_range = storey_range;
        }

        if(floor_area_sqm){
            resale.floor_area_sqm = floor_area_sqm;
        }

        if(flat_model){
            resale.flat_model = flat_model;
        }

        if(lease_commense_date){
            resale.lease_commense_date = lease_commense_date;
        }

        if(remaining_lease){
            resale.remaining_lease = remaining_lease;
        }

        if(resale_price){
            resale.resale_price = resale_price;
        }

        return resale;
    }



    //-------------------------------------------------------------------------------------------------------------------------//

    //for databse use
    async dbcreateTestData(month: string,town: string,
        flat_type: string, block_no: number,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number,latitude:number, longitude:number){

        const dbtestData = new this.testDataModel ({
            month: month,
            town: town,
            flat_type: flat_type,
            block_no: block_no,
            street_name: street_name,
            storey_range: storey_range,
            floor_area_sqm: floor_area_sqm,
            flat_model: flat_model,
            lease_commense_date: lease_commense_date,
            remaining_lease: remaining_lease,
            resale_price: resale_price,
            latitude: latitude,
            longitude: longitude
        });

        const result = await dbtestData.save();
        
    }

    async dbgetAllTestData(){
        const result = await this.testDataModel.find().exec()
        return result.map((testData) => ({id:testData.id, month: testData.month,town: testData.town,
            flat_type: testData.flat_type, block_no: testData.block_no,
            street_name: testData.street_name, storey_range: testData.storey_range,
            floor_area_sqm: testData.floor_area_sqm, flat_model: testData.flat_model,
            lease_commense_date: testData.lease_commense_date, remaining_lease: testData.remaining_lease,
            resale_price: testData.resale_price, latitude:testData.latitude, longitude: testData.longitude}));
    }

    async dbgetTestDataById(id: string){
        let found;
        
        try{
            found =  await this.testDataModel.findById(id);
        }catch(error){
            throw new NotFoundException('Resale HDB not found');
        }
        
        if(!found){
            throw new NotFoundException("Resale HDB not found");
        }

        return found;
    }


    async dbupdateTestData(
        id: string, month: string,town: string,
        flat_type: string, block_no: number,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number, latitude:number, longitude:number){

        const testData = await this.dbgetTestDataById(id);
        
        if(month){
            testData.month = month;
        }

        if(town){
            testData.town = town;
        }

        if(flat_type){
            testData.flat_type = flat_type;
        }

        if(block_no){
            testData.block_no = block_no;
        }

        if(street_name){
            testData.street_name = street_name;
        }

        if(storey_range){
            testData.storey_range = storey_range;
        }

        if(floor_area_sqm){
            testData.floor_area_sqm = floor_area_sqm;
        }

        if(flat_model){
            testData.flat_model = flat_model;
        }

        if(lease_commense_date){
            testData.lease_commense_date = lease_commense_date;
        }

        if(remaining_lease){
            testData.remaining_lease = remaining_lease;
        }

        if(resale_price){
            testData.resale_price = resale_price;
        }

        if(latitude){
            testData.latitude = latitude;
        }

        if(longitude){
            testData.longitude = longitude;
        }

        testData.save();
        return testData;
    }

    async dbdeleteTestDataById(id:string){
        const result = await this.testDataModel.deleteOne({_id: id}).exec();

        if(result.deletedCount === 0){
            throw new NotFoundException('Resale HDB not found');
        }
        
    }

}
