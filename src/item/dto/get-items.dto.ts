import { Allow, IsOptional } from 'class-validator';

export class GetItemsDto {
  @Allow()
  @IsOptional()
  searchText?: string;
}
