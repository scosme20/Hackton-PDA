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
   * @returns
   */
  @Get('categories')
  getCategories() {
    return [
      { id: 1, name: 'Hotel' },
      { id: 2, name: 'Hostel' },
      { id: 3, name: 'Pousada' },
    ]
  }
}
