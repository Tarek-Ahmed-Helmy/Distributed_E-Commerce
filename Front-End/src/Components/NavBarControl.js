import { useSelector  } from "react-redux";
function NavBarControl({children}){
    const client = useSelector(state => state.auth);
    const show = false;
    return(
        client?.user === "client" && {children}
    )
}

export default NavBarControl;