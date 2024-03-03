import React, { useState } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
// Routes
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Editor from "./pages/Editor";
import ResumeContext from "@/components/resumecontext";
import { ResumeItem } from "types";

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
  const [resumeItems, setResumeItems] = useState<ResumeItem[]>([]);

  const addResumeItem = (newItem: ResumeItem) => {
    setResumeItems([...resumeItems, newItem]);
    console.log(resumeItems);
  };

  const removeResumeItem = (index: number) => {
    setResumeItems(resumeItems.filter((_, i) => i !== index));
  };

  return (
    <AuthProvider>
      <ResumeContext.Provider
        value={{ resumeItems, addResumeItem, removeResumeItem }}
      >
        <RouterProvider router={router} />
      </ResumeContext.Provider>
    </AuthProvider>
  );
};

export default App;
