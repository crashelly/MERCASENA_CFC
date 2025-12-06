import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    // const isLoggedIn  = false;
    const isLoggedIn  = window.localStorage.getItem("sessionToken");
    return isLoggedIn ? <Outlet/> : <Navigate to="/"/>
}
export default ProtectedRoutes