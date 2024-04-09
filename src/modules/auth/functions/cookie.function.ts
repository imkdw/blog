// eslint-disable-next-line import/prefer-default-export
export const parseRefreshTokenByCookie = (cookie: string): string => {
  if (!cookie) return '';

  const tokenCookies: { [key: string]: string } = {};

  cookie.split(';').forEach((_cookie: string) => {
    const trimCookie = _cookie.trim();
    const mid = trimCookie.indexOf('=');
    const [key, value] = [trimCookie.slice(0, mid), trimCookie.slice(mid + 1)];
    tokenCookies[key] = value;
  });

  const refreshToken = tokenCookies?.refreshToken || '';

  return refreshToken;
};
