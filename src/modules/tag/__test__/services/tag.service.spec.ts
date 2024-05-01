import { Test } from '@nestjs/testing';
import TagService from '../../service/tag.service';
import { CreateTagDto, TagRepositoryKey, TagServiceKey } from '../../interfaces/tag.interface';
import TagRepositoryStub from '../stubs/tag.repository.stub';
import TagCreateEntity from '../../entities/tag-create.entity';

describe('TagService', () => {
  let tagService: TagService;
  let tagRepository: TagRepositoryStub;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: TagServiceKey,
          useClass: TagService,
        },
        {
          provide: TagRepositoryKey,
          useClass: TagRepositoryStub,
        },
      ],
    }).compile();

    tagService = module.get<TagService>(TagServiceKey);
    tagRepository = module.get<TagRepositoryStub>(TagRepositoryKey);
  });

  describe('create', () => {
    it('태그를 생성한다', async () => {
      // given
      const dto: CreateTagDto = { name: 'tag' };

      // when
      const result = await tagService.create(dto);

      // then
      expect(result.name).toBe('tag');
    });
  });

  describe('searchTags', () => {
    it('태그를 검색한다', async () => {
      // given
      tagRepository.save(new TagCreateEntity({ name: 'tag1' }));
      tagRepository.save(new TagCreateEntity({ name: 'asd' }));
      tagRepository.save(new TagCreateEntity({ name: 'tag3' }));

      // when
      const result = await tagService.searchTags('tag');

      // then
      expect(result.length).toBe(2);
    });
  });

  describe('findManyByIds', () => {
    it('태그를 id로 검색한다', async () => {
      // given
      const tag1 = await tagRepository.save(new TagCreateEntity({ name: 'tag1' }));
      const tag2 = await tagRepository.save(new TagCreateEntity({ name: 'tag2' }));
      await tagRepository.save(new TagCreateEntity({ name: 'tag3' }));

      // when
      const result = await tagService.findManyByIds([tag1.id, tag2.id]);

      // then
      expect(result.length).toBe(2);
    });
  });

  describe('findManyByNames', () => {
    it('태그를 이름으로 검색한다', async () => {
      // given
      await tagRepository.save(new TagCreateEntity({ name: 'tag1' }));
      await tagRepository.save(new TagCreateEntity({ name: 'tag2' }));
      await tagRepository.save(new TagCreateEntity({ name: 'tag3' }));

      // when
      const result = await tagService.findManyByNames(['tag1', 'tag2']);

      // then
      expect(result.length).toBe(2);
    });
  });

  describe('findByName', () => {
    it('태그를 이름으로 검색한다', async () => {
      // given
      await tagRepository.save(new TagCreateEntity({ name: 'tag1' }));
      await tagRepository.save(new TagCreateEntity({ name: 'tag2' }));
      await tagRepository.save(new TagCreateEntity({ name: 'tag3' }));

      // when
      const result = await tagService.findByName('tag1');

      // then
      expect(result.name).toBe('tag1');
    });
  });
});
