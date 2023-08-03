import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { CollecitonNameEnum } from '../enums/collection-name.enum';
import { getObjectId } from '../../utils/object-id.utils';

@ValidatorConstraint({ name: 'EntityExistsValidator', async: true })
@Injectable()
export class EntityExistsValidator implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  private checkCollection(constraints: any[]): CollecitonNameEnum {
    if (
      !constraints ||
      !Array.isArray(constraints) ||
      !constraints[0] ||
      !constraints[0]
    ) {
      throw new InternalServerErrorException('Invalid constraint!');
    }

    const collectionName = constraints[0];

    if (!this.connection.collections[collectionName]) {
      this.connection.createCollection(collectionName);
    }

    return collectionName;
  }

  async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(
        `Invalid objectId(${value}) for ${validationArguments.property}!`,
      );
    }

    const collectionName = this.checkCollection(
      validationArguments.constraints,
    );

    const record = await this.connection.collection(collectionName).findOne({
      _id: getObjectId(value),
    });

    return !!record;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} contains incorrect id(${args.value}), there is no record!`;
  }
}
