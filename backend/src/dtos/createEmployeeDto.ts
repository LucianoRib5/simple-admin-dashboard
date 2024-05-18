import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  position?: string;

  @IsNotEmpty()
  @IsString()
  department?: string;

  @IsNotEmpty()
  @IsDate()
  hireDate?: Date;
}