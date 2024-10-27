import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styled from "styled-components";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { isAuthenticated, setIsAuthenticated, setAccessToken, accessToken } =
    useContext(AuthContext);

  useEffect(() => {
    const getProtectedResource = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/protected-resource",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setData(data.message);
      } catch (err) {
        console.log(err);
      }
    };

    if (isAuthenticated && accessToken) {
      getProtectedResource();
    }
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    if (!isAuthenticated && !accessToken) {
      navigate("/login");
    }
  }, [isAuthenticated, accessToken]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const data = await response.json();
      console.log(data);

      setIsAuthenticated(false);
      setAccessToken(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <ProtectedText>{data}</ProtectedText>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 40px;
`;

const ProtectedText = styled.p`
  font-style: italic;
  color: green;
`;

const LogoutButton = styled.button`
  background-color: #afc1de;
  margin: 10px 0;
  cursor: pointer;
`;

export default Dashboard;
