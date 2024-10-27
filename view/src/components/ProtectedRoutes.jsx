import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated, setIsAuthenticated, accessToken, setAccessToken } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/refresh", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized");
          }
          if (response.status === 403) {
            throw new Error("Forbidden");
          }
          if (response.status === 404) {
            throw new Error("User not found");
          }
        }

        const data = await response.json();
        setIsAuthenticated(true);
        setAccessToken(data.accessToken);
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
        setAccessToken(null);
      }
    };

    if (!isAuthenticated && !accessToken) {
      fetchAccessToken();
    }
  }, [isAuthenticated, accessToken]);

  return isAuthenticated && accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
