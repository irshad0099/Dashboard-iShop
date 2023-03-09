import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import ShoppingComponent from "../ishop/ShoppingComponent";

export default function IShopDashboard()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    const [userid, setUserId] = useState();
    let navigate = useNavigate();

    useEffect(()=>{
        if(cookies["userid"]==undefined) {
            navigate("/login");
        } else {
            setUserId(cookies["userid"]);
        }
    })

    function handleSignout(){
        removeCookie("userid");
        navigate("/login");
    }

    return(
        <>
        <div>
            <h2>User Dashboard {userid}  -  <button onClick={handleSignout} className="btn btn-link">Signout</button> </h2>
            <ShoppingComponent />
        </div>
        </>
    )
}