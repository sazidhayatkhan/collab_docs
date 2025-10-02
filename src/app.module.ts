import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ChatModule } from './modules/chat/chat.module';


@Module({
  imports: [PrismaModule, AuthModule, DocumentsModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
