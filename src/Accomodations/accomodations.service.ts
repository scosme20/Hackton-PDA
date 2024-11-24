import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class AccommodationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Prisma.Accommodation[]> {
    try {
      return await this.prisma.accommodation.findMany()
    } catch (error) {
      console.error('Error fetching accommodations:', error.message)
      throw new Error('Failed to fetch accommodations. Please try again later.')
    }
  }

  async create(
    accommodationData: Prisma.AccommodationCreateInput,
  ): Promise<Prisma.Accommodation> {
    try {
      return await this.prisma.accommodation.create({
        data: accommodationData,
      })
    } catch (error) {
      console.error('Error creating accommodation:', error.message)
      throw new Error('Failed to create accommodation. Please try again later.')
    }
  }

  async searchByCategory(
    category: string,
    filters: Record<string, string | number>,
  ): Promise<Prisma.Accommodation[]> {
    try {
      const accommodations = await this.prisma.accommodation.findMany({
        where: {
          category,
          price: {
            gte: filters.minPrice || undefined,
            lte: filters.maxPrice || undefined,
          },
        },
      })
      return accommodations
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
}
