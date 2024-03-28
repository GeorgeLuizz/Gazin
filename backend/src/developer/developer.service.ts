import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Developer } from './entity/developer.entity';
import { DeveloperDTO } from './dto/developer.dto';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
  ) {}
  //Create
  async create(developerDto: DeveloperDTO) {
    try {
      const developer = this.developerRepository.create(developerDto);
      await this.developerRepository.save(developer);
      return developer;
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }
  //Read
  async get() {
    try {
      return await this.developerRepository.find();
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }
  //Update
  async update(developerDto: DeveloperDTO, id: number) {
    try {
      await this.developerRepository.update({ id }, developerDto);
      return await this.developerRepository.findOne({ where: { id } });
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }
  //Delete
  async delete(id: number) {
    try {
      const deleteDeveloper = await this.developerRepository.delete(id);
      return deleteDeveloper;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
