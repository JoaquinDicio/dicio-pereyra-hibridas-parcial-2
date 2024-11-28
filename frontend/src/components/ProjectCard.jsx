import { Link } from "react-router-dom";

export default function ProjectCard({ name, description, img_url, projectID }) {
  return (
    <li className="hover:shadow-lg transition-100 cursor-pointer shadow w-full flex-1 min-w-[300px]">
      <Link
        to={"/projects/" + projectID}
        className="p-5 flex flex-col justify-center w-full h-[250px]"
      >
        <img
          src={img_url}
          alt="Portada proyecto"
          className="h-full bg-slate-200 my-2 rounded-sm"
        />
        <p className="font-medium">{name}</p>
        <p className="text-sm">{description}</p>
      </Link>
    </li>
  );
}
