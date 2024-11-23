import { Controller, Get, Param, Query } from '@nestjs/common'
import { AccomodationService } from './accomodations.service'
import { error } from 'console'

@Controller('accomodations')
export class AccomodationsController {
  constructor(private readonly accomodationService: AccomodationService) {}

  @Param
  @Returns
  @Get('search')
  async search(@Query('category') category: string) {
    if (!category) {
      return { error: 'Category is required' }
      return.
      this.accomodationService.searchByCategory(category);
    }

    @returns 

    @Get('categories')
    getCategories(){
        return [
            {id: 1, name: 'Hotel'},
            {id: 2, name: 'Hostel'},
            {id: 3, name: 'Guest House'},
        ];
    }
  }
}
function getCategories() {
    throw new Error('Function not implemented.')
}

function Returns(target: AccomodationsController, propertyKey: 'search', descriptor: TypedPropertyDescriptor<(category: string) => Promise<any>>): void | TypedPropertyDescriptor<(category: string) => Promise<any>> {
    throw new Error('Function not implemented.');
}

