import { jwtDecode } from "jwt-decode";
import { url } from "../../connect2getherUrl.js";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { DarkModeSwitch, DisplayDarkModeLogos } from "../Functions/DarkModeFunctions";
import { useEffect, useState } from "react";
import MyNavBar from "../Functions/MyNavBar.js";

export default function ChangePassword(){
    const navigate = useNavigate();
    const [refrDatas,refreshDatas] = useState(0)
        useEffect(()=>{
    },[refrDatas])

    return(
        <div className={`mx-auto text-center ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"} vh-100 col-12`}>
            <MyNavBar refrDatas={refrDatas} refreshDatas={refreshDatas}/>
            <br className="mt-5"/>
            <br className="mt-5"/>
            <br className="mt-5"/>
            <a className="nav-link float-start" onClick={async ()=>{await navigate(-1)}}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill={localStorage.getItem("darkMode")==0? "black":"#A8F231"} class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg></a>
            <h1>Change Password</h1>
            <form onSubmit={
                (e)=>{
                    e.preventDefault();
                    e.target.elements.SubmitChange.innerHTML = `<div className="spinner-border text-green" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>`;
                    fetch(`${url}/UserProfile/UserChangePassword?UserId=${jwtDecode(localStorage.getItem("token")).id}`,{
                        headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'},
                        method:"PUT",
                        body:JSON.stringify({
                            "oldPassword": e.target.elements.oldPassword.value,
                            "newPassword": e.target.elements.newPassword.value,
                            "newPasswordAgain": e.target.elements.newPasswordAgain.value
                        })
                    })
                    .catch((e)=>{alert(e)})
                    .finally(()=>{
                        alert("Password changed!")
                        navigate("../ProfilePage")

                    })
                }
            }>
                <input type="text" className="input-green" id="oldPassword" name="oldPassword" placeholder="Old Password"/>
                <input type="text" className="input-green" id="newPassword" name="newPassword" placeholder="New Password"/>
                <input type="text" className="input-green" id="newPasswordAgain" name="newPasswordAgain" placeholder="New Password Again"/>
                <input type="submit" name="SubmitChange" value="Change" className="btn btn-green"/>
            </form>
        </div>
    )
}