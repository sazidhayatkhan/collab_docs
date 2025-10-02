import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentsGateway } from './documents.gateway';

@Module({
  providers: [DocumentsService, DocumentsGateway],
  controllers: [DocumentsController]
})
export class DocumentsModule {}
