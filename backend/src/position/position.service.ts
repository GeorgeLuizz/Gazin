import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Position } from './entity/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PositionDTO } from 'src/position/dto/position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}
  //Create
  async create(positionDto: PositionDTO) {
    try {
      const position = this.positionRepository.create(positionDto);
      await this.positionRepository.save(position);
      return position;
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }
  //Read
  async get() {
    try {
      return await this.positionRepository.find();
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }
  //Update
  async update(positionDto: PositionDTO, id: number) {
    try {
      await this.positionRepository.update({ id }, positionDto);
      return await this.positionRepository.findOne({ where: { id } });
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }
  //Delete
  async delete(id: number) {
    try {
      const deletePosition = await this.positionRepository.delete(id);
      return deletePosition;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
