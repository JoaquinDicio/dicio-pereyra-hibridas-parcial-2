import commentsService from "../services/comments.service.js";

const commentsController = {
  async createComment(req, res) {
    try {
      const response = await commentsService.createComment(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error enviano el comentario" });
      console.log("Error enviando el comentario:", e);
    }
  },

  async getProjectComments(req, res) {
    try {
      const response = await commentsService.getProjectComments(req);
      res.status(response.status).json(response);
    } catch (e) {
      res.status(500).json({ error: "Error obteniendo los comentarios" });
      console.log("Error obteniendo los comentarios:", e);
    }
  },
};

export default commentsController;
