import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarSchema } from './schemas/car.schema';

@Module({
  imports: [
    //MongooseModule.forFeature is responsible for defining the Mongoose model for a specific schema, allowing to interact with MongoDB collections using this model within the service
    MongooseModule.forFeature([
      {
        name: 'Car',
        schema: CarSchema,
      },
    ]),
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
