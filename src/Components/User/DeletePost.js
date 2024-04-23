import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../connect2getherUrl";
import { DarkModeBodySetter } from "../Functions/DarkModeFunctions";
import { jwtDecode } from "jwt-decode";
import MyNavBar from "../Functions/MyNavBar";

export default function DeletePost() {

    const prop = useParams();
    const [data,setData] = useState();
    const [refrDatas,refreshDatas] = useState(0)
    const [isFetchPending, setFetchPending] = useState(false);
    const navigate = useNavigate();

    return(
        <div className={`min-vh-100 ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-light"}`}>
            <MyNavBar refrDatas={refrDatas} refreshDatas={refreshDatas}/>
            <br className="mt-5"/>
            <br className="mt-5"/>
            <br className="mt-5"/>

            <div className="mx-auto text-center">
                <h1>Are you sure about deleteing this post?</h1>

                <div className="d-flex justify-content-center gap-2">
                    <a type="button" className="btn btn-secondary" onClick={async ()=>{await navigate(-1)}}>Cancel</a>
                    <button type="button" className="btn btn-danger" onClick={async() =>{fetch(`${url}/UserPost/DeleteUserPostById?id=${prop.id}&userId=${jwtDecode(localStorage.getItem("token")).id}`,{method:"DELETE",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}); alert("Successfull delete!"); refreshDatas(refrDatas+1); await navigate(-1); }}>Delete</button>
                </div>
            </div>
            
        </div>
        
    )
}