import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  bio: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  password?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  username: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  profileImageUrl: string;
}
