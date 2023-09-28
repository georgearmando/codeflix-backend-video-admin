import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { InvalidUUIDError, Uuid } from "../../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-inMemory.repository";
import { GetCategoryUsecase } from "../get-category.usecase";

describe("GetCategoryUseCase Unit Tests", () => {
  let useCase: GetCategoryUsecase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUsecase(repository);
  });

  it("should throw an error if the category does not exist", async () => {
    await expect(() => 
      useCase.execute({ id: "123" })
    ).rejects.toThrow(new InvalidUUIDError());

    const uuid = new Uuid();

    await expect(() => 
      useCase.execute({ id: uuid.id })
    ).rejects.toThrow(new NotFoundError(uuid.id, Category));
  });

  it("should return a category", async () => {
    const items = [Category.create({ name: "Movie" })];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].category_id.id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].category_id.id,
      name: items[0].name,
      description: null,
      is_active: true,
      created_at: items[0].created_at
    })
  })
});