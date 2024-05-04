import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';

import UserRepositoryStub from '../stubs/user.repository.stub';
import MyConfigServiceStub from '../../../__test__/stubs/my-config.service.stub';
import { IUserService, UserRepositoryKey, UserServiceKey } from '../../interfaces/user.interface';
import { MyConfigServiceKey } from '../../../../infra/config/interfaces/my-config.interface';
import UserService from '../../service/user.service';
import { CreateUserDto } from '../../dto/internal/create-user.dto';
import { ExistEmailException, ExistNicknameException } from '../../../../common/exceptions/409';
import { UserBuilder } from '../../entities/user.entity';

describe('UserService', () => {
  let userService: IUserService;
  let userRepository: UserRepositoryStub;
  let myConfigService: MyConfigServiceStub;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UserServiceKey,
          useClass: UserService,
        },
        {
          provide: UserRepositoryKey,
          useClass: UserRepositoryStub,
        },
        {
          provide: MyConfigServiceKey,
          useClass: MyConfigServiceStub,
        },
      ],
    }).compile();

    userService = module.get<IUserService>(UserServiceKey);
    userRepository = module.get<UserRepositoryStub>(UserRepositoryKey);
    myConfigService = module.get<MyConfigServiceStub>(MyConfigServiceKey);
  });

  describe('create', () => {
    const createUserDtoSample = (dto: Partial<CreateUserDto> = {}): CreateUserDto => ({
      email: faker.internet.email(),
      nickname: faker.internet.userName(),
      oAuthProviderId: 1,
      roleId: 1,
      signupChannelId: 1,
      password: 'password',
      ...dto,
    });

    it('이메일이 중복된 경우 ExistEmailException이 발생', async () => {
      // given
      const dto = createUserDtoSample();

      // when, then
      await expect(userService.create(dto)).rejects.toThrow(ExistEmailException);
    });

    it('닉네임이 중복된 경우 ExistNicknameException이 발생', async () => {
      // given
      const dto = createUserDtoSample();
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      // when, then
      await expect(userService.create(dto)).rejects.toThrow(ExistNicknameException);
    });

    describe('사용자 생성 성공', () => {
      it('사용자 생성 성공', async () => {
        // given
        const dto: CreateUserDto = {
          email: faker.internet.email(),
          nickname: faker.internet.userName(),
          oAuthProviderId: 1,
          roleId: 1,
          signupChannelId: 1,
          password: 'password',
        };
        jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
        jest.spyOn(userRepository, 'findByNickname').mockResolvedValue(null);
        jest.spyOn(userRepository, 'save').mockResolvedValue(null);

        // when
        const result = await userService.create(dto);

        // then
        expect(result).toBeCalled();
      });
    });
  });
});
