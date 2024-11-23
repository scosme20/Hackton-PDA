import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class AccommodationsService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org'
  private readonly viaCepBaseUrl = 'https://viacep.com.br/ws'

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

  /**
   * @param
   * @returns
   */
  async getAddressByCep(cep: string): Promise<any> {
    const url = `${this.viaCepBaseUrl}/${cep}/json/`

    try {
      const response = await lastValueFrom(this.httpService.get(url))
      return response.data
    } catch (error) {
      console.error('Error fetching data from ViaCEP API:', error.message)
      throw new Error('Failed to fetch address data. Please try again later.')
    }
  }
}
