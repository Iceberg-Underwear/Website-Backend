import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { ImagesModule } from './image/images.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule, AdminModule, PrismaModule, OrderModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
