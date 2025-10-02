import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [ChatGateway,PrismaService],
  controllers: [ChatController]
})
export class ChatModule {}
