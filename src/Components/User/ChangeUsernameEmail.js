import { jwtDecode } from "jwt-decode";
import { url } from "../../connect2getherUrl.mjs";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { DarkModeSwitch, DisplayDarkModeLogos } from "../DarkModeFunctions";
import { useEffect, useState } from "react";

export default function ChangeUsernameEmail () {
    const navigate = useNavigate();
    const [refrDatas,refreshDatas] = useState(0)
    const [data,setData] = useState();
    const [isFetchPending, setFetchPending] = useState(false);
    useEffect(()=>{
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

    return(
        <div className={`mx-auto text-center ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"} vh-100 col-12`}>
            <nav className={`navbar row p-2 text-green border-bottom-green fixed-top shadow ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-light"}`}>
                <div className='nav-item col-lg-4 col-sm-0'>

                </div>
                <div className='nav-item col-lg-4 col-sm-9'>
                </div>
                <div className="nav-item col-lg-4 col-sm-3">
                    <Dropdown id='btn-profile' className={`float-end `}>
                      <Dropdown.Toggle variant="" className={`btn-green ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}`} id="dropdown-basic">
                        Profile
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark"}`}>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/ProfilePage">Details</Dropdown.Item>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} onClick={async ()=>{
                            DarkModeSwitch()
                            refreshDatas(refrDatas+1)
                        }}><DisplayDarkModeLogos/></Dropdown.Item>
                        <hr className={localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}/>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/" onClick={async ()=>{ await localStorage.setItem("token",undefined) }}>Log Out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav>
            <br className="mt-5"/>
            <br className="mt-5"/>
            <br className="mt-5"/>
            <h1>Change Username & Email</h1>
            <form onSubmit={
                async (e)=>{
                    e.preventDefault();
                    e.target.elements.SubmitChange.innerHTML = `<div className="spinner-border text-green" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>`;
                    await fetch(`${url}/UserProfile/ChangeUser?userId=${jwtDecode(localStorage.getItem("token")).id}`,{
                        headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'},
                        method:"PUT",
                        body:JSON.stringify({
                            "userName": e.target.elements.userName.value,
                            "email": e.target.elements.email.value
                        })
                    })
                    .catch((e)=>{alert(e)})
                    .finally(()=>{
                        alert("Datas changed!")
                        navigate("../ProfilePage")

                    })
                }
            }>
                <input type="text" className="input-green" id="userName" name="userName" placeholder="User name" defaultValue={data?.userName}/>
                <input type="text" className="input-green" id="email" name="email" placeholder="Email" defaultValue={data?.email}/>
                <input type="submit" name="SubmitChange" value="Change" className="btn btn-green"/>
            </form>
        </div>
    )
}