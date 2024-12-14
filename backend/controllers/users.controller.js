import usersService from "../services/users.service.js";

const usersController = {
  async getUserData(req, res) {
    try {
      const response = await usersService.getUserData(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error obteniendo los datos del usuario" });
      console.log("Error obteniendo los datos del usuario:", e);
    }
  },

  async updateUserData(req, res) {
    try {
      const response = await usersService.updateUserData(req);
      res.status(response.status).json(response);
    } catch (e) {
      res
        .status(500)
        .json({ error: "Error actualizando los datos del usuario" });
      console.log("Error actualizando los datos del usuario:", e);
    }
  },

  async getUserProjects(req, res) {
    try {
      const response = await usersService.getUserProjects(req);
      res.status(response.status).json(response);
    } catch (e) {
      res
        .status(500)
        .json({ error: "Error obteniendo los proyectos del usuario" });
      console.log("Error obteniendo los proyectos del usuario:", e);
    }
  },
};

export default usersController;
