import { Module } from '@nestjs/common';
import { ViewerController } from './viewer.controller';
import { ViewerService } from './viewer.service';
import { DatabaseModule } from 'src/database/database.module';
import { fastOtpProvider, otpProvider, signupProvider } from './provider/viewer.provider';
import { JwtModule } from '@nestjs/jwt';
import { refreshTokenProvider } from 'src/token/provider/token.provider';

@Module({
  imports:[JwtModule.register({global: true}), DatabaseModule],
  controllers: [ViewerController],
  providers: [ViewerService, ...otpProvider, ...signupProvider, ...refreshTokenProvider, ...fastOtpProvider]
})
export class ViewerModule {}
