import { useEffect } from 'react'
import './UserHomePage.css'
export default function ProfilePage (){

    useEffect(()=>{
        
    })

    return (
        <div className='vh-100 bg-dark text-green'>
            <div className='row'>
                <nav className="navbar navbar-dark p-2 bg-dark text-green w-100 border-bottom-green fixed-top shadow">
                    <div className="nav-item">
                      <a className="nav-link" href="/" onClick={()=>{
                          localStorage.setItem("token",undefined)
                      }}>Log Out</a>
                    </div>
                    <div className="nav-item">
                      <p className="nav-link text-shadow-green">Profile</p>
                    </div>
                </nav>
            </div>
            <div className=''>

            </div>
        </div>
    )
}