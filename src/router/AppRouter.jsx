import React, { useContext, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import { Auth } from "../context/auth";
import { useEffect } from "react";
import { getCurrentUser } from "../auth/authService";
import PrivateRouter from "./PrivateRouter";
import Loading from "../components/Loading";
import UploadStock from "../pages/UploadStock";
import MenuContent from "../layouts/MenuContent";
import StockDetail from "../pages/StockDetail";
import AssignStock from "../pages/AssignStock";
import SummaryStock from "../pages/SummaryStock";
import StockDetailUserResponsive from "../pages/StockDetailUserResponsive";
import UserContent from "../layouts/UserContent";

const AppRouter = () => {
  const [authContext, setAuthContext] = useState(null);
  useEffect(() => {
    getCurrentUser("nikolaswhite255@gmail.com", (session, error) => {
      if (error) return setAuthContext({ error });
      setAuthContext(session);
    });
  }, []);

  return (
    <BrowserRouter>
      <Auth.Provider value={authContext}>
        <Loading />
        <Routes>
          <Route
            path="/*"
            element={
              <PrivateRouter>
                <Routes>
                  <Route path="/admin" element={<MenuContent />}>
                    <Route path="stock" element={<StockDetail />} />
                    <Route path="stock-tech" element={<StockDetailUserResponsive />} />
                    <Route path="assign" element={<AssignStock />} />
                    <Route path="upload" element={<UploadStock />} />
                    <Route path="summary" element={<SummaryStock />} />
                  </Route>
                  <Route path="/tech" element={<UserContent />}>
                    <Route path="stock" element={<StockDetailUserResponsive />}></Route>
                  </Route>
                </Routes>
              </PrivateRouter>
            }
          />
          <Route path="/login" element={<Login setAuth={setAuthContext} />} />
          <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
      </Auth.Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
