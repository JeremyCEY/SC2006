import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResaleService } from './resale.service';
import { Resale } from './resale.model';


@Controller('resale')
export class ResaleController {
    constructor(private resaleService: ResaleService){}

    // @Get()
    // getAllResaleData(){
    //     return this.resaleService.getAllResaleData();
    // }

    // @Get('/:town')
    // getResaleDataById(@Param('town') town: string){
    //     const resale = this.resaleService.getResaleDataById(town);
    //     return resale;
    // }

    // @Post('/:create')
    // createResaleData(
    //     @Body('month') month: string, @Body('town') town: string,
    //     @Body('flat_type') flat_type: string, @Body('block_no') block_no: number,
    //     @Body('street_name') street_name: string, @Body('storey_range') storey_range: string,
    //     @Body('floor_area_sqm') floor_area_sqm: number, @Body('flat_model') flat_model: string,
    //     @Body('lease_commense_date') lease_commense_date: number, @Body('remaining_lease') remaining_lease: string,
    //     @Body('resale_price') resale_price: number): Resale{
    //         return this.resaleService.createResaleData(month,
    //             town,
    //             flat_type,
    //             block_no,
    //             street_name,
    //             storey_range,
    //             floor_area_sqm,
    //             flat_model,
    //             lease_commense_date,
    //             remaining_lease,
    //             resale_price);
    // }

    // @Patch('/:town')
    // updateTask(@Body('month') month: string, @Body('town') town: string,
    // @Body('flat_type') flat_type: string, @Body('block_no') block_no: number,
    // @Body('street_name') street_name: string, @Body('storey_range') storey_range: string,
    // @Body('floor_area_sqm') floor_area_sqm: number, @Body('flat_model') flat_model: string,
    // @Body('lease_commense_date') lease_commense_date: number, @Body('remaining_lease') remaining_lease: string,
    // @Body('resale_price') resale_price: number){
    //     this.resaleService.updateResaleData(month,
    //         town,
    //         flat_type,
    //         block_no,
    //         street_name,
    //         storey_range,
    //         floor_area_sqm,
    //         flat_model,
    //         lease_commense_date,
    //         remaining_lease,
    //         resale_price);
    // }

    // @Delete('/:town')
    // deleteResaleDataById(@Param('town') town:string): void{
    //     this.resaleService.deleteResaleDataById(town);
    // }



    //--------------------------------------------------------------------------------------------------------------------------------//
    //for database use
    @Get()
    async dbgetAllResaleData(){
        const resale = await this.resaleService.dbgetAllResaleData();
        return resale;
    }

    @Get('/:id')
    async dbgetResaleDataById(@Param('id') id: string){
        const resale = await this.resaleService.dbgetResaleDataById(id);
        return resale;
    }
    
    @Post('/:dbcreate')
    async dbcreateResaleData(
        @Body('month') month: string, @Body('town') town: string,
        @Body('flat_type') flat_type: string, @Body('block_no') block_no: number,
        @Body('street_name') street_name: string, @Body('storey_range') storey_range: string,
        @Body('floor_area_sqm') floor_area_sqm: number, @Body('flat_model') flat_model: string,
        @Body('lease_commense_date') lease_commense_date: number, @Body('remaining_lease') remaining_lease: string,
        @Body('resale_price') resale_price: number){
            
            const result = await this.resaleService.dbcreateResaleData(month,
                town,
                flat_type,
                block_no,
                street_name,
                storey_range,
                floor_area_sqm,
                flat_model,
                lease_commense_date,
                remaining_lease,
                resale_price);

            return result;
    }

    @Patch('/:id')
    async dbupdateTask(@Param('id') id: string,
        @Body('month') month: string, @Body('town') town: string,
        @Body('flat_type') flat_type: string, @Body('block_no') block_no: number,
        @Body('street_name') street_name: string, @Body('storey_range') storey_range: string,
        @Body('floor_area_sqm') floor_area_sqm: number, @Body('flat_model') flat_model: string,
        @Body('lease_commense_date') lease_commense_date: number, @Body('remaining_lease') remaining_lease: string,
        @Body('resale_price') resale_price: number){
            const result = await this.resaleService.dbupdateResaleData(id, month,
                town,
                flat_type,
                block_no,
                street_name,
                storey_range,
                floor_area_sqm,
                flat_model,
                lease_commense_date,
                remaining_lease,
                resale_price);
            
            return result
    }

    @Delete('/:id')
    async dbdeleteResaleDataById(@Param('id') id:string){
        await this.resaleService.dbdeleteResaleDataById(id);
    }


    
}
