import { Outlet } from "react-router";
import { useAuth } from "../context/auth/AuthContext";
import { Usererror } from "./error";

const ProtactedRoute = () =>
{
    const { isauthenticated } = useAuth();
     if(!isauthenticated)
     {
        return <Usererror />; 
     }
    return (<Outlet/>)
}
export default ProtactedRoute;