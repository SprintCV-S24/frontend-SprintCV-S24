import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./AuthContext";
// Routes
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Editor from "./pages/Editor";
import { initializeLatexEngines } from "./components/Latex-comp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/editor" element={<PrivateRoute element={<Editor />} />} />
    </>,
  ),
);

const App: React.FC = () => {
  
  useEffect(() => {
    initializeLatexEngines();
  }, []);

  return (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  );
};

export default App;
