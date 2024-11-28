import authService from "../services/auth.service.js";

const authController = {
  async login(req, res) {
    try {
      const response = await authService.login(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error intentando loguearse" });
      console.log("Error intentando loguearse:", e);
    }
  },

  async register(req, res) {
    try {
      let response = await authService.register(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error intentando loguearse" });
      console.log("Error intentando loguearse:", e);
    }
  },
};

export default authController;
