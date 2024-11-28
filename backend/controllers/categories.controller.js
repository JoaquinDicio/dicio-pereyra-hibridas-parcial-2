import categoriesService from "../services/categories.service.js";

const categoriesController = {
  async getAllCategories(req, res) {
    try {
      const response = await categoriesService.getAllCategories(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error obteniendo las categorias" });
      console.log("Error obteniendo las categorias:", e);
    }
  },

  async createCategory(req, res) {
    try {
      const response = await categoriesService.createCategory(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error agregando la categoria" });
      console.log("Error agregando la categoria:", e);
    }
  },

  async deleteCategory(req, res) {
    try {
      const response = await categoriesService.deleteCategory(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error borrando la categoria" });
      console.log("Error borrando la categoria:", e);
    }
  },
};

export default categoriesController;
