import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import {
  InvalidUUIDError,
  Uuid,
} from '../../../../../shared/domain/value-objects/uuid.vo';
import { Category } from '../../../../domain/category.entity';
import { CategoryInMemoryRepository } from '../../../../infra/db/in-memory/category-inMemory.repository';
import { DeleteCategoryUseCase } from '../delete-category.usecase';

describe('DeleteCategoryUseCase Unit Tests', () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it('should throw an error if the category does not exist', async () => {
    await expect(() => useCase.execute({ id: '123' })).rejects.toThrow(
      new InvalidUUIDError(),
    );

    const uuid = new Uuid();

    await expect(() => useCase.execute({ id: uuid.id })).rejects.toThrow(
      new NotFoundError(uuid.id, Category),
    );
  });

  it('should delete a category', async () => {
    const items = [new Category({ name: 'test' })];
    repository.items = items;
    const spyDelete = jest.spyOn(repository, 'delete');
    await useCase.execute({ id: items[0].category_id.id });
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(repository.items).toHaveLength(0);
  });
});
