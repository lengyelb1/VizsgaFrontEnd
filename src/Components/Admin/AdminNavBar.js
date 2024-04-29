import { useNavigate } from "react-router-dom"

export default function AdminNavBar() {
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-dark bg-dark w-100 border-bottom-green fixed-top shadow">
            <div className="container-fluid">
                <p className="navbar-brand text-danger text-bold fw-bold">Admin</p>
                <a className="nav-link text-light" href="/" onClick={()=>{
                    localStorage.setItem("token",undefined)
                    navigate("/")
                }}>Log Out</a>
            </div>
        </nav>
    )
}
