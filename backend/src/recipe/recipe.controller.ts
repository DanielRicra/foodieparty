import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RecipeService } from './recipe.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto';
import { ApiPaginatedResponse } from 'src/common/decorator';
import { PageOptionsDto } from 'src/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@ApiTags('Recipes')
@Controller('api/recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  create(
    @GetUser('id') userId: string,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return this.recipeService.create(createRecipeDto, userId);
  }

  @Get()
  // TODO: Recipe Dto for api paginated docs
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.recipeService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  update(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipeService.update(id, updateRecipeDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  remove(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number) {
    return this.recipeService.remove(id, userId);
  }
}
