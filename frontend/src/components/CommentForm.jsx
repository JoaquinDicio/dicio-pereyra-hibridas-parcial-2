import { useState } from "react";

export default function CommentForm({ handleSubmit }) {
  const [content, setContent] = useState("");

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, content);
        setContent("");
      }}
      className="w-full mb-6 mx-auto gap-2 p-4 bg-gray-50 flex shadow-md rounded-md"
    >
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder="Escribe tu comentario aquí..."
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <div className="text-right">
        <input
          type="submit"
          value="Comentar"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}
