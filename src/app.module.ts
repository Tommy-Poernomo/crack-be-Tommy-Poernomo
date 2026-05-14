import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true //agar tidak perlu import ConfigModule berulang kali
    }),
    PrismaModule, 
    AuthModule, CourseModule, EnrollmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
