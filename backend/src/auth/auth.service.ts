import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signin(dto: LoginDto) {
    try {
      const existingUser = await this.prisma.user.findUniqueOrThrow({
        where: {
          username: dto.username,
        },
      });

      const isCorrectPassword = await argon.verify(
        existingUser.password,
        dto.password,
      );

      if (!isCorrectPassword) {
        throw new UnauthorizedException('Bad credentials');
      }

      delete existingUser.password;

      return existingUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User with username not found');
        }
      }
      throw error;
    }
  }

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          username: dto.username,
        },
      });
      delete user.password;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `${error.meta.target[0]} already exists`,
          );
        }
      }

      throw error;
    }
  }
}
