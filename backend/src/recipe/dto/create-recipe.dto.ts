import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  instructions: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @ApiProperty()
  @Min(0)
  @IsOptional()
  prepTime?: number;

  @IsInt()
  @ApiProperty()
  @Min(0)
  @IsOptional()
  cookTime?: number;

  @IsInt()
  @ApiProperty()
  @Min(0)
  @IsOptional()
  totalTime?: number;

  @ApiPropertyOptional({ default: null })
  @IsUUID()
  @IsOptional()
  userId?: string = null;
}
