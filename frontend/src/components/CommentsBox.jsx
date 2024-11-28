import { Link, useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import useAxios from "../hooks/useAxios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

export default function CommentsBox({ comments: initalComments }) {
  const { projectID } = useParams();
  const { user } = useContext(AuthContext);
  const { axiosPost, errors, posting } = useAxios();
  const [localComments, setLocalComments] = useState([]); // defino el estado interno para no tener que pasar el setProjectData

  useEffect(() => {
    setLocalComments(initalComments);
  }, [initalComments]);

  // posteo del comentario
  async function handleSubmit(e, content) {
    e.preventDefault();

    const response = await axiosPost(
      `http://localhost:8080/api/projects/${projectID}/comments`,
      { comment: { content: content } }
    );

    if (response.status == 200) {
      setLocalComments((prev) => [
        ...prev,
        {
          ...response.newComment,
          userId: { username: user.username, email: user.email },
        },
      ]); // le paso el nuevo comentario para que lo agregue al array
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Comentarios</h2>
      <CommentForm handleSubmit={handleSubmit} />
      {localComments?.length > 0 ? (
        <ul className="space-y-4">
          {localComments.map((comment) => (
            <li
              key={comment._id}
              className="border p-4 rounded shadow-sm bg-gray-50"
            >
              <p className="text-gray-700">{comment.content}</p>
              <Link to={`/profile/${comment.userId?._id}`}>
                <p className="text-sm text-blue-400 italic mt-2">
                  {comment.userId?.username} ({comment.userId?.email})
                </p>
              </Link>
              <p className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay comentarios en este proyecto.</p>
      )}
    </div>
  );
}
