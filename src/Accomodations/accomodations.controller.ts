import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { AccommodationsService } from '../Accomodations/accomodations.service'
import { Prisma } from '@prisma/client'

@Controller('accommodations')
export class AccommodationsController {
  constructor(private readonly accommodationsService: AccommodationsService) {}

  @Get()
  async findAll() {
    return this.accommodationsService.findAll()
  }

  @Post()
  async create(@Body() accommodationData: Prisma.AccommodationCreateInput) {
    return this.accommodationsService.create(accommodationData)
  }

  @Get('search')
  async searchByCategory(@Query('category') category: string) {
    return this.accommodationsService.searchByCategory(category)
  }
}
