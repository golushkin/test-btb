import { ValidationOptions, registerDecorator } from 'class-validator';
import { EntityExistsValidator } from './entity-exists.validator';
import { CollecitonNameEnum } from '../enums/collection-name.enum';

export function IsEntityExists(
  constraint: CollecitonNameEnum,
  validationOptions?: ValidationOptions & Record<string, any>,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: EntityExistsValidator.name,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: EntityExistsValidator,
      async: true,
      constraints: [constraint],
    });
  };
}
