import mongoose from "mongoose";

const contributorSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // Para tener createdAt y updatedAt
);

const Contributor = mongoose.model("Contributor", contributorSchema);

export default Contributor;
