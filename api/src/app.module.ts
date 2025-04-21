import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { ClientModule } from './api/client/client.module';
import { ClientService } from './api/client/client.service';
import { TbcController } from './api/tbc/tbc.controller';
import { TbcModule } from './api/tbc/tbc.module';
import { TbcService } from './api/tbc/tbc.service';
import { ExecuteSentenceModule } from './api/totvs/sentence/execute/execute-sentence.module';
import { ExecuteSentenceService } from './api/totvs/sentence/execute/execute-sentence.service';
import { TotvsModule } from './api/totvs/totvs.module';
import { TotvsService } from './api/totvs/totvs.service';
import { UsersModule } from './api/users/users.module';
import { UsersService } from './api/users/users.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    TbcModule,
    UsersModule,
    AuthModule,
    TotvsModule,
    ExecuteSentenceModule,
    ClientModule,
  ],
  controllers: [TbcController, AppController],
  providers: [
    UsersService,
    ClientService,
    TbcService,
    AppService,
    PrismaService,
    TotvsService,
    ExecuteSentenceService,
  ],
})
export class AppModule {}
