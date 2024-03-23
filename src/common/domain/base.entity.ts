import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export default abstract class BaseEntity {
  @ApiProperty({ description: '데이터를 생성한 시간' })
  @IsDate()
  readonly createAt: Date;

  @ApiProperty({ description: '데이터를 생성한 유저의 아이디' })
  @IsString()
  createUser: string = null;

  @ApiProperty({ description: '데이터를 수정한 시간' })
  @IsDate()
  readonly updateAt: Date;

  @ApiProperty({ description: '데이터를 수정한 유저의 아이디' })
  @IsString()
  updateUser: string = null;

  @ApiProperty({ description: '데이터를 삭제한 시간', required: false })
  @IsOptional()
  @IsDate()
  readonly deleteAt: Date | null;

  @ApiProperty({ description: '데이터를 삭제한 유저의 아이디', required: false })
  @IsOptional()
  @IsString()
  deleteUser: string | null;
}
