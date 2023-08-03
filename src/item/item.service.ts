import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './schemas/item.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetItemsDto } from './dto/get-items.dto';
import { ItemDocument } from './types/item-document.type';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemModel.create(createItemDto);
  }

  async findAll(params: GetItemsDto): Promise<Item[]> {
    const filter: FilterQuery<ItemDocument> = {};
    const { searchText } = params;

    if (searchText) {
      const textRegExp = new RegExp(`.*${searchText}.*`, 'i');
      filter.$or = [{ title: textRegExp }, { tags: textRegExp }];
    }

    return await this.itemModel.find(filter);
  }
}
