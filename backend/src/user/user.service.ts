import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getByUsernameOrThrow(username: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { username } });
  }
}
