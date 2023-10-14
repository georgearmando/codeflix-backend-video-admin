import { Entity } from '../../../../domain/entity';
import { NotFoundError } from '../../../../domain/errors/not-found.error';
import { Uuid } from '../../../../domain/value-objects/uuid.vo';
import { InMemoryRepository } from '../in-memory.repository';

type StubEntityProps = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityProps) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  it('should insert a new entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Test',
      price: 100,
    });

    await repo.insert(entity);

    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toBe(entity);
  });

  it('should bulk insert entities', async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Test',
        price: 100,
      }),

      new StubEntity({
        entity_id: new Uuid(),
        name: 'Test 1',
        price: 100,
      }),
    ];

    await repo.bulkInsert(entities);

    expect(repo.items.length).toBe(2);
    expect(repo.items[0]).toBe(entities[0]);
    expect(repo.items[1]).toBe(entities[1]);
    expect(repo.items[0].name).toBe('Test');
  });

  it('should find all entities', async () => {
    const entity = new StubEntity({
      name: 'Test',
      price: 100,
    });
    await repo.insert(entity);

    const entities = await repo.findAll();
    expect(entities).toStrictEqual([entity]);
  });

  it('should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });
    await repo.insert(entity);

    const entityFounded = await repo.findById(entity.entity_id);
    expect(entityFounded).toStrictEqual(entity);
    expect(entity.toJSON()).toStrictEqual(repo.items[0].toJSON());
  });

  it('should throw an error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });
    await expect(repo.update(entity)).rejects.toThrowError(
      new NotFoundError(entity.entity_id, StubEntity),
    );
  });

  it('should update an entity', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });
    await repo.insert(entity);

    const entityUpdated = new StubEntity({
      entity_id: entity.entity_id,
      name: 'Test Updated',
      price: 200,
    });

    await repo.update(entityUpdated);
    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toBe(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repo.items[0].toJSON());
  });

  it('should throw an error on delete when entity not found', async () => {
    const uuid = new Uuid();
    await expect(repo.delete(uuid)).rejects.toThrow(
      new NotFoundError(uuid, StubEntity),
    );

    await expect(
      repo.delete(new Uuid('123e4567-e89b-12d3-a456-426614174000')),
    ).rejects.toThrowError(
      new NotFoundError('123e4567-e89b-12d3-a456-426614174000', StubEntity),
    );
  });

  it('should delete an entity', async () => {
    const entity = new StubEntity({ name: 'Test', price: 100 });
    await repo.insert(entity);
    expect(repo.items.length).toBe(1);

    await repo.delete(entity.entity_id);
    expect(repo.items.length).toBe(0);
  });
});
