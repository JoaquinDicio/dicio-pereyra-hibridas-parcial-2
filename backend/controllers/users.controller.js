import usersService from "../services/users.service.js";

const usersController = {
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
