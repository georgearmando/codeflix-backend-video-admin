import { Category } from "../category.entity";

describe("Category Entity Unit Tests", () => {
  describe("Constructor", () => {
    it("should create a new category with name only", () => {
      const category = new Category({
        name: "Movie"
      });
      expect(category.category_id).toBeUndefined();
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
     expect(category.category_id).toBeUndefined();
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
      expect(category.category_id).toBeUndefined();
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
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it("should create a new category with all props", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
        is_active: true,
      });
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
    
    it("should create a new category with description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
      });
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it("should create a new category with is_active", () => {
      const category = Category.create({
        name: "Movie",
        is_active: false,
      });
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("Change Methods", () => {
    it("should change name", () => {
      const category = new Category({
        name: "Movie",
      });
      category.changeName("New Movie");
      expect(category.name).toBe("New Movie");
    });

    it("should change description", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie description",
      });
      category.changeDescription("New Movie description");
      expect(category.description).toBe("New Movie description");
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
  })
});