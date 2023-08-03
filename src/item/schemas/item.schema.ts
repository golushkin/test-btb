import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { LocationEnum } from '../enums/location.enum';
import { CategoryEnum } from '../enums/category.enum';

@Schema()
export class Item {
  @Prop({ enum: CategoryEnum })
  category: CategoryEnum;

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
});
