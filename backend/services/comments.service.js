import Comment from "../models/Comment.js";

const commentsService = {
  async createComment(req) {
    const { comment } = req.body;

    comment["projectId"] = req.params.projectID; // le agrego el paramatro de la url
    comment["userId"] = req.user._doc._id; // le agrego el user que llega en el token

    const required = ["content", "userId", "projectId"];
    const errors = {};

    required.forEach((key) => {
      if (!comment[key]) {
        // si el campo requerido no existe
        errors[key] = `El ${key} es obligatorio`;
      }
    });

    if (Object.keys(errors).length !== 0) {
      return { status: 400, errors, ok: false };
    }

    // si estan todos los campos requeridos creamos el comentario
    const newComment = await Comment.create(comment);

    return { status: 200, newComment, ok: true };
  },

  async getProjectComments(req) {
    const { projectID } = req.params;

    const comments = await Comment.find({ projectId: projectID });

    if (!comments) {
      return {
        status: 400,
        error: "No existen comentarios del post especificado",
        ok: false,
      };
    }

    return { status: 200, comments, ok: true };
  },
};

export default commentsService;
