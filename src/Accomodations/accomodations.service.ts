import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma, Accommodation } from '@prisma/client'

@Injectable()
export class AccommodationsService {
  constructor(private readonly prisma: PrismaService) {}

  private handleError(error: Error, context: string) {
    console.error(`${context}:`, error.message)
    throw new BadRequestException('An error occurred. Please try again later.')
  }

  async searchByCategory(category: string): Promise<Accommodation[]> {
    try {
      console.log(`Searching accommodations by category: ${category}`)
      const accommodations = await this.prisma.accommodation.findMany({
        where: {
          OR: [
            { name: { contains: category } },
            { district: { contains: category } },
            { city: { contains: category } },
          ],
        },
      })

      if (accommodations.length === 0) {
        console.log(`No accommodations found for category: ${category}`)
      }

      return accommodations
    } catch (error) {
      this.handleError(error, 'Error searching accommodations by category')
    }
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<Accommodation[]> {
    try {
      console.log('Fetching all accommodations...')
      const accommodations = await this.prisma.accommodations.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      })
      console.log(`Found ${accommodations.length} accommodations`)

      if (accommodations.length === 0) {
        console.log('No accommodations found.')
      }

      return accommodations
    } catch (error) {
      this.handleError(error, 'Error retrieving accommodations')
    }
  }

  async create(
    accommodationData: Prisma.accommodationsCreateInput,
  ): Promise<Accommodation> {
    try {
      console.log('Creating new accommodation...')
      const newAccommodation = await this.prisma.accommodations.create({
        data: accommodationData,
      })
      console.log('New accommodation created:', newAccommodation)
      return newAccommodation
    } catch (error) {
      this.handleError(error, 'Error creating accommodation')
    }
  }
}
