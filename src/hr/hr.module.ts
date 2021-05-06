import { Module } from '@nestjs/common';
import { HrService } from './hr.service';

@Module({
  providers: [HrService]
})
export class HrModule {}
