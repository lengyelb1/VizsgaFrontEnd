import { useEffect, useState } from "react"
import './AdminHomePage.css';
import { NavLink } from "react-bootstrap";
import { url } from "../../connect2getherUrl.js";


export default function AdminHomePage () {

    const [userDb,setUserDb] = useState();
    const [postDb,setPostDb] = useState();
    const [suspiciusUsers,setSuspiciusUsers] = useState();
    
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

        fetch(`${url}/AdminSuspiciousUsers/AllSuspiciousUser`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => response.json())
        .then((resp)=> {
            setSuspiciusUsers(resp)
        })
        
    },[])
    
    return (
        <div className='bg-dark h-100 p-2'>
            <nav className="navbar navbar-dark bg-dark w-100 border-bottom-green fixed-top shadow">
                <div className="container-fluid">
                    <p className="navbar-brand text-danger text-bold fw-bold">Admin</p>
                    <a className="nav-link text-light" href="/" onClick={()=>{
                        localStorage.setItem("token",undefined)
                    }}>Log Out</a>
                </div>
            </nav>
            <div className="mt-5">
                <br/>
                <div className="row w-100">
                    <div className="card-green col-12 p-2 vh-50 rounded text-info mx-auto">
                        <p>Suspicius</p>
                        <div className="overflow-auto" style={{maxHeight:"260px"}}>
                            <SuspiciusUsersAllKi suspiciusUsers={suspiciusUsers} />
                        </div>
                    </div>
                </div>
                <div className="row mt-3 w-100">
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
                                await fetch(`${url}/AdminUsers/SearchWithNameOrTitle?keresettErtek=${e.target.value}`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'}})
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data.length > 0) {
                                        if (data[0].username == undefined) {
                                            console.log("Post")
                                            setFeed(<div><PostsKi posts={data}/></div>);
                                            //setFeed(<div><h1 className='text-white'>Posts</h1></div>);
                                        
                                        }
                                        else{
                                            console.log("User")

                                            setFeed(<div><UsersKi users = {data}/></div>)
                                            //setFeed(<div><h1 className='text-white'>Users</h1></div>)
                                        }    
                                    }else{
                                        setFeed(<div><PostsKi posts={data}/></div>);
                                    }
                                    console.log(feed)
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
                                <p className='text-green'>{user.username}</p>
                                <p>Email: {user.email}</p>
                                <p>Point: {user.point}</p>
                                <p>Last login: {user.lastLogin}</p>
                                <p>Registration date: {user.registrationDate}</p>
                                <a href= {"AdminPutSingleUser/"+user.id} className="btn btn-warning">Change</a>
                                <a href={"AdminDeleteUser/"+user.id} className="btn btn-danger ms-2">Delete</a>
                                <a className="btn btn-info ms-2" onClick={async() => {
                                    fetch(`${url}/AdminSuspiciousUsers/AddSuspicious?id=${user.id}`,{method:"POST",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
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
                            <a href={`/AdminSinglePost/${post.id}`} className="text-light text-decoration-none">
                                <h5 className='text-light'>{post.user.username}</h5>
                                <h5 className=''>{post.title}</h5>
                                <div className='small'>{post.description}</div>
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
                                <p>Email: {x.user.email}</p>
                                <p>Point: {x.user.point}</p>
                                <p>Last login: {x.user.lastLogin}</p>
                                <p>Registration date: {x.user.registrationDate}</p>
                                <a className="btn btn-danger ms-2" onClick={async() => {
                                    fetch(`${url}/AdminSuspiciousUsers/DeleteSuspiciousById?id=${x.id}`,{method:"DELETE",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
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