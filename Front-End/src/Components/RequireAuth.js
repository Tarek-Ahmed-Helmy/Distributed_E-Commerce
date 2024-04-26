import { useLocation, Outlet, Navigate } from "react-router";
import { useSelector  } from "react-redux";
import Unauthorized from "./Unauthorized";

function RequireAuth({allowedRoles}){
    const client = useSelector(state => state.auth)
    const location = useLocation();
    return(
        
        client?.user ?  (allowedRoles.includes(client.usertype) ? <Outlet /> : <Unauthorized />)
        : <Navigate to="/login" state={{from:location}} replace/>
        
    )
}

export default RequireAuth;