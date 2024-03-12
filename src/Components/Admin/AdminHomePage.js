import { useEffect, useState } from "react"
import './AdminHomePage.css';


export default function AdminHomePage () {

    const [data,setData] = useState([]);
    
    useEffect(()=>{
        fetch("http://localhost:7043/AdminUsers",{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => response.json())
        .then((resp)=> {
            setData(resp)
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
                        <p>Users: {data.length}</p>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-green">Users</h2>
                    <ListUsers data ={data}/>
                </div>

            </div>
        </div>
    )
}

function ListUsers(params){
    console.log(params.data)
    return params.data.map((user) => (
        <div key={user.id + 1} className='card col-12 p-2 bg-dark text-light mx-auto mt-3 border border-dark shadow-green'>
            <div className='card-body'>
                <p className='text-green'>{user.username}</p>
                <div className='small text-light'>Points: {user.point}</div>
                <div className='small'>Email: {user.email}</div>
                <a href= {"AdminPutSingleUser/"+user.id} className="btn btn-warning">Change</a>
                <a href={"AdminDeleteUser/"+user.id} className="btn btn-danger ms-2">Delete</a>

            </div>
            
        </div>    
    ))
}