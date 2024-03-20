import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import {TestDataService} from './testData.service';

@Controller('testData')
export class TestDataController {
  constructor(private testDataService: TestDataService) {
  }

  //--------------------------------------------------------------------------------------------------------------------------------//
  //for database use
  @Get()
  async dbgetAllTestData() {
    const testData = await this.testDataService.dbgetAllTestData();
    return testData;
  }

  @Get('/:id')
  async dbgetTestDataById(@Param('id') id: string) {
    const testData = await this.testDataService.dbgetTestDataById(id);
    return testData;
  }

  @Post('/:dbcreate')
  async dbcreateTestData(
      @Body('month') month: string,
      @Body('town') town: string,
      @Body('flat_type') flat_type: string,
      @Body('block_no') block_no: number,
      @Body('street_name') street_name: string,
      @Body('storey_range') storey_range: string,
      @Body('floor_area_sqm') floor_area_sqm: number,
      @Body('flat_model') flat_model: string,
      @Body('lease_commense_date') lease_commense_date: number,
      @Body('remaining_lease') remaining_lease: string,
      @Body('resale_price') resale_price: number,
      @Body('Latitude') latitude: number,
      @Body('Longitude') longitude: number,
  ) {
    const result = await this.testDataService.dbcreateTestData(
        month,
        town,
        flat_type,
        block_no,
        street_name,
        storey_range,
        floor_area_sqm,
        flat_model,
        lease_commense_date,
        remaining_lease,
        resale_price,
        latitude,
        longitude,
    );

    return result;
  }

  @Patch('/:id')
  async dbupdateTask(
      @Param('id') id: string,
      @Body('month') month: string,
      @Body('town') town: string,
      @Body('flat_type') flat_type: string,
      @Body('block_no') block_no: number,
      @Body('street_name') street_name: string,
      @Body('storey_range') storey_range: string,
      @Body('floor_area_sqm') floor_area_sqm: number,
      @Body('flat_model') flat_model: string,
      @Body('lease_commense_date') lease_commense_date: number,
      @Body('remaining_lease') remaining_lease: string,
      @Body('resale_price') resale_price: number,
      @Body('Latitude') latitude: number,
      @Body('Longitude') longitude: number,
  ) {
    const result = await this.testDataService.dbupdateTestData(
        id,
        month,
        town,
        flat_type,
        block_no,
        street_name,
        storey_range,
        floor_area_sqm,
        flat_model,
        lease_commense_date,
        remaining_lease,
        resale_price,
        latitude,
        longitude,
    );

    return result;
  }

  @Delete('/:id')
  async dbdeleteResaleDataById(@Param('id') id: string) {
    await this.testDataService.dbdeleteTestDataById(id);
  }
}
