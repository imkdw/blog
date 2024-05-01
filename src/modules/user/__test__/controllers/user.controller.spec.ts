import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import UserController from '../../controller/user.controller';
import { UserServiceKey } from '../../interfaces/user.interface';
import UserServiceStub from '../stubs/user.service.stub';
import { CheckDuplicateType } from '../../enums/user.enum';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserServiceStub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserServiceKey, useClass: UserServiceStub }],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserServiceStub>(UserServiceKey);

    userService.reset();
  });

  describe('checkDuplicate', () => {
    describe('이메일 중복검사', () => {
      it('중복된 이메일이 있으면 isDuplicate: true를 반환한다', async () => {
        // given
        const createdUser = await userService.create({
          email: faker.internet.email(),
          nickname: faker.internet.userName(),
          roleId: 1,
          signupChannelId: 1,
          oAuthProviderId: 1,
          password: faker.internet.password(),
        });

        // when
        const result = await userController.checkDuplicate({
          type: CheckDuplicateType.EMAIL,
          value: createdUser.email,
        });

        // then
        expect(result.isDuplicate).toBeTruthy();
      });
      it('중복된 이메일이 없으면 isDuplicate: false를 반환한다', async () => {
        // given
        const email = faker.internet.email();

        // when
        const result = await userController.checkDuplicate({
          type: CheckDuplicateType.EMAIL,
          value: email,
        });

        // then
        expect(result.isDuplicate).toBeFalsy();
      });
    });

    describe('닉네임 중복검사', () => {
      it('중복된 닉네임이 있으면 isDuplicate: true를 반환한다', async () => {
        // given
        const createdUser = await userService.create({
          email: faker.internet.email(),
          nickname: faker.internet.userName(),
          roleId: 1,
          signupChannelId: 1,
          oAuthProviderId: 1,
          password: faker.internet.password(),
        });

        // when
        const result = await userController.checkDuplicate({
          type: CheckDuplicateType.NICKNAME,
          value: createdUser.nickname,
        });

        // then
        expect(result.isDuplicate).toBeTruthy();
      });
      it('중복된 닉네임이 없으면 isDuplicate: false를 반환한다', async () => {
        // given
        const nickname = faker.internet.userName();

        // when
        const result = await userController.checkDuplicate({
          type: CheckDuplicateType.NICKNAME,
          value: nickname,
        });

        // then
        expect(result.isDuplicate).toBeFalsy();
      });
    });
  });
});
