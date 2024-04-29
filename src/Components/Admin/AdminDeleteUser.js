import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../connect2getherUrl.js";
import AdminNavBar from "./AdminNavBar.js";

export default function AdminDeleteUser (prop) {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params.id)
    return (
            <div className='bg-dark vh-100 p-2'>
            <AdminNavBar/>
            <div className="mt-5">
                <br/>
                <h1 className="text-green">Are you sure about deleting this user?</h1>
                <div className="p-2">
                    <a className="btn btn-warning" href="../AdminHomePage">Back</a>
                    <a className="btn btn-danger float-end" href="" onClick={(e)=>{
                        e.preventDefault()
                         fetch(`${url}/AdminUsers/DeleteUserById?id=${params.id}`,{method:"DELETE", headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                        .then(()=>{
                            navigate("../AdminHomePage")
                        })
                    }}>DELETE</a>
                </div>
                
            </div>
        </div>    
        
    )   
}