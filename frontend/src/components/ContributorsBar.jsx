import { useState } from "react";

export default function ContributorsBar({ handleSubmit }) {
  const [userEmail, setUserEmail] = useState("");
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, userEmail);
        setUserEmail("");
      }}
      className="fixed flex items-center justify-center w-full bottom-0 p-6 bg-slate-200"
    >
      <div className="flex w-full">
        <input
          type="text"
          required
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Email del usuario"
          className="rounded-l-lg w-full  max-w-[400px] border-gray-300 border px-4 py-2"
        />
        <input
          type="submit"
          value="Agregar contribuyente"
          className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 transition"
        />
      </div>
    </form>
  );
}
