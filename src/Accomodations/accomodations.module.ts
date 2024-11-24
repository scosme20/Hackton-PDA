import { Module } from '@nestjs/common'
import { AccommodationsController } from '../Accomodations/accomodations.controller'
import { AccommodationsService } from '../Accomodations/accomodations.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  imports: [],
  controllers: [AccommodationsController],
  providers: [AccommodationsService, PrismaService],
})
export class AccommodationsModule {}
