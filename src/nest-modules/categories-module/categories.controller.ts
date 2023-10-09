import { CategoryOutput } from '@core/category/application/use-cases/commom/category-output';
import { CreateCategoryUseCase } from '@core/category/application/use-cases/create-category/create-category.usecase';
import { DeleteCategoryUseCase } from '@core/category/application/use-cases/delete-category/delete-category.usecase';
import { GetCategoryUsecase } from '@core/category/application/use-cases/get-category/get-category.usecase';
import { ListCategoriesUseCase } from '@core/category/application/use-cases/list-categories/list-categories.usecase';
import { UpdateCategoryUseCase } from '@core/category/application/use-cases/update-category/update-category.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from './categories.presenter';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoriesDto } from './dto/search-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  // Esta e uma das formas de injectar as dependencias
  // Tambem pode ser feita no constructor da classe
  @Inject(CreateCategoryUseCase)
  private createUseCase: CreateCategoryUseCase;

  @Inject(UpdateCategoryUseCase)
  private updateUseCase: UpdateCategoryUseCase;

  @Inject(DeleteCategoryUseCase)
  private deleteUseCase: DeleteCategoryUseCase;

  @Inject(GetCategoryUsecase)
  private getUseCase: GetCategoryUsecase;

  @Inject(ListCategoriesUseCase)
  private listUseCase: ListCategoriesUseCase;

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    // Para o retorno, podemos criar uma classe com os dados a serem apresentados
    // ou retornar o output do usecase
    // Nos casos em que os dados sao diferentes e aconselhavel separar estas responsabilidades
    // Para outros em que os dados sao os mesmos podemos usar o uotput do usecase
    // Neste caso estamos a usar uma classe para apresentar os dados com algumas transformacoes
    const output = await this.createUseCase.execute(createCategoryDto);
    return CategoriesController.serialize(output);
  }

  @Get()
  async search(@Query() searchParamsDto: SearchCategoriesDto) {
    const output = await this.listUseCase.execute(searchParamsDto);
    return new CategoryCollectionPresenter(output);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    const output = await this.getUseCase.execute({ id });
    return CategoriesController.serialize(output);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const output = await this.updateUseCase.execute({
      id,
      ...updateCategoryDto,
    });
    return CategoriesController.serialize(output);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.deleteUseCase.execute({ id });
  }

  static serialize(output: CategoryOutput) {
    return new CategoryPresenter(output);
  }
}
