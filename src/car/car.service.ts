import { Injectable, HttpException } from '@nestjs/common';
// import { CARS } from './cars.mock';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/car.interface';
import { CarDto } from './car.dto';

// to filter out __v
const carProjection = {
  __v: false,
};

@Injectable()
export class CarService {
  //   private cars = CARS;
  constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {}

  public async getCars(): Promise<CarDto[]> {
    const cars = await this.carModel.find({}, carProjection).exec();
    if (!cars || !cars[0]) {
      throw new HttpException('Not Found', 404);
    }
    return cars;
  }

  public postCar(newCar: CarDto) {
    const car = new this.carModel(newCar);
    return car.save();
  }

  public async getCarById(id: number): Promise<CarDto> {
    // const car = this.cars.find((car) => car.id === id);
    // if (!car) {
    //   throw new HttpException('Not Found', 404);
    // }
    // return car;
    const car = await this.carModel.findOne({ id }, carProjection).exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }

  public async deleteCarById(id: number) {
    // const carIndex = this.cars.findIndex((car) => car.id === id);
    // if (carIndex == -1) {
    //   throw new HttpException('Not Found', 404);
    // }
    // this.cars.splice(carIndex, 1);
    // return this.cars;
    const car = await this.carModel.deleteOne({ id }).exec();
    if (car.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }

  public async putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<CarDto> {
    // const carIndex = this.cars.findIndex((car) => car.id === id);
    // if (carIndex == -1) {
    //   throw new HttpException('Not Found', 404);
    // }
    // this.cars[carIndex][propertyName] = propertyValue;
    // return this.cars;
    const car = await this.carModel
      .findOneAndUpdate({ id }, { [propertyName]: propertyValue })
      .exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }
}
