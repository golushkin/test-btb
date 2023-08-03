import {
  ArrayMinSize,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { LocationEnum } from '../enums/location.enum';
import { IsEntityExists } from '../../shared/validation/is-entity-exists.decorator';
import { CollecitonNameEnum } from '../../shared/enums/collection-name.enum';

export class CreateItemDto {
  @IsEntityExists(CollecitonNameEnum.CATEGORIES)
  @IsMongoId()
  categoryId: string;

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

  @IsEntityExists(CollecitonNameEnum.ITEMS)
  @IsMongoId()
  @IsOptional()
  itemId?: string;
}
