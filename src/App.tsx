import React, { useState } from "react";

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
import ResumeContext from "@/components/resumecontext";
import { BaseItem } from "./api/models/interfaces";
import { generatePdfBlobSafe, initializeLatexEngines } from "./latexUtils/latexUtils";
import { notifyInitializationComplete } from "./latexUtils/renderQueue";
import { pdfInit } from "./latexUtils/pdfUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { testlatex3 } from "./tests/dummyData";

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

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [resumeItems, setResumeItems] = useState<BaseItem[]>([]);

  const addResumeItem = (newItem: BaseItem) => {
    setResumeItems([...resumeItems, newItem]);
  };

  const removeResumeItem = (index: number) => {
    setResumeItems(resumeItems.filter((_, i) => i !== index));
  };

  //Initializes latex engine and pdf.js
  //TODO: this should probably be pulled out and put somewhere else
  useEffect(() => {
    console.log("initializing engine");
    initializeLatexEngines().then((res) => {
      notifyInitializationComplete();
      console.log("engine initialized");
    });
    pdfInit();
    generatePdfBlobSafe(testlatex3);
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ResumeContext.Provider
          value={{ resumeItems, addResumeItem, removeResumeItem }}
        >
          <RouterProvider router={router} />
        </ResumeContext.Provider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
