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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorator/api-paginated-response.decorator';
import { UserDto } from './dto/user.dto';

@Controller('api/users')
@UseGuards(JwtGuard)
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User): User {
    return user;
  }

  @Get()
  @ApiPaginatedResponse(UserDto)
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<UserDto>> {
    return this.userService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch('me')
  update(
    @GetUser('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@GetUser('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
