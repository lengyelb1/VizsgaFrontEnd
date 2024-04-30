import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { url } from "../../connect2getherUrl";
import AdminNavBar from "./Functions/AdminNavBar.js";
import { AdminPostsKi } from "./Functions/AdminFunctions.js";


export default function AdminSingleUser() {

    const params = useParams();
    const navigate = useNavigate();

    const [user,setUser]=useState({});
    const [Posts,setPosts]=useState();
    const [refrDatas,refreshDatas] = useState(0)

    const [isFetchPending, setFetchPending] = useState(false);

    


    useEffect(() => {
        setFetchPending(true)
        fetch(`${url}/AdminUsers/UserById?id=${params.id}`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r) => r.json())
        .then(async (resp) => {
            await setUser(resp[0])
            await setPosts(<AdminPostsKi posts={resp[0].userPosts} refreshDatas={refreshDatas} refrDatas={refrDatas}/>)
        })
        .finally(()=>{
            setFetchPending(false)
        })


    },[refrDatas])

    
        return(
            <div className="bg-dark min-vh-100">
                <AdminNavBar/>
                <br/>
                <br/>
                <br/>
                <Ki user = {user} id={params.id} refreshDatas = {params.refreshDatas} refrDatas ={params.refrDatas}/>
            </div>
        )
    
    

    function Ki (params){
        const user = params.user

        if (user.rank) {
            return (
                <div className='card col-12 p-2 bg-dark text-light mx-auto mt-3 border border-dark shadow-green'>
                    <a className="nav-link p-3" onClick={async ()=>{await navigate(-1)}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={localStorage.getItem("darkMode")==0? "black":"#A8F231"} className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg></a>
                    <div className='card-body'>
                        <h5 className='text-green'>{user.username}</h5>
                        <p>Email: {user.email}</p>
                        <p>Point: {user.points}</p>
                        <p>Rank: {user.rank.name}</p>
                        <p>Last login: {user.lastLogin}</p>
                        <p>Registration date: {user.registrationDate}</p>
                        <a href= {"../AdminPutSingleUser/"+user.id} className="btn btn-warning">Change</a>
                        <a href={"../AdminDeleteUser/"+user.id} className="btn btn-danger ms-2">Delete</a>
                        <a className="btn btn-info ms-2" onClick={async() => {
                            fetch(`${url}/Moderator/AddSuspicious?id=${user.id}`,{method:"POST",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                        }}>Suspicius</a>

                        <button type="button" className="btn btn-green ms-2" data-bs-toggle="modal" data-bs-target="#AlertMessageSendModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                            </svg>
                        </button>

                        <div className={`modal fade `} id="AlertMessageSendModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className={`modal-content ${localStorage.getItem("darkMode")==0? "bg-light text-dark ":"bg-dark text-light"}`}>
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Send message to {user.username}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <form onSubmit={async (e)=>{
                                    e.preventDefault();
                                    await fetch(`${url}/AdminAlertMessage/SendAlertMessageByUserId`, {method:"POST",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'},body:JSON.stringify({
                                        "title": e.target.elements.Title.value,
                                        "description": e.target.elements.Message.value,
                                        "userId": params.id

                                    })})
                                    .then((res) => res.json())
                                    .then((data) => {
                                        console.log(data)
                                    })
                                    .catch(console.log)
                                    .finally(() => {
                                        params.refreshDatas(params.refrDatas+1)
                                    });
                                }}>
                                    <input type="text" className="form-control input-green " placeholder="Title" id="Title"/>
                                    <textarea className="form-control input-green" placeholder="Message text..." id="Message"/>
                                    <br/>
                                    <button type="submit" className="btn btn-green" data-bs-dismiss="modal">Send</button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>

                    {Posts}

                </div>
            
            )
        }else{
            return(
                <div className="spinner-border text-green" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )
        }
        
    }

}