import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';
import { Category } from '../category.entity';

describe('Category Entity Unit Tests', () => {
  describe('Constructor', () => {
    it('should create a new category with name only', () => {
      console.log(process.env.NODE_ENV);
      const category = new Category({
        name: 'Movie',
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it('should create a new category with name and description', () => {
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it('should create a new category with all props', () => {
      const created_at = new Date();
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        is_active: true,
        created_at,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBe(created_at);
    });
  });

  describe('Create Method', () => {
    it('should create a new category', () => {
      const category = Category.create({
        name: 'Movie',
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it('should create a new category with all props', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
        is_active: true,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it('should create a new category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it('should create a new category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: false,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe('category_id field', () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ];

    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        name: 'Movie',
        category_id: category_id as any,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    });
  });

  describe('Change Methods', () => {
    it('should change name', () => {
      const category = new Category({
        name: 'Movie',
      });
      category.changeName('New Movie');
      expect(category.name).toBe('New Movie');
    });

    it('should change description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
      });
      category.changeDescription('New Movie description');
      expect(category.description).toBe('New Movie description');
    });

    it('should activate category', () => {
      const category = new Category({
        name: 'Movie',
        is_active: false,
      });
      category.activate();
      expect(category.is_active).toBeTruthy();
    });

    it('should deactivate category', () => {
      const category = new Category({
        name: 'Movie',
        is_active: true,
      });
      category.deactivate();
      expect(category.is_active).toBeFalsy();
    });
  });

  describe('Update Method', () => {
    it('should update name', () => {
      const category = Category.create({
        name: 'Movie',
      });
      category.update('New Movie', null);
      expect(category.name).toBe('New Movie');
      expect(category.description).toBeNull();
    });

    it('should update description', () => {
      const category = Category.create({
        name: 'Movie',
      });
      category.update('Movie', 'New Description');
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('New Description');
    });

    it('should update name and description', () => {
      const category = Category.create({
        name: 'Movie',
      });
      category.update('New Movie', 'New Description');
      expect(category.name).toBe('New Movie');
      expect(category.description).toBe('New Description');
    });
  });
});

describe('Category Validator', () => {
  describe('create command', () => {
    it('should invalidate category with wrong name property', () => {
      const category = Category.create({ name: 't'.repeat(256) });

      expect(category.notification.hasErrors()).toBeTruthy();
      expect(category.notification).notificationContainsErrorMessages([
        {
          name: ['name must be shorter than or equal to 255 characters'],
        },
      ]);
    });

    describe('ChangeName method', () => {
      it('should invalidate category with wrong name property', () => {
        const category = Category.create({ name: 't'.repeat(256) });
        category.changeName('t'.repeat(257));
        expect(category.notification.hasErrors()).toBeTruthy();
        expect(category.notification).notificationContainsErrorMessages([
          {
            name: ['name must be shorter than or equal to 255 characters'],
          },
        ]);
      });
    });
  });
});
