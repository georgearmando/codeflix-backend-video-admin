import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Entity Unit Tests", () => {
  let validateSpy: any;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });

  describe("Constructor", () => {
    it("should create a new category with name only", () => {
      const category = new Category({
        name: "Movie"
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it("should create a new category with name and description", () => {
     const category = new Category({
      name: "Movie",
      description: "Movie description"
     });
     expect(category.category_id).toBeInstanceOf(Uuid);
     expect(category.name).toBe("Movie");
     expect(category.description).toBe("Movie description");
     expect(category.is_active).toBeTruthy();
     expect(category.created_at).toBeInstanceOf(Date);
    });

    it("should create a new category with all props", () => {
      const created_at = new Date();
      const category = new Category({
        name: "Movie",
        description: "Movie description",
        is_active: true,
        created_at
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBe(created_at);
    })
  });

  describe("Create Method", () => {
    it("should create a new category", () => {
      const category = Category.create({
        name: "Movie",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should create a new category with all props", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
        is_active: true,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
    
    it("should create a new category with description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should create a new category with is_active", () => {
      const category = Category.create({
        name: "Movie",
        is_active: false,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("category_id field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ];

    test.each(arrange)("id = %j", ({ category_id }) => {
      const category = new Category({
        name: "Movie",
        category_id: category_id as any,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      if(category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    })
  });

  describe("Change Methods", () => {
    it("should change name", () => {
      const category = Category.create({
        name: "Movie",
      });
      category.changeName("New Movie");
      expect(category.name).toBe("New Movie");
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    it("should change description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
      });
      category.changeDescription("New Movie description");
      expect(category.description).toBe("New Movie description");
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    it("should activate category", () => {
      const category = new Category({
        name: "Movie",
        is_active: false,
      });
      category.activate();
      expect(category.is_active).toBeTruthy();
    });

    it("should deactivate category", () => {
      const category = new Category({
        name: "Movie",
        is_active: true,
      });
      category.deactivate();
      expect(category.is_active).toBeFalsy();
    });
  });

  describe("Update Method", () => {
    it("should update name", () => {
      const category = Category.create({
        name: "Movie",
      });
      category.update("New Movie", null);
      expect(category.name).toBe("New Movie");
      expect(category.description).toBeNull();
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    it("should update description", () => {
      const category = Category.create({
        name: "Movie",
      });
      category.update("Movie", "New Description");
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("New Description");
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    it("should update name and description", () => {
      const category = Category.create({
        name: "Movie",
      });
      category.update("New Movie", "New Description");
      expect(category.name).toBe("New Movie");
      expect(category.description).toBe("New Description");
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Category Validator", () => {
  describe("create command", () => {
    it("should invalidate category with wrong name property", () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ]
      });

      expect(() => Category.create({ name: "" })).containsErrorMessages({
        name: [
          "name should not be empty",
        ]
      });

      expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ]
      });

      expect(() => Category.create({ name: "t".repeat(256) })).containsErrorMessages({
        name: [
          "name must be shorter than or equal to 255 characters",
        ]
      });
    });

    it("should invalidate category with wrong description property", () => {
      expect(() => Category.create({ description: 5 } as any)).containsErrorMessages({
        description: [
          "description must be a string",
        ]
      });
    });

    it("should invalidate category with wrong is_active property", () => {
      expect(() => Category.create({ is_active: 5 } as any)).containsErrorMessages({
        is_active: [
          "is_active must be a boolean value",
        ]
      });
    });

    describe("ChangeName method", () => {
      it("should invalidate category with wrong name property", () => {
        const category = Category.create({ name: "Movie" });
        expect(() => category.changeName(null)).containsErrorMessages({
          name: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ]
        });

        expect(() => category.changeName("")).containsErrorMessages({
          name: [
            "name should not be empty",
          ],
        });

        expect(() => category.changeName(5 as any)).containsErrorMessages({
          name: [
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ]
        });

        expect(() => category.changeName("t".repeat(256))).containsErrorMessages({
          name: [
            "name must be shorter than or equal to 255 characters",
          ]
        })
      });
    });
  });
});