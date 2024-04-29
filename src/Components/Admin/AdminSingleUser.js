import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { url } from "../../connect2getherUrl";

export default function AdminSingleUser() {

    const params = useParams();
    const navigate = useNavigate();

    const [user,setUser]=useState({});
    const [refrDatas,refreshDatas] = useState(0)


    useEffect(() => {
        fetch(`${url}/AdminUsers/UserById?id=${params.id}`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r) => r.json())
        .then((resp) => {
            setUser(resp)
        })
    },[refrDatas])
    return(
        <div className="bg-dark min-vh-100">
            <a className="nav-link p-3" onClick={async ()=>{await navigate(-1)}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={localStorage.getItem("darkMode")==0? "black":"#A8F231"} class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg></a>
            <div className='card col-12 p-2 bg-dark text-light mx-auto mt-3 border border-dark shadow-green'>
                <div className='card-body'>
                    <p className='text-green'>{user.userId}</p>
                    <p>Email: {user.email}</p>
                    <p>Point: {user.point}</p>
                    <p>Last login: {user.lastLogin}</p>
                    <p>Registration date: {user.registrationDate}</p>
                    <a href= {"AdminPutSingleUser/"+user.id} className="btn btn-warning">Change</a>
                    <a href={"AdminDeleteUser/"+user.id} className="btn btn-danger ms-2">Delete</a>
                    <a className="btn btn-info ms-2" onClick={async() => {
                        fetch(`${url}/Moderator/AddSuspicious?id=${user.id}`,{method:"POST",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                    }}>Suspicius</a>
                </div>    
            </div>
        </div>
    )
}