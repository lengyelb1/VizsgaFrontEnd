import { useEffect, useState } from "react"
import './AdminHomePage.css';


export default function AdminHomePage () {

    const [userDb,setUserDb] = useState();
    const [postDb,setPostDb] = useState();
    
    const [userByName,setUserByName] = useState();
    const [postByName,setPostByName] = useState();

    useEffect(()=>{
        fetch("http://localhost:7043/AdminUsers/userdb",{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => response.json())
        .then((resp)=> {
            setUserDb(resp)
        })

        fetch("http://localhost:7043/AdminUsers/userpostdb",{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => response.json())
        .then((resp)=> {
            setPostDb(resp)
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
                <div>
                    <div className="card-green p-2 rounded">
                        <p>Users: {userDb}</p>
                        <p>Posts: {postDb}</p>
                    </div>
                </div>
                <div className="row mt-3 min-vh-100 w-100">
                    <div className="col-6">
                        <ListUsersByName userByName = {userByName}/>
                    </div>
                    <div className="col-6">
                        <ListPostsByName postByName = {postByName}/>
                    </div>
                </div>
            </div>
        </div>
    )

    function UserKi (prop) {
        return (
        <div>
            {prop.resp.map((user) => (
                <div key={user.id + 1} className='card col-12 p-2 bg-dark text-light mx-auto mt-3 border border-dark shadow-green'>
                    <div className='card-body'>
                        <p className='text-green'>{user.username}</p>
                        <div className='small text-light'>Points: {user.point}</div>
                        <div className='small'>Email: {user.email}</div>
                        <a href= {"AdminPutSingleUser/"+user.id} className="btn btn-warning">Change</a>
                        <a href={"AdminDeleteUser/"+user.id} className="btn btn-danger ms-2">Delete</a>
                    </div>    
                </div>
            ))}
        </div>
        )
    }

    function UserByNameFrom () {
        return (
            <form onSubmit={(e) =>{
                e.preventDefault()
                if (e.target.elements.searchByNameUser1.value == null || e.target.elements.searchByNameUser1.value == "") {
                    alert("Please enter something in the searchbar!")
                }else{
                    fetch(`http://localhost:7043/AdminUsers/nev?nev=${e.target.elements.searchByNameUser1.value}`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                    .then((response) => response.json())
                    .then((resp)=> {
                        setUserByName(resp)
                    })
                }
            }}>
              <div className="mb-3">
                <label htmlFor="searchByNameUser1" className="form-label text-green">User Name: </label>
                <input type="text" className="form-control" id="searchByNameUser1" aria-describedby="searchByNameUser1"/>
              </div>
              <button type="submit" className="btn btn-green">Search</button>
            </form>
        )
    }

    function ListUsersByName(prop){
        if (userByName == null) {
            return (
                <div>
                    <UserByNameFrom/>
                    <div>
            
                    </div>
                </div>) 
        }
        else{
            return (
                <div>
                    <UserByNameFrom/>
                    <div>
                        <UserKi resp = {prop.userByName} />
                    </div>
                </div>) 
        }
    }

    function PostsByNameForm () {
        return(
            <form onSubmit={(e) =>{
                e.preventDefault()
                if (e.target.elements.searchByNamePost1.value == null || e.target.elements.searchByNamePost1.value == "") {
                    alert("Please enter something in the searchbar!")
                }else{
                    fetch(`http://localhost:7043/AdminUsers/postnev?nev=${e.target.elements.searchByNamePost1.value}`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                    .then((response) => response.json())
                    .then((resp)=> {

                        setPostByName(resp)

                    })
                }

            }}>
              <div className="mb-3">
                <label htmlFor="searchByNamePost1" className="form-label text-green">Post Name: </label>
                <input type="text" className="form-control" id="searchByNamePost1" aria-describedby="searchByNamePost1"/>
              </div>
              <button type="submit" className="btn btn-green">Search</button>
            </form>
        )
    }


    function ListPostsByName(prop){

        if (postByName == null) {
            return (
                <div>
                    <PostsByNameForm/>
                    <div>
                    </div>
                </div>) 
        }
        else{
            return (
                <div>
                    <PostsByNameForm/>
                    <div>
                        <PostsKi posts = {prop.postByName} />
                    </div>
                </div>) 
        }
    }

    function PostsKi (params) {
        return params.posts.map((post) => (
            <div key={post.id + 1} className='card col-md-5 p-2 bg-dark text-light mx-auto mt-3 border border-dark shadow-green'>
                <div className='card-body text-decoration-none'>
                    <h5 className='text-light'>{post.userId}</h5>
                    <h5 className=''>{post.title}</h5>
                    <div className='small'>{post.description}</div>
                </div>
                <div className='text-green align-middle'>
                    Likes: {post.like}
                </div>
            </div>    
        ))
    }
}