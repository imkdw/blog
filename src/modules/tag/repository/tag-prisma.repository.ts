import { Injectable } from '@nestjs/common';
import { TagRepository } from '../types/tag.repository';
import Tag from '../domain/tag.entity';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { toTag } from '../mapper/tag.mapper';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class TagPrismaRepository implements TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTag(tag: Tag): Promise<Tag> {
    const createdTag = await this.prisma.tag.create({ data: tag });
    return toTag(createdTag);
  }

  async createTags(tags: Tag[], tx?: TX): Promise<Tag[]> {
    const prisma = tx || this.prisma;
    const tagNames = tags.map((tag) => tag.name);
    await this.prisma.tag.createMany({ data: tags });
    const createdTags = await prisma.tag.findMany({ where: { name: { in: tagNames }, deleteAt: null } });
    return createdTags.map(toTag);
  }

  async findByName(name: string): Promise<Tag | null> {
    const foundTag = await this.prisma.tag.findUnique({ where: { name } });
    return foundTag ? toTag(foundTag) : null;
  }

  async findByPartialName(name: string): Promise<Tag[] | []> {
    const rows = await this.prisma.tag.findMany({ where: { name: { contains: name }, deleteAt: null } });
    return rows.map(toTag);
  }

  async findByNames(names: string[]): Promise<Tag[] | []> {
    const rows = await this.prisma.tag.findMany({ where: { name: { in: names }, deleteAt: null } });
    return rows.map(toTag);
  }
}
