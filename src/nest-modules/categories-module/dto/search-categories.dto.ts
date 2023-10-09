import { ListCategoriesInput } from '@core/category/application/use-cases/list-categories/list-categories.usecase';
import { SortDirection } from '@core/shared/domain/repositories/search-params';

export class SearchCategoriesDto implements ListCategoriesInput {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
