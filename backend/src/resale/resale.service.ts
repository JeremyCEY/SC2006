import { Injectable, NotFoundException } from '@nestjs/common';
import { Resale } from './resale.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {v1 as uuid} from  'uuid';



@Injectable()
export class ResaleService {
    constructor(@InjectModel('Resale') private readonly resaleModel: Model<Resale>){}

    private resales = [];

    getAllResaleData(): Resale[]{
        return this.resales;
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

    getResaleDataById(town: string): Resale{
        const found = this.resales.find(resale => resale.town === town);

        if(!found){
            throw new NotFoundException("Resale HDB not found");
        }

        return found;
    }

    deleteResaleDataById(town:string){
        const found = this.getResaleDataById(town);
        this.resales = this.resales.filter(resale => resale.town !== found.town);
    }

    updateResaleData(
        month: string,town: string,
        flat_type: string, block_no: number,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number): Resale{

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
    async dbcreateResaleData(month: string,town: string,
        flat_type: string, block_no: number,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number,){

        const dbresale = new this.resaleModel ({
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
        });

        const result = await dbresale.save();
        
    }

    async dbgetAllResaleData(){
        const result = await this.resaleModel.find().exec()
        return result.map((resale) => ({id:resale.id, month: resale.month,town: resale.town,
            flat_type: resale.flat_type, block_no: resale.block_no,
            street_name: resale.street_name, storey_range: resale.storey_range,
            floor_area_sqm: resale.floor_area_sqm, flat_model: resale.flat_model,
            lease_commense_date: resale.lease_commense_date, remaining_lease: resale.remaining_lease,
            resale_price: resale.resale_price}));
    }

    async dbgetResaleDataById(id: string){
        let found;
        
        try{
            found =  await this.resaleModel.findById(id);
        }catch(error){
            throw new NotFoundException('Resale HDB not found');
        }
        
        if(!found){
            throw new NotFoundException("Resale HDB not found");
        }

        return found;
    }


    async dbupdateResaleData(
        id: string, month: string,town: string,
        flat_type: string, block_no: number,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number){

        const resale = await this.dbgetResaleDataById(id);
        
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

        resale.save();
        return resale;
    }

    async dbdeleteResaleDataById(id:string){
        const result = await this.resaleModel.deleteOne({_id: id}).exec();

        if(result.deletedCount === 0){
            throw new NotFoundException('Resale HDB not found');
        }
        
    }

}
