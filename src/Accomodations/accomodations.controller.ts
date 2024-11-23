import { Controller, Get, Query } from '@nestjs/common'
import { AccommodationsService } from '../Accomodations/accomodations.service'

@Controller('accommodations')
export class AccommodationsController {
  constructor(private readonly accommodationsService: AccommodationsService) {}

  /**
   * @param
   * @param
   * @returns
   */
  @Get('search')
  async search(
    @Query('category') category: string,
    @Query() filters: Record<string, string | number>,
  ) {
    if (!category) {
      return { error: 'Category is required' }
    }
    delete filters.category

    return this.accommodationsService.searchByCategory(category, filters)
  }

  /**
   * @param
   * @returns
   */
  @Get('address')
  async getAddress(@Query('cep') cep: string) {
    if (!cep) {
      return { error: 'CEP is required' }
    }

    return this.accommodationsService.getAddressByCep(cep)
  }
}
