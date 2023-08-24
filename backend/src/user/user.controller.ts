import {
  Controller,
  Get,
  Param,
  UseGuards,
  Query,
  Patch,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { PageDto, PageOptionsDto } from '../common';
import { UpdateUserDto } from './dto';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@GetUser() user: User): User {
    return user;
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    return this.userService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  update(
    @GetUser('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('me')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@GetUser('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
