import { Module, DynamicModule } from '@nestjs/common';
import { SessionService } from './session.service';

@Module({
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule {}