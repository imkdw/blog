import { Test, TestingModule } from '@nestjs/testing';
import {
  IUserSignupChannelService,
  UserSignupChannelRepositoryKey,
  UserSignupChannelServiceKey,
} from '../../interfaces/user-signup-channel.interface';
import UserSignupChannelRepositoryStub from '../stubs/user-signup-channel.repository.stub';
import UserSignupChannelService from '../../service/user-signup-channel.service';
import { UserSignupChannels } from '../../enums/user-signup-channel.enum';

describe('UserSignupChannelService', () => {
  let userSignupChannelService: IUserSignupChannelService;
  let userSignupChannelRepositoryStub: UserSignupChannelRepositoryStub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserSignupChannelServiceKey,
          useClass: UserSignupChannelService,
        },
        {
          provide: UserSignupChannelRepositoryKey,
          useClass: UserSignupChannelRepositoryStub,
        },
      ],
    }).compile();

    userSignupChannelService = module.get<IUserSignupChannelService>(UserSignupChannelServiceKey);
    userSignupChannelRepositoryStub = module.get<UserSignupChannelRepositoryStub>(UserSignupChannelRepositoryKey);

    userSignupChannelRepositoryStub.reset();
  });

  describe('findByName', () => {
    it('유저 가입 채널 정보가 존재하면 해당 정보를 반환한다', async () => {
      // given
      userSignupChannelRepositoryStub.init();

      // when
      const channel = await userSignupChannelService.findByName(UserSignupChannels.COMMON);

      // then
      expect(channel).not.toBeNull();
    });

    it('유저 가입 채널 정보가 존재하지 않으면 null을 반환한다', async () => {
      // when
      const channel = await userSignupChannelService.findByName('facebook');

      // then
      expect(channel).toBeNull();
    });
  });
});
