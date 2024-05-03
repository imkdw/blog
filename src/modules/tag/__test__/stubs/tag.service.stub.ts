/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { TX } from '../../../../common/types/prisma';
import TagEntity from '../../entities/tag.entity';
import { CreateTagDto, ITagService } from '../../interfaces/tag.interface';

export default class TagServiceStub implements ITagService {
  async create(dto: CreateTagDto, tx?: TX): Promise<TagEntity> {}

  async findByName(name: string, option?: FindOption): Promise<TagEntity> {}

  async findManyByIds(ids: number[], option: FindOption): Promise<TagEntity[]> {}

  async findManyByNames(names: string[]): Promise<TagEntity[]> {}

  async searchTags(tagName: string): Promise<TagEntity[]> {}
}
