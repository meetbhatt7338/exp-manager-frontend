import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Login } from "../components/user/Login";


const useAuth = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setisAuthenticated(true);
    }
  }, []);
  return isAuthenticated;
};
const ProtectedRoute = () => {
  const isAuth = useAuth(); //true or false
  //if isAuth is true then return Outlet else return LoginComponent
  return isAuth ? <Outlet /> : <Login />;
};
export default ProtectedRoute;