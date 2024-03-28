import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionDTO } from './dto/position.dto';

@Controller('/position')
export class PositionController {
  constructor(private positionService: PositionService) {}

  @Get()
  async getPosition() {
    const position = await this.positionService.get();
    return {
      statusCode: HttpStatus.OK,
      message: 'Lista niveis cadastrados',
      position,
    };
  }

  @Patch(':id')
  async updatePosition(
    @Body() positionDTO: PositionDTO,
    @Param('id') id: number,
  ) {
    const updatedPosition = await this.positionService.update(positionDTO, id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Nivel alterado com sucesso!',
      updatedPosition,
    };
  }

  @Post()
  async createPosition(@Body() positionDTO: PositionDTO) {
    const position = await this.positionService.create(positionDTO);
    return {
      statusCode: HttpStatus.OK,
      message: 'Nivel criado com sucesso!',
      position,
    };
  }

  @Delete(':id')
  async deletePosition(@Param('id') id: number) {
    const deletedPosition = await this.positionService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Nivel deletado!',
      deletedPosition,
    };
  }
}
