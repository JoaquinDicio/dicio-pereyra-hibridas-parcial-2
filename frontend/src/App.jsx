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
import EditProfile from "./pages/EditProfile.jsx";
import Tasks from "./pages/Tasks.jsx";
import NewTask from "./pages/NewTask.jsx";
import MyTasks from "./pages/MyTasks.jsx";

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
                path="/admin-tasks/:projectID"
                element={<PrivateRoute Page={Tasks} />}
              />
              <Route
                path="/projects/:projectID"
                element={<PrivateRoute Page={Project} />}
              />
              <Route
                path="/add-task/:projectID"
                element={<PrivateRoute Page={NewTask} />}
              />
              <Route
                path="/profile/edit"
                element={<PrivateRoute Page={EditProfile} />}
              />
              <Route
                path="/my-tasks"
                element={<PrivateRoute Page={MyTasks} />}
              />
            </>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
