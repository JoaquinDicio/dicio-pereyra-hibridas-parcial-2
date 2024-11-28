import Category from "../models/Category.js";

const categoriesService = {
  async getAllCategories() {
    const categories = await Category.find();

    if (categories) {
      return { status: 200, categories, ok: true };
    }

    throw new Error("Error conectando con la base de datos");
  },

  async createCategory(req) {
    const { category } = req.body; // debe llegar un objeto category

    if (!category.name) {
      return {
        status: 400,
        error: { name: "Debe especificar un nombre para la categoria" },
        ok: false,
      };
    }

    const newCategory = await Category.create(category);

    if (newCategory) {
      return { status: 200, newCategory, ok: true };
    }
  },

  async deleteCategory(req) {
    const { categoryID } = req.params;

    if (!categoryID) {
      return {
        status: 400,
        error: { categoryID: "Debe especificar un ID para la categoria" },
        ok: false,
      };
    }

    const deleted = await Category.findByIdAndDelete(categoryID);

    if (deleted) {
      return { status: 200, deleted, ok: true };
    }
  },
};

export default categoriesService;
