import { parseRefreshTokenByCookie } from '../../functions/cookie.function';

describe('cookie.function.ts', () => {
  describe('parseRefreshTokenByCookie', () => {
    it('전달된 쿠키가 없을경우 빈 값을 반환한다', () => {
      const cookie = '';

      const refreshToken = parseRefreshTokenByCookie(cookie);

      expect(refreshToken).toBe('');
    });

    it('refreshToken이 포함된 쿠키가 없을경우 빈 값을 반환한다', () => {
      const cookie = 'accessToken=token';

      const refreshToken = parseRefreshTokenByCookie(cookie);

      expect(refreshToken).toBe('');
    });

    it('refreshToken이 포함된 쿠키가 있을경우 refreshToken 값을 반환한다', () => {
      const cookie = 'accessToken=token; refreshToken=refreshToken';

      const refreshToken = parseRefreshTokenByCookie(cookie);

      expect(refreshToken).toBe('refreshToken');
    });
  });
});
