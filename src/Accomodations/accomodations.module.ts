import { Module } from '@nestjs/common'
import { AccomodationsController } from './accomodations.controller'
import { AccomodationsService } from './accomodations.service'
import { HttpModule } from 'src/Shared/http.module'

@Module({
  imports: [HttpModule],
  controllers: [AccomodationsController],
  providers: [AccomodationsService],
})
export class AccomodationsModule {}
