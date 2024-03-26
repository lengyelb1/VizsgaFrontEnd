import { useNavigate } from "react-router-dom";

export default function AdminPutSingleUser(prop){
    const navigate = useNavigate();

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
                <h2 className="text-green">Users</h2>
                <div className="">
                    <form className="text-green" onSubmit={(e)=>{
                        e.preventDefault()
                        fetch(`http://localhost:7043/AdminUsers/ChangeRegister?id=${prop.id}`,{method:"PUT",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`},body:{
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
                          <input type="text" class="form-control" id="username"/>
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Email address</label>
                          <input type="email" class="form-control" id="exampleInputEmail1"/>
                        </div>
                        <div class="mb-3">
                          <label for="permissionId" class="form-label">Permission Id</label>
                          <input type="number" class="form-control" id="permissionId"/>
                        </div>
                        <button type="submit" class="btn btn-green">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}