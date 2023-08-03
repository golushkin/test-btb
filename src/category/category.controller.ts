import { Controller, Post, Body } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createItemDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createItemDto);
  }
}
