import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { UsersService } from './api/users/users.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ExecuteSentenceModule } from './sentence/execute/execute-sentence.module';
import { TotvsModule } from './totvs/totvs.module';
import { ClientService } from './api/client/client.service';
import { ClientModule } from './api/client/client.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TotvsModule,
    ExecuteSentenceModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [UsersService, ClientService, AppService, PrismaService],
})
export class AppModule {}
