import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { ClientModule } from './api/client/client.module';
import { ClientService } from './api/client/client.service';
import { TbcController } from './api/tbc/tbc.controller';
import { TbcModule } from './api/tbc/tbc.module';
import { TbcService } from './api/tbc/tbc.service';
import { UsersModule } from './api/users/users.module';
import { UsersService } from './api/users/users.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ExecuteSentenceModule } from './sentence/execute/execute-sentence.module';
import { TotvsModule } from './totvs/totvs.module';

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
  ],
})
export class AppModule {}
