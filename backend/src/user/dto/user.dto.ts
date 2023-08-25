import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty()
  bio: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  @MaxLength(20)
  username: string;

  @IsString()
  @ApiProperty()
  profileImageUrl: string;

  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @Type(() => String)
  @ApiProperty()
  createdAt: Date;

  constructor(
    bio: string,
    name: string,
    username: string,
    profileImageUrl: string,
    id: string,
    email: string,
    createdAt: Date,
  ) {
    this.bio = bio;
    this.name = name;
    this.username = username;
    this.profileImageUrl = profileImageUrl;
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
  }
}
