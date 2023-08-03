import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const DbModule = MongooseModule.forRootAsync({
  useFactory: (configService: ConfigService) => {
    const user = configService.getOrThrow('DB_USERNAME');
    const pass = configService.getOrThrow('DB_PASS');
    const host = configService.getOrThrow('DB_HOST');
    const port = configService.getOrThrow('DB_PORT');

    return {
      uri: `mongodb://${user}:${pass}@${host}:${port}/`,
    };
  },
  inject: [ConfigService],
});
