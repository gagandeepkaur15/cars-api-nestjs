import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './car.dto';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  public getCars() {
    return this.carService.getCars();
  }

  @Post()
  public postCar(@Body() car: CarDto) {
    return this.carService.postCar(car);
  }

  @Get(':id')
  public getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carService.getCarById(id);
  }

  @Delete(':id')
  public deleteCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carService.deleteCarById(id);
  }

  @Put(':id')
  public putCarById(@Param('id', ParseIntPipe) id: number, @Query() query) {
    const propertyName = query.propertyName;
    const propertyValue = query.propertyValue;
    return this.carService.putCarById(id, propertyName, propertyValue);
  }
}
