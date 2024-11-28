import NewProject from "./pages/NewProject.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./components/PritvateRoute";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminProjects from "./pages/AdminProjects";
import EditProject from "./pages/EditProjects";
import Contributors from "./pages/Contributors";
import Project from "./pages/Project.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <>
              <Route path="/" element={<PrivateRoute Page={Home} />} />
              <Route path="/home" element={<PrivateRoute Page={Home} />} />
              <Route
                path="/profile/:userID"
                element={<PrivateRoute Page={Profile} />}
              />
              <Route
                path="/new/project"
                element={<PrivateRoute Page={NewProject} />}
              />
              <Route
                path="/admin-projects"
                element={<PrivateRoute Page={AdminProjects} />}
              />
              <Route
                path="/edit-project/:projectID"
                element={<PrivateRoute Page={EditProject} />}
              />
              <Route
                path="/admin-contributors/:projectID"
                element={<PrivateRoute Page={Contributors} />}
              />
              <Route
                path="/projects/:projectID"
                element={<PrivateRoute Page={Project} />}
              />
            </>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
