import { useEffect, useState } from 'react'
import './UserHomePage.css'
import { jwtDecode } from 'jwt-decode'
import { url } from '../../connect2getherUrl.js'
import { DarkModeBodySetter, DarkModeSwitch, DisplayDarkModeLogos } from '../Functions/DarkModeFunctions';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavBar from '../Functions/MyNavBar.js';
export default function ProfilePage (){
    const [data,setData] = useState();
    const [isFetchPending, setFetchPending] = useState(false);
    const [refrDatas,refreshDatas] = useState(0)
    const navigate = useNavigate();


    useEffect(()=>{
        DarkModeBodySetter();

        setFetchPending(true)
        fetch(`${url}/UserProfile/UserProfileById?id=${jwtDecode(localStorage.getItem("token")).id}`,{method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r)=>
            r.json()
        )
        .then((resp)=>{
            setData(resp)
        })
        .finally(()=>{
            setFetchPending(false)
        })
    },[refrDatas])

    if (data) {
        return (
            <div className='vh-100 text-green'>
                <div className='row'>
                <MyNavBar refrDatas={refrDatas} refreshDatas={refreshDatas}/>
                </div>
                <div className='col-12 mt-5'>
                    <br/>
                </div>
                <a className="nav-link" onClick={async ()=>{await navigate(-1)}}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill={localStorage.getItem("darkMode")==0? "black":"#A8F231"} className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg></a>
                <br/>
                <div className='w-75 row ms-2 p-3 mx-auto text-light'>
                    <h3 className='text-green'>{data.userName}</h3>
                    <p>{data.email}</p>
                    <p>Last login: {data.lastLogin}</p>
                    <p>Registration Date: {data.registrationDate.replace("T00:00:00","")}</p>
                    <p>Points: {data.points}</p>
                    <p>Rank: {data.rank.name}</p>
                    <a href='/ChangePassword'><input type="button" value="Change Password" className='btn btn-green'/></a>
                    <a href='/ChangeUsernameEmail'><input type="button" value="Change Username & Email" className='btn btn-green mt-1'/></a>
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