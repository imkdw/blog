import User from '../../entities/user.entity';

export interface UpdateUserDto extends Partial<Omit<User, 'id'>> {}
