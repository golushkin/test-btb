import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ItemModule } from './item/item.module';
import { EntityExistsValidator } from './shared/validation/entity-exists.validator';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    ItemModule,
    CategoryModule,
  ],
  providers: [EntityExistsValidator],
})
export class AppModule {}
