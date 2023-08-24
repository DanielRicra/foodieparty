import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../constants';
import { Type } from 'class-transformer';

export class PageOptionsDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  @ApiPropertyOptional({ minimum: 1, default: 1 })
  readonly page: number = 1;

  @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take: number = 10;

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order: Order = Order.ASC;

  get skip(): number {
    return this.take * (this.page - 1);
  }
}
