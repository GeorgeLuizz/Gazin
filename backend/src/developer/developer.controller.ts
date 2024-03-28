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
import { DeveloperService } from './developer.service';
import { DeveloperDTO } from './dto/developer.dto';

@Controller('/developer')
export class DeveloperController {
  constructor(private developerService: DeveloperService) {}

  @Get()
  async getDeveloper() {
    const developer = await this.developerService.get();
    return {
      statusCode: HttpStatus.OK,
      message: 'Lista de desenvolvedores cadastrados',
      developer,
    };
  }

  @Patch(':id')
  async updateDeveloper(
    @Body() developerDTO: DeveloperDTO,
    @Param('id') id: number,
  ) {
    const updatedDeveloper = await this.developerService.update(
      developerDTO,
      id,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Desenvolvedor alterado com sucesso!',
      updatedDeveloper,
    };
  }

  @Post()
  async createDeveloper(@Body() developerDTO: DeveloperDTO) {
    const developer = await this.developerService.create(developerDTO);
    return {
      statusCode: HttpStatus.OK,
      message: 'Desenvolvedor criado com sucesso!',
      developer,
    };
  }

  @Delete(':id')
  async deleteDeveloper(@Param('id') id: number) {
    const deletedDeveloper = await this.developerService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Desenvolvedor deletado!',
      deletedDeveloper,
    };
  }
}
