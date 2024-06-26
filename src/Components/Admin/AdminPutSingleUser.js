import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../connect2getherUrl.js";
import AdminNavBar from "./Functions/AdminNavBar.js";
import { useEffect, useState } from "react";


export default function AdminPutSingleUser(prop){
    const props = useParams();
    const [data,setData] = useState();
    const [refrDatas,refreshDatas] = useState(0)
    const [isFetchPending, setFetchPending] = useState(false);

    const navigate = useNavigate();


    return (
        <div className='bg-dark vh-100 p-2'>
            <AdminNavBar/>
            <div className="mt-5">
                <br/>
                <h2 className="text-green">Users</h2>
                <div className="">
                    <form className="text-green" onSubmit={(e)=>{
                        e.preventDefault()
                        fetch(`${url}/AdminUsers/ChangeRegister?id=${prop.id}`,{method:"PUT",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`},body:{
                            userName: document.getElementById("username").value,
                            email: document.getElementById("email").value,
                            permissionId: document.getElementById("permissionId").value
                        }})
                        .then(()=>{
                            navigate("AdminHomePage")
                        })
                    }}>
                        <div class="mb-3">
                          <label for="username" class="form-label">User name</label>
                          <input type="text" class="form-control input-green" id="username"/>
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Email address</label>
                          <input type="email" class="form-control input-green" id="exampleInputEmail1"/>
                        </div>
                        <div class="mb-3">
                          <label for="permissionId" class="form-label">Permission Id</label>
                          <input type="number" class="form-control input-green" id="permissionId"/>
                        </div>
                        <button type="submit" class="btn btn-green">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}