import { Module } from '@nestjs/common'
import { AccommodationsController } from '../Accomodations/accomodations.controller'
import { AccommodationsService } from '../Accomodations/accomodations.service'
import { HttpModule } from 'src/Shared/http.module'

@Module({
  imports: [HttpModule],
  controllers: [AccommodationsController],
  providers: [AccommodationsService],
})
export class AccomodationsModule {}
