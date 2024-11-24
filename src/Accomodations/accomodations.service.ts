import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma, Accommodation } from '@prisma/client'

@Injectable()
export class AccommodationsService {
  constructor(private readonly prisma: PrismaService) {}

  async searchByCategory(category: string): Promise<Accommodation[]> {
    try {
      return await this.prisma.accommodation.findMany({
        where: {
          OR: [
            {
              name: {
                contains: category,
              },
            },
            {
              district: {
                contains: category,
              },
            },
            {
              city: {
                contains: category,
              },
            },
          ],
        },
      })
    } catch (error) {
      console.error(
        'Error searching accommodations by category:',
        error.message,
      )
      throw new Error(
        'Failed to search accommodations. Please try again later.',
      )
    }
  }

  async findAll(): Promise<Accommodation[]> {
    try {
      const accommodations = await this.prisma.accommodation.findMany()
      console.log(accommodations) // Exibe as acomodações no console
      return accommodations // Retorna as acomodações para o cliente
    } catch (error) {
      console.error('Error retrieving accommodations:', error.message)
      throw new Error('Failed to retrieve accommodations')
    }
  }

  async create(
    accommodationData: Prisma.AccommodationCreateInput,
  ): Promise<Accommodation> {
    return this.prisma.accommodation.create({
      data: accommodationData,
    })
  }
}
