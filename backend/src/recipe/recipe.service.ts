import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common';
import { Prisma, Recipe } from '@prisma/client';
import { checkPrismaErrorCode } from 'src/utils';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto, userId?: string) {
    if (!createRecipeDto.userId && userId) {
      createRecipeDto.userId = userId;
    }

    try {
      const recipe = await this.prisma.recipe.create({
        data: createRecipeDto,
      });

      return recipe;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        checkPrismaErrorCode(
          error.code,
          (error.meta?.target as Array<string>)?.at(0) ?? 'unknown',
        );
      }
      throw error;
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Recipe>> {
    const queryOptions: Prisma.RecipeFindManyArgs = {
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    };

    const [recipes, count] = await this.prisma.$transaction([
      this.prisma.recipe.findMany(queryOptions),
      this.prisma.recipe.count(),
    ]);

    const meta = new PageMetaDto({ itemCount: count, pageOptionsDto });

    if (recipes.length && pageOptionsDto.page > meta.pageCount) {
      throw new NotFoundException('Page not found');
    }

    return new PageDto<Recipe>(recipes, meta);
  }

  async findOne(id: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto, userId: string) {
    updateRecipeDto.userId = userId;
    try {
      const updatedRecipe = await this.prisma.recipe.update({
        where: { id, userId },
        data: updateRecipeDto,
      });

      return updatedRecipe;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        checkPrismaErrorCode(
          error.code,
          (error.meta?.target as Array<string>)?.at(0) ?? 'unknown',
        );
      }
      throw error;
    }
  }

  async remove(id: number, userId: string) {
    try {
      await this.prisma.recipe.delete({ where: { id, userId } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User recipe not found');
        }
      }
    }
  }
}
