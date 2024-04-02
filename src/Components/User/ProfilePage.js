import { useEffect, useState } from 'react'
import './UserHomePage.css'
import { jwtDecode } from 'jwt-decode'
import { url } from '../../connect2getherUrl.mjs'
export default function ProfilePage (){
    const [data,setData] = useState();
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(()=>{
        setFetchPending(true)
        fetch(`${url}/User/UserById?id=${jwtDecode(localStorage.getItem("token")).id}`,{method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r)=>
            r.json()
        )
        .then((resp)=>{
            setData(resp)
        })
        .finally(()=>{
            setFetchPending(false)
        })
    },[])

    if (data) {
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
                <div className='col-12 mt-5'>
                    <br/>
                </div>
                <div className='col-12 row ms-2'>
                    {console.log(data)}
                    <h3>{data.username}</h3>
                    <p>{data.email}</p>
                    <p>Last login: {data.lastLogin.replace("T"," ")}</p>
                    <p>Registration Date: {data.registrationDate.replace("T00:00:00","")}</p>
                    <p>Points: {data.point}</p>

                </div>
            </div>
        )
    }else{
        return (
            <div className="spinner-border text-green" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    
}