import { Sequelize } from 'sequelize-typescript';
import { CategoryModel } from '../category.model';
import { CategoryModelMapper } from '../category-model-mapper';
import { EntityValidationError } from '../../../../../shared/domain/validators/validation.error';
import { Category } from '../../../../domain/category.entity';
import { Uuid } from '../../../../../shared/domain/value-objects/uuid.vo';
import { setupSequelize } from '../../../../../shared/infra/testing/helpers';

describe('CategoryModelMapper Integration Tests', () => {
  setupSequelize({ models: [CategoryModel] });

  it('should throws an error when category is ivalid', () => {
    expect.assertions(2);
    const model = CategoryModel.build({
      category_id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'a'.repeat(256),
    });
    try {
      CategoryModelMapper.toEntity(model);
      fail(
        'The category is valid, but it needs to throws a EntityValidationError',
      );
    } catch (e) {
      expect(e).toBeInstanceOf(EntityValidationError);
      expect((e as EntityValidationError).error).toMatchObject([
        {
          name: ['name must be shorter than or equal to 255 characters'],
        },
      ]);
    }
  });

  it('should convert a category model to a category entity', () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      category_id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at,
    });

    const entity = CategoryModelMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new Category({
        category_id: new Uuid('9366b7dc-2d71-4799-b91c-c64adb205104'),
        name: 'Movie',
        description: 'some description',
        is_active: true,
        created_at,
      }).toJSON(),
    );
  });

  it('should convert a category entity to a category model', () => {
    const created_at = new Date();
    const entity = new Category({
      category_id: new Uuid('9366b7dc-2d71-4799-b91c-c64adb205104'),
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at,
    });

    const model = CategoryModelMapper.toModel(entity);
    expect(model.toJSON()).toStrictEqual({
      category_id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at,
    });
  });
});
