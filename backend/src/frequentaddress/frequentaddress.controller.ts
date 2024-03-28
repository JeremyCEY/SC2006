import { Body, Controller, Delete, Get, Param, Post, UseGuards , Req } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { FrequentAddressService } from "./frequentaddress.service";



@Controller('frequentaddress')
export class FrequentAddressController {
    constructor (private readonly FrequentAddressService: FrequentAddressService){}

    @Post(':userId')
    @UseGuards(AuthGuard())
    async addFrequentAddress(@Param('userId') userId: string, @Body('location') location: string): Promise<string> {
        return this.FrequentAddressService.addFrequentAddress(userId, location);
    }

    @Delete(':userId')
    @UseGuards(AuthGuard())
    async removeFrequentAddress(@Param('userId') userId: string, @Body('location') location: string): Promise<string> {
        return this.FrequentAddressService.removeFrequentAddress(userId, location);
    }

    @Get(':userId')
    @UseGuards(AuthGuard())
    async getFrequentAddress(@Param('userId') userId: string): Promise<string[]>{
        return this.FrequentAddressService.getFrequentAddress(userId);
    }
}
