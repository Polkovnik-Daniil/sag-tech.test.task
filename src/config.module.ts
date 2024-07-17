import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [NestConfigModule.forRoot({ isGlobal: true })],
})
export class ConfigModule {}

// it is used to read data from the .env file
