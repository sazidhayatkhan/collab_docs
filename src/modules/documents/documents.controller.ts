import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post()
  create(@Body() dto: CreateDocumentDto) {
    return this.documentsService.createDocument(dto);
  }

  @Get()
  list(@Body() body: { ownerId: string }) {
    return this.documentsService.getDocuments(body.ownerId);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.documentsService.getDocument(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.documentsService.updateDocument(id, dto);
  }
}
