/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { TX } from '../../../../common/types/prisma';
import Tag from '../../entities/tag.entity';
import { ITagRepository } from '../../interfaces/tag.interface';

export default class TagRepositoryStub implements ITagRepository {
  private memory: Tag[] = [];

  async findByName(name: string, option?: FindOption): Promise<Tag> {
    const tag = this.memory.find((item) => item.name === name);
    if (!tag) return null;
    if (option?.includeDeleted && tag.deleteAt) return null;

    return tag;
  }

  async findManyByIds(ids: number[], option?: FindOption): Promise<Tag[]> {
    const tags = this.memory.filter((item) => ids.includes(item.id));

    if (!tags.length) return [];
    if (!option?.includeDeleted) return tags.filter((item) => !item.deleteAt);

    return tags;
  }

  async findManyByNames(names: string[], option?: FindOption): Promise<Tag[]> {
    const tags = this.memory.filter((item) => names.includes(item.name));

    if (!tags.length) return [];
    if (!option?.includeDeleted) return tags.filter((item) => !item.deleteAt);

    return tags;
  }

  async findManyByNameWithContains(name: string, option?: FindOption): Promise<Tag[]> {
    const tags = this.memory.filter((item) => item.name.includes(name));

    if (!tags.length) return [];
    if (!option?.includeDeleted) return tags.filter((item) => !item.deleteAt);

    return tags;
  }

  async save(tag: Tag, tx?: TX): Promise<Tag> {
    const newTag = new Tag({ ...tag, id: this.memory.length + 1 });
    this.memory.push(newTag);

    return newTag;
  }

  reset() {
    this.memory = [];
  }
}
