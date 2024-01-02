import { Outlet, useNavigate } from "react-router";
import AppLayout from "../../components/AppLayout";
import { AppContext } from "../../context/context";
import { useEffect, useContext } from "react";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const { setToken, setUserInfo, token } = useContext(AppContext);

  useEffect(() => {
    const storageToken = localStorage.getItem("jwt");

    if (storageToken) {
      try {
        const parsedToken = JSON.parse(storageToken);
        const user = localStorage.getItem("user");

        if (user) {
          const parsedUser = JSON.parse(user);
          setToken(parsedToken);
          setUserInfo(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing token or user:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, setToken, setUserInfo]);

  if (!token) {
    return null;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default ProtectedRoutes;
