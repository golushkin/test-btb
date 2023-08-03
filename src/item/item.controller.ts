import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

import { Item } from './schemas/item.schema';
import { GetItemsDto } from './dto/get-items.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  async findAll(@Query() params: GetItemsDto): Promise<Item[]> {
    return this.itemService.findAll(params);
  }
}
