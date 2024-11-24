import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { AccommodationsService } from '../Accomodations/accomodations.service' // Corrija o caminho para o serviço
import { Prisma } from '@prisma/client' // Importa o Prisma para tipar a entrada do método create

@Controller('accommodations') // Define a rota base para acomodações
export class AccommodationsController {
  constructor(private readonly accommodationsService: AccommodationsService) {}

  @Get()
  async findAll() {
    try {
      return await this.accommodationsService.findAll()
    } catch (error) {
      console.error('Erro ao buscar acomodações:', error.message)
      throw error
    }
  }

  @Post()
  async create(@Body() accommodationData: Prisma.AccommodationsCreateInput) {
    try {
      return await this.accommodationsService.create(accommodationData)
    } catch (error) {
      console.error('Erro ao criar acomodação:', error.message)
      throw error
    }
  }

  @Get('search')
  async searchByCategory(@Query('category') category: string) {
    try {
      return await this.accommodationsService.searchByCategory(category)
    } catch (error) {
      console.error('Erro ao buscar acomodações por categoria:', error.message)
      throw error
    }
  }
}
