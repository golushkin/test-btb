import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CollecitonNameEnum } from '../../shared/enums/collection-name.enum';

@Schema({ collection: CollecitonNameEnum.CATEGORIES })
export class Category {
  @Prop()
  name: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Category);
