import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { signupProvider } from 'src/viewer/provider/viewer.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { dataProvider, productProvider } from './provider/product.provider';

@Module({
  imports: [JwtModule.register({ global: true }), DatabaseModule],
  controllers: [AdminController],
  providers: [AdminService, ...signupProvider, ...productProvider, ...dataProvider]
})
export class AdminModule {}
