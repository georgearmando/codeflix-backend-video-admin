import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-inMemory.repository";
import { CreateCategoryUseCase } from "../create-category.usecase";

describe("CreateCategoryUseCase Unit Tests", () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    // O repositorio em memoria substitui a necessidade do uso de Mocks
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it("should throw an error when category is not valid", async () => {
    const input = { name: 't'.repeat(256) };
    await expect(() => useCase.execute(input)).rejects.toThrowError(
      'Entity Validation Error',
    );
  });

  it("should create a category", async () => {
    const spyInsert = jest.spyOn(repository, "insert");
    let output = await useCase.execute({ name: 'test' });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].category_id.id,
      name: 'test',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at
    });

    output = await useCase.execute({ 
      name: 'test',
      description: 'some description',
      is_active: false 
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].category_id.id,
      name: 'test',
      description: 'some description',
      is_active: false,
      created_at: repository.items[1].created_at
    });
  });
});