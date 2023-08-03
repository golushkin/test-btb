import {
  ArrayMinSize,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { CategoryEnum } from '../enums/category.enum';
import { LocationEnum } from '../enums/location.enum';

export class CreateItemDto {
  @IsEnum(CategoryEnum)
  category: CategoryEnum;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsEnum(LocationEnum)
  location: LocationEnum;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1)
  @IsOptional()
  tags?: string[];

  @IsMongoId()
  @IsOptional()
  itemId?: string;
}
