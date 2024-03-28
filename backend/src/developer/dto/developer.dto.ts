import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DEVELOPERS_GENDER_ENUM } from '../enum/developers_gender.enum';
import { Position } from 'src/position/entity/position.entity';

export class DeveloperDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  positionID: Position[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  gender: DEVELOPERS_GENDER_ENUM;

  @IsNotEmpty()
  @IsDate()
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  hobby: string;
}
