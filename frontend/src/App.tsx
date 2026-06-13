import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { axiosInstance } from "./lib/axios";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout.tsx";
function App() {
  axiosInstance
  
  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />

        <Route path="/auth-callback" element={<AuthCallbackPage />} />

        <Route element = {<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route> 

      </Routes>
    </>
  );
}

export default App