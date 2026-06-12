import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { axiosInstance } from "./lib/axios";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
function App() {
  axiosInstance
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />

        <Route path="/auth-callback" element={<AuthCallbackPage />} />

        <Route element = {<MainLayout />}>
          <Route path ='/' element={<HomePage />} />
        </Route> 

      </Routes>
    </>
  );
}

export default App