import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private readonly userService: UserService,
  ) {}

  async signIn(dto: LoginDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.userService.getByUsernameOrThrow(
        dto.username,
      );

      await this.verifyPassword(user.password, dto.password);

      delete user.password;

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User with username not found');
        }
      }
      throw error;
    }
  }

  async signUp(dto: AuthDto): Promise<{ accessToken: string }> {
    const hash = await argon.hash(dto.password);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          username: dto.username,
        },
      });

      return this.signToken(newUser.id, newUser.email);
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

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const userForToken = {
      id: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const accessToken = await this.jwt.signAsync(userForToken, {
      expiresIn: '15m',
      secret,
    });
    return {
      accessToken,
    };
  }

  private async verifyPassword(
    hashedPassword: string,
    plainTextPassword: string,
  ) {
    const isPasswordMatching = await argon.verify(
      hashedPassword,
      plainTextPassword,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Bad credentials');
    }
  }
}
