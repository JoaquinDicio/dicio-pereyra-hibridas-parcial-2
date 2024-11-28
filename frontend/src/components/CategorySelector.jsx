import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

export default function categorySelector({ setCategory, selectedCategory }) {
  const { loading, errors, axiosGet } = useAxios();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const { categories } = await axiosGet(
        "http://localhost:8080/api/categories"
      );
      setCategories(categories || []);
    }
    getCategories();
  }, []);

  return (
    <select
      className="border border-1 border-black p-1"
      onChange={(e) => setCategory(e.target)}
      name="category"
      value={selectedCategory}
    >
      <option value="none">
        {loading ? "Cargando..." : "Seleccionar categoria"}
      </option>
      {categories?.map((cat) => (
        <option key={cat._id} value={cat._id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
