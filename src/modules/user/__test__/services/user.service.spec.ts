import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import MyConfigServiceStub from '../../../__test__/stubs/my-config.service.stub';
import UserRepositoryStub from '../stubs/user.repository.stub';
import { IUserService, UserRepositoryKey, UserServiceKey } from '../../interfaces/user.interface';
import { MyConfigServiceKey } from '../../../../infra/config/interfaces/my-config.interface';
import UserService from '../../service/user.service';
import { UserCreateEntityBuilder } from '../../entities/user-create.entity';
import { CreateUserDto } from '../../dto/internal/create-user.dto';
import { ExistEmailException, ExistNicknameException } from '../../../../common/exceptions/409';
import createUUID from '../../../../common/utils/uuid';
import { CheckDuplicateType } from '../../enums/user.enum';

describe('UserService', () => {
  let userRepository: UserRepositoryStub;
  let userService: IUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    userRepository = module.get<UserRepositoryStub>(UserRepositoryKey);
    userService = module.get<UserService>(UserServiceKey);

    await userService.onModuleInit();
    userRepository.reset();
  });

  describe('create', () => {
    it('이메일이 중복되는 경우 ExistEmailException 예외를 던진다', async () => {
      // given
      const email = faker.internet.email();

      const userCreateEntity = new UserCreateEntityBuilder().setEmail(email).build();
      await userRepository.save(userCreateEntity);

      const createUserDto: CreateUserDto = {
        email,
        nickname: faker.internet.userName(),
        roleId: 1,
        signupChannelId: 1,
        oAuthProviderId: 1,
        password: faker.internet.password(),
      };

      // when, then
      await expect(() => userService.create(createUserDto)).rejects.toThrow(ExistEmailException);
    });

    it('닉네임이 중복되는 경우 ExistNicknameException 예외를 던진다', async () => {
      // given
      const nickname = faker.internet.email();

      const userCreateEntity = new UserCreateEntityBuilder().setNickname(nickname).build();
      await userRepository.save(userCreateEntity);

      const createUserDto: CreateUserDto = {
        email: faker.internet.email(),
        nickname,
        roleId: 1,
        signupChannelId: 1,
        oAuthProviderId: 1,
        password: faker.internet.password(),
      };

      // when, then
      await expect(() => userService.create(createUserDto)).rejects.toThrow(ExistNicknameException);
    });

    describe('정상적인 유저 생성', () => {
      it('유저가 생성되고, 생성된 유저를 반환한다', async () => {
        // given
        const createUserDto: CreateUserDto = {
          email: faker.internet.email(),
          nickname: faker.internet.userName(),
          roleId: 1,
          signupChannelId: 1,
          oAuthProviderId: 1,
          password: faker.internet.password(),
        };

        // when
        const createdUser = await userService.create(createUserDto);

        // then
        expect(createdUser).toBeDefined();
      });

      it('유저의 비밀번호가 해싱되어 저장된다', async () => {
        // given
        const createUserDto: CreateUserDto = {
          email: faker.internet.email(),
          nickname: faker.internet.userName(),
          roleId: 1,
          signupChannelId: 1,
          oAuthProviderId: 1,
          password: faker.internet.password(),
        };

        // when
        const createdUser = await userService.create(createUserDto);

        // then
        expect(createdUser.password).not.toBe(createUserDto.password);
      });
    });
  });

  describe('update', () => {
    it('유저 정보를 업데이트한다', async () => {
      // given
      const userId = createUUID();
      const updateUserDto = {
        nickname: faker.internet.userName(),
      };

      // when
      await userService.update(userId, updateUserDto);

      // then
      expect(userRepository.isCallUpdate).toBe(true);
    });
  });

  describe('checkDuplicate', () => {
    it('중복된 이메일이 있는경우 true를 반환한다', async () => {
      // given
      const email = faker.internet.email();
      const userCreateEntity = new UserCreateEntityBuilder().setEmail(email).build();
      await userRepository.save(userCreateEntity);

      // when
      const isDuplicate = await userService.checkDuplicate(CheckDuplicateType.EMAIL, email);

      // then
      expect(isDuplicate).toBe(true);
    });

    it('중복된 이메일이 없는경우 true를 반환한다', async () => {
      // given
      const email = faker.internet.email();

      // when
      const isDuplicate = await userService.checkDuplicate(CheckDuplicateType.EMAIL, email);

      // then
      expect(isDuplicate).toBe(false);
    });

    it('중복된 닉네임이 있는경우 true를 반환한다', async () => {
      // given
      const nickname = faker.internet.userName();
      const userCreateEntity = new UserCreateEntityBuilder().setNickname(nickname).build();
      await userRepository.save(userCreateEntity);

      // when
      const isDuplicate = await userService.checkDuplicate(CheckDuplicateType.NICKNAME, nickname);

      // then
      expect(isDuplicate).toBe(true);
    });

    it('중복된 닉네임이 없는경우 true를 반환한다', async () => {
      // given
      const nickname = faker.internet.userName();

      // when
      const isDuplicate = await userService.checkDuplicate(CheckDuplicateType.NICKNAME, nickname);

      // then
      expect(isDuplicate).toBe(false);
    });
  });

  describe('findById', () => {
    it('유저가 존재하는 경우 해당 유저를 반환한다', async () => {
      // given
      const userId = createUUID();
      const userCreateEntity = new UserCreateEntityBuilder().setId(userId).build();
      await userRepository.save(userCreateEntity);

      // when
      const user = await userService.findById(userId);

      // then
      expect(user).toBe(userCreateEntity);
    });

    it('유저가 존재하지 않는 경우 null을 반환한다.', async () => {
      // given
      const userId = createUUID();

      // when
      const user = await userService.findById(userId);

      // then
      expect(user).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('유저가 존재하는 경우 해당 유저를 반환한다', async () => {
      // given
      const email = faker.internet.email();
      const userCreateEntity = new UserCreateEntityBuilder().setEmail(email).build();
      await userRepository.save(userCreateEntity);

      // when
      const user = await userService.findByEmail(email);

      // then
      expect(user).toBe(userCreateEntity);
    });

    it('유저가 존재하지 않는 경우 null을 반환한다.', async () => {
      // given
      const email = faker.internet.email();

      // when
      const user = await userService.findByEmail(email);

      // then
      expect(user).toBeNull();
    });
  });

  describe('findByNickname', () => {
    it('유저가 존재하는 경우 해당 유저를 반환한다', async () => {
      // given
      const nickname = faker.internet.userName();
      const userCreateEntity = new UserCreateEntityBuilder().setNickname(nickname).build();
      await userRepository.save(userCreateEntity);

      // when
      const user = await userService.findByNickname(nickname);

      // then
      expect(user).toBe(userCreateEntity);
    });

    it('유저가 존재하지 않는 경우 null을 반환한다.', async () => {
      // given
      const nickname = faker.internet.userName();

      // when
      const user = await userService.findByNickname(nickname);

      // then
      expect(user).toBeNull();
    });
  });
});
