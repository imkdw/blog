export interface CreateJwtTokenDto {
  email: string;
  tokenType: 'access' | 'refresh';
}
