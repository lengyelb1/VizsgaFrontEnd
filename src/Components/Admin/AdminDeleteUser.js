import { useNavigate, useParams } from "react-router-dom";

export default function AdminDeleteUser (prop) {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params.id)
    return (
            <div className='bg-dark vh-100 p-2'>
            <nav className="navbar navbar-dark bg-dark w-100 border-bottom-green fixed-top shadow">
                <div className="container-fluid">
                    <p className="navbar-brand text-danger text-bold fw-bold">Admin</p>
                    <a className="nav-link text-light" href="../AdminHomePage">Home</a>
                    <a className="nav-link text-light" href="/" onClick={()=>{
                        localStorage.setItem("token",undefined)
                    }}>Log Out</a>
                </div>
            </nav>
            <div className="mt-5">
                <br/>
                <h1 className="text-green">Are you sure about deleting this user?</h1>
                <div className="p-2">
                    <a className="btn btn-warning" href="../AdminHomePage">Back</a>
                    <a className="btn btn-danger float-end" href="" onClick={(e)=>{
                        e.preventDefault()
                         fetch(`https://localhost:7043/AdminUsers/id?id=${params.id}`,{method:"DELETE", headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                        .then(()=>{
                            navigate("../AdminHomePage")
                        })
                    }}>DELETE</a>
                </div>
                
            </div>
        </div>    
        
    )   
}