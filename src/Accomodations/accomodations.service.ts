import { Injectable, Param } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class AccomodationsService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org'

  constructor(private readonly httpService: HttpService) {}

  @Param
  @returns
  async searchByCategory(category: string): Promise<any> {
    const url = `${this.baseUrl}/search`
    const params = {
      q: category,
      format: 'json',
    }
    const response = await lastValueFrom(this.httpService.get(url, { params }))
    return response.data
  }
}
