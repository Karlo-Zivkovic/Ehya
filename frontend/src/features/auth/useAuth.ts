import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/context";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    } else {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, [navigate, setToken]);

  return isAuthenticated;
}
