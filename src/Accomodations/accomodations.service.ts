import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { accommodations, accommodations_type } from '@prisma/client'

@Injectable()
export class AccommodationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<accommodations[]> {
    return this.prisma.accommodations.findMany()
  }

  async create(data: any): Promise<accommodations> {
    return this.prisma.accommodations.create({ data })
  }

  async searchByCategory(category: string): Promise<accommodations[]> {
    const validCategories: accommodations_type[] = [
      'HOTEL',
      'HOSTEL',
      'APARTMENT',
      'RESORT',
      'INN',
      'MOTEL',
      'GUESTHOUSE',
      'VILLA',
      'COTTAGE',
      'CABIN',
    ]

    // Verifica se a categoria fornecida é válida
    if (!validCategories.includes(category as accommodations_type)) {
      throw new Error('Categoria inválida')
    }

    return this.prisma.accommodations.findMany({
      where: {
        type: category as accommodations_type, 
      },
    })
  }

  async findNearbyAccommodations(
    lat: number,
    lng: number,
  ): Promise<accommodations[]> {
    return this.prisma.accommodations.findMany()
  }
}
