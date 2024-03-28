import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PositionDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  position: string;
}
