import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma, User } from '@prisma/client';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { PageDto } from '../common';
import { PageMetaDto, PageOptionsDto } from '../common/dto';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const queryOptions: Prisma.UserFindFirstArgs = {
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    };

    const [users, count] = await Promise.all([
      this.prisma.user.findMany(queryOptions),
      this.prisma.user.count(),
    ]);

    const meta = new PageMetaDto({ itemCount: count, pageOptionsDto });

    if (pageOptionsDto.page > meta.pageCount) {
      throw new NotFoundException('Page not found');
    }

    return new PageDto<User>(users, meta);
  }

  getByUsernameOrThrow(username: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { username } });
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await argon.hash(updateUserDto.password);
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `${error.meta.target[0]} already exists`,
          );
        }
      }
    }
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }
}
