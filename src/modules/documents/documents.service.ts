import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async createDocument(dto: CreateDocumentDto) {
    try {
      return await this.prisma.document.create({
        data: { title: dto.title, ownerId: dto.ownerId,content:dto.content },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDocuments(ownerId: string) {
    try {
      return await this.prisma.document.findMany({ where: { ownerId } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDocument(id: string) {
    try {
      const document = await this.prisma.document.findUnique({ where: { id } });
      if (!document) throw new NotFoundException('Document not found');
      return document;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateDocument(id: string, dto: UpdateDocumentDto) {
    try {
      return await this.prisma.document.update({
        where: { id },
        data: { content: dto.content },
      });
    } catch (error) {
      throw new NotFoundException('Document not found or update failed');
    }
  }
}
