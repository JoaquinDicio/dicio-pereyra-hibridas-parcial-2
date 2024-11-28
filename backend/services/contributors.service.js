import User from "../models/User.js";
import Contributor from "../models/Contributor.js";

const contributorsService = {
  async addContributor(req) {
    const { projectID } = req.params;
    const { contributor } = req.body;

    //verificamos que exista el usuario
    if (!contributor.email) {
      return {
        status: 400,
        errors: { msg: "Debe especificar un email" },
        ok: false,
      };
    }

    const userExistence = await User.findOne({ email: contributor.email });

    if (!userExistence) {
      return {
        status: 400,
        errors: { msg: "El usuario especificado no existe" },
        ok: false,
      };
    }

    // si ya es contribuidor esto va a retornar un Contributor

    const contributorExistence = await Contributor.findOne({
      projectId: projectID,
      userId: userExistence._doc._id,
    });

    if (contributorExistence) {
      return {
        status: 400,
        errors: { msg: "El usuario ya es contribuidor de este proyecto" },
        ok: false,
      };
    }

    // si no es contribuidor y el usuario existe, se guarda el registro
    const newContributor = await Contributor.create({
      userId: userExistence._id,
      projectId: projectID,
    });

    return { status: 200, contributor: userExistence, ok: true };
  },

  async getProjectContributors(req) {
    const { projectID } = req.params;

    if (!projectID) {
      return { status: 400, error: "El projectID es obligatorio", ok: false };
    }

    const query = await Contributor.find({
      projectId: projectID,
    }).populate(
      "userId", // traemos los datos de users con el userid
      "username email"
    );

    // se formatea para que tenga un poco mas de sentido el objeto que trae populate
    const contributors = query.map((contributor) => {
      return { ...contributor.userId._doc };
    });

    return { status: 200, contributors, ok: true };
  },

  async deleteContributor(req) {
    const { projectID, contributorID } = req.params;

    if (!projectID || !contributorID) {
      return {
        status: 400,
        error: "Project ID y contributorID son requeridos",
        ok: false,
      };
    }

    const deleted = await Contributor.findOneAndDelete({
      userId: contributorID,
      projectId: projectID,
    });

    if (deleted) {
      return { status: 200, deleted, ok: true };
    }
  },
};

export default contributorsService;
