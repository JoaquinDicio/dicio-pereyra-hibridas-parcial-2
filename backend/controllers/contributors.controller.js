import contributorsService from "../services/contributors.service.js";

const contributorsController = {
  async addContributor(req, res) {
    try {
      const response = await contributorsService.addContributor(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error agregando al contribuidor" });
      console.log("Error agregando al contribuidor:", e);
    }
  },

  async getProjectContributors(req, res) {
    try {
      const response = await contributorsService.getProjectContributors(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error obteniendo los contribuidores" });
      console.log("Error obteniendo los contribuidores:", e);
    }
  },

  async deleteContributor(req, res) {
    try {
      const response = await contributorsService.deleteContributor(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error eliminando los contribuidores" });
      console.log("Error eliminando los contribuidores:", e);
    }
  },
};

export default contributorsController;
