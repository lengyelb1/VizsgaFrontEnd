import { useEffect, useState } from "react"
import './AdminDashBoard.css';
import { NavLink } from "react-bootstrap";
import { url } from "../../connect2getherUrl.js";
import AdminNavBar from "./Functions/AdminNavBar.js";



export default function AdminDashBoard () {

    const [userDb,setUserDb] = useState();
    const [postDb,setPostDb] = useState();
    const [suspiciusUsers,setSuspiciusUsers] = useState();
    const [refrDatas,refreshDatas] = useState(0)
    

    const [userByName,setUserByName] = useState();
    const [postByName,setPostByName] = useState();

    const [feed,setFeed] = useState();

    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(()=>{
        fetch(`${url}/AdminUsers/UserCount`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => response.json())
        .then((resp)=> {
            setUserDb(resp)
        })

        fetch(`${url}/AdminUserPost/UserPostCount`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => response.json())
        .then((resp)=> {
            setPostDb(resp)
        })

        fetch(`${url}/Moderator/AllSuspiciousUser`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => response.json())
        .then((resp)=> {
            setSuspiciusUsers(resp)
        })
        
    },[refrDatas])
    
    return (
        <div className={`${localStorage.getItem("darkMode")==0? "bg-light":"bg-dark"} min-vh-50 p-2`}>
            <AdminNavBar refrDatas={refrDatas} refreshDatas={refreshDatas} setFetchPending={setFetchPending} setFeed={setFeed}/>
            <div className="mt-5">
                <br/>
                <div className="row w-100 mx-auto">
                    <div className="card-green col-12 p-2 vh-50 rounded text-info">
                        <p className="d-inline-flex gap-1">
                            <button className="btn btn-green text-info" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${123}`} aria-expanded="false" aria-controls="collapseExample">
                                Suspicius
                            </button>
                        </p>
                        <div className="collapse" id={`collapseExample${123}`}>
                            <div className="overflow-auto" style={{maxHeight:"260px"}}>
                                <SuspiciusUsersAllKi suspiciusUsers={suspiciusUsers} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 w-100 card card-green mx-auto p-2">
                    <div className="col-6 overflow-auto">
                        <p className="text-green">Users: {userDb}</p>
                    </div>
                    <div className="col-6 overflow-auto h-100">
                        <p className="text-green">Posts: {postDb}</p>
                    </div>
                </div>
                <div className="row mt-3 col-12">
                    <form className="">
                        <input className="form-control me-2 input-green" name='searchBar' id='searchBar' type="search" placeholder="Search" aria-label="Search" onChange={async (e)=>{
                            if (e.target.value.trim() !== "" && e.target.value.trim() !== "@") {
                                setFetchPending(true);
                                await fetch(`${url}/AdminUsers/SearchWithNameOrTitle`,{method:"POST",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'},body:JSON.stringify({
                                    "searchValue": e.target.value
                                })})
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data.length > 0) {
                                        if (data[0].username == undefined) {
                                            setFeed(<div><PostsKi posts={data}/></div>);
                                            //setFeed(<div><h1 className='text-white'>Posts</h1></div>);
                                        
                                        }
                                        else{

                                            setFeed(<div><UsersKi users = {data}/></div>)
                                            //setFeed(<div><h1 className='text-white'>Users</h1></div>)
                                        }    
                                    }else{
                                        setFeed(<div><PostsKi posts={data}/></div>);
                                    }
                                })
                                .catch(console.log)
                                .finally(() => {
                                    setFetchPending(false);
                                })
                            } else {
                                setFeed(<div></div>);
                            }
                        }}/>
                    </form>
                </div>
                <div className="row mt-3 min-vh-100 w-100 vh-50">
                    <FeedKi/>
                </div>
            </div>
        </div>
    )

    function UsersKi (prop) {
        if (prop.users) {
            if (prop.users.length < 1) {
                return(<div className='bg-dark text-center text-green mt-5'>
                    <h4>No user found</h4>
                </div>)
            }else{
                return (
                    prop.users.map((user) => (
                        <div key={user.id + 1} className='card col-12 p-2 bg-dark text-light mx-auto mt-3 border border-dark shadow-green'>
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
                    ))
                )
                
            }
            
        }else{
            return(
                <div className="spinner-border text-green" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            )
        }
    }

    function PostsKi (params) {
        if (params.posts) {
            if (params.posts.length < 1) {
                
                return(<div className='bg-dark text-center text-green mt-5'>
                    <h4>No post found</h4>
                </div>)
            }else{
                return params.posts.map((post) => (
                    <div key={post.id + 1} className='card col-md-5 p-2 bg-dark text-light mx-auto mt-3 border border-dark shadow-green'>
                        <div className='card-body '>
                                <a href={`/AdminSingleUser/${post.userId}`}><h5 className='text-light'>{post.userName}</h5></a>
                                {console.log(post)}

                                <h5 className=''>{post.title}</h5>
                                <div className='small'>{post.description}</div>
                                <br/>
                                <a href={`/AdminSinglePost/${post.id}`} className="text-light text-decoration-none">
                                    <button className="btn btn-green">Details</button>
                                </a>
                        </div>
                        <div className='text-green align-middle'>
                            Likes: {post.like}
                        </div>
                    </div>    
                ))
            }
            
        }else{
            return(
                <div className="spinner-border text-green" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            )
        }
    }

    function SuspiciusUsersAllKi(params){

        if (params.suspiciusUsers == undefined) {
            return <h4>There are no suspicius users.</h4>
        }else{
            return (
                <div>
                    {params.suspiciusUsers.map((x)=>{
                        return(
                            <div key={x.id} className="card-green p-2 mb-1">
                                <p>Username: {x.user.username}</p>
                                <p>Description: {x.description}</p>
                                <a className="btn btn-danger ms-2" onClick={async() => {
                                    fetch(`${url}/Moderator/DeleteSuspiciousById?id=${x.id}`,{method:"DELETE",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                                    .catch((x)=>console.log(x))
                                }}>Remove</a>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
    function FeedKi () {
        if (isFetchPending) {
            return (
                <div className="spinner-border text-green" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            )
        }
        else {
            return (feed)
        }
    }
}