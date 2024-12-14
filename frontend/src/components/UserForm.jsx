import { useEffect, useState } from "react";

export default function UserForm({ handleSubmit, oldData, posting, errors }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    profile_img: "",
  });

  useEffect(() => {
    if (oldData) {
      setUser({
        username: oldData.username || "",
        email: oldData.email || "",
        profile_img: oldData.profile_img || "",
      });
    }
  }, [oldData]);

  function handleChange(target) {
    const field = target.name;
    setUser((prev) => ({ ...prev, [field]: target.value }));
  }

  if (oldData)
    return (
      <form
        onSubmit={(e) => handleSubmit(e, user)}
        className="flex flex-col gap-2 max-w-[400px]"
      >
        <input
          className="border border-1 border-black p-1"
          name="email"
          type="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => handleChange(e.target)}
        />
        <i className="text-sm text-red-500">{errors?.email}</i>
        <input
          className="border border-1 border-black p-1"
          name="username"
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => handleChange(e.target)}
        />
        <i className="text-sm text-red-500">{errors?.username}</i>
        <input
          className="border border-1 border-black p-1"
          name="profile_img"
          type="text"
          placeholder="Foto de perfil (URL)"
          value={user.profile_img || ""}
          onChange={(e) => handleChange(e.target)}
        />

        <input
          type="submit"
          value="Actualizar"
          className="disabled:bg-slate-200 bg-blue-500 cursor-pointer hover:bg-blue-700 duration-75 text-white rounded-sm px-3 py-1"
          disabled={posting}
        />
      </form>
    );
}
