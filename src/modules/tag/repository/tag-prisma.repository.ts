import { Injectable } from '@nestjs/common';
import { TagRepository } from '../types/tag.repository';
import Tag from '../domain/tag.entity';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { toTag } from '../mapper/tag.mapper';

@Injectable()
export default class TagPrismaRepository implements TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTag(tag: Tag): Promise<Tag> {
    const createdTag = await this.prisma.tag.create({ data: tag });
    return toTag(createdTag);
  }

  async findByName(name: string): Promise<Tag | null> {
    const foundTag = await this.prisma.tag.findUnique({ where: { name } });
    return foundTag ? toTag(foundTag) : null;
  }

  async findByPartialName(name: string): Promise<Tag[] | never[]> {
    const rows = await this.prisma.tag.findMany({ where: { name: { contains: name }, deleteAt: null } });
    return rows.map(toTag);
  }
}
