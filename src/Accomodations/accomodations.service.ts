import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class AccommodationsService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org'

  constructor(private readonly httpService: HttpService) {}

  /**
   * @param
   * @param
   * @returns
   */
  async searchByCategory(
    category: string,
    filters: Record<string, string | number> = {},
  ): Promise<any> {
    const url = `${this.baseUrl}/search`
    const params = {
      q: category,
      format: 'json',
      ...filters,
    }

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, { params }),
      )
      return response.data
    } catch (error) {
      console.error(
        'Error fetching data from OpenStreetMap API:',
        error.message,
      )
      throw new Error('Failed to fetch data. Please try again later.')
    }
  }
}
