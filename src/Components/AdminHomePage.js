import { useEffect } from "react"
import '../css/AdminHomePage.css';



export default function AdminHomePage () {
    return (
        <div className='bg-dark h-100 p-2'>
            <nav className="navbar navbar-dark bg-dark w-100 border-bottom-green fixed-top shadow">
                <div className="container-fluid">
                    <p class="navbar-brand text-green">Admin</p>
                    <a className="nav-link text-light" href="/" onClick={()=>{
                        localStorage.setItem("token",undefined)
                    }}>Log Out</a>
                </div>
            </nav>
            <div className="mt-5">
                <ListUsers/>
            </div>
        </div>
    )
}

function ListUsers(){
    return <div></div>
}