import { Test, TestingModule } from '@nestjs/testing';
import { IUserRoleService, UserRoleRepositoryKey, UserRoleServiceKey } from '../../interfaces/user-role.interface';
import UserRoleService from '../../service/user-role.service';
import UserRoleRepositoryStub from '../stubs/user-role.repository.stub';
import { UserRole } from '../../enums/user-role.enum';

describe('UserRoleService', () => {
  let userRoleService: IUserRoleService;
  let userRoleRepository: UserRoleRepositoryStub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserRoleServiceKey,
          useClass: UserRoleService,
        },
        {
          provide: UserRoleRepositoryKey,
          useClass: UserRoleRepositoryStub,
        },
      ],
    }).compile();

    userRoleService = module.get<IUserRoleService>(UserRoleServiceKey);
    userRoleRepository = module.get<UserRoleRepositoryStub>(UserRoleRepositoryKey);

    userRoleRepository.reset();
  });

  describe('findById', () => {
    it('유저 권한정보가 존재하면 해당 정보를 반환한다', async () => {
      // given
      userRoleRepository.init();

      // when
      const userRole = await userRoleService.findById(1);

      // then
      expect(userRole).not.toBeNull();
    });
    it('유저 권한정보가 존재하지 않으면 null을 반환한다', async () => {
      // when
      const userRole = await userRoleService.findById(100);

      // then
      expect(userRole).toBeNull();
    });
  });

  describe('findByName', () => {
    it('유저 권한정보가 존재하면 해당 정보를 반환한다', async () => {
      // given
      userRoleRepository.init();

      // when
      const userRole = await userRoleService.findByName(UserRole.ADMIN);

      // then
      expect(userRole).not.toBeNull();
    });
    it('유저 권한정보가 존재하지 않으면 null을 반환한다', async () => {
      // when
      const userRole = await userRoleService.findByName('NOT_EXIST_ROLE');

      // then
      expect(userRole).toBeNull();
    });
  });
});
