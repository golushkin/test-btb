import { HydratedDocument } from 'mongoose';
import { Item } from '../schemas/item.schema';

export type ItemDocument = HydratedDocument<Item>;
