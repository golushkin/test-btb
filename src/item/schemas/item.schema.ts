import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { LocationEnum } from '../enums/location.enum';
import { CollecitonNameEnum } from '../../shared/enums/collection-name.enum';
import { Category } from '../../category/schemas/category.schema';

@Schema({ collection: CollecitonNameEnum.ITEMS })
export class Item {
  @Prop({ type: Types.ObjectId, ref: Category.name })
  categoryId: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop({ enum: LocationEnum })
  location: LocationEnum;

  @Prop({ default: undefined })
  tags?: string[];

  @Prop({ type: Types.ObjectId, ref: Item.name })
  itemId?: Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.pre('save', function () {
  this.itemId = this.itemId
    ? new Types.ObjectId(this.itemId as unknown as string)
    : undefined;

  this.categoryId = new Types.ObjectId(this.categoryId as unknown as string);
});
