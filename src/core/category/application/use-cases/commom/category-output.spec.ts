import { Category } from '../../../domain/category.entity';
import { CategoryOutputMapper } from './category-output';

describe('CategoryOutputMapper Unit Tests', () => {
  it('should return a category output', () => {
    const entity = Category.create({
      name: 'Movie',
      description: 'some description',
      is_active: true,
    });

    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = CategoryOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.category_id.id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: entity.created_at,
    });
  });
});
