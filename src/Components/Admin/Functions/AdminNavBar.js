import { useState, useEffect } from 'react';
import NewComment from '../../Functions/NewComment';
import NewPost from '../../Functions/NewPost.js';
import '../../User/UserHomePage.css';
import { jwtDecode } from 'jwt-decode';
import Dropdown from 'react-bootstrap/Dropdown';
import { url } from '../../../connect2getherUrl.js';
import { DarkModeBodySetter, DarkModeLogoText, DarkModeSwitch, DisplayDarkModeLogos, LightModeLogoText } from '../../Functions/DarkModeFunctions.js';
import { PostsKi, UsersKi } from '../../Functions/UserFunctions.js';


export default function AdminNavBar(params){
    const [alerts, setAlerts] = useState([]);


    useEffect(()=>{
        fetch(`${url}/User/UserAllAlertMessage?userId=${jwtDecode(localStorage.getItem("token")).id}`, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'}})
        .then((res) => res.json())
        .then((data) => {
            setAlerts(data);
        })
        .catch(console.log)
        .finally(() => {
        });
    },[])

    return(
        <nav className={`navbar navbar-dark p-2 text-green border-bottom-green fixed-top shadow ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}`}>
                <div className="nav-item ">
                    <a href="../AdminHomePage" className={`${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"} p-2 text-decoration-none`}>Home</a>
                </div>
                <div className='nav-item'></div>
                <div className='nav-item'></div>
                <div className='nav-item'>
                    <AlertDropDown alerts={alerts}/>
                </div>
                <div className="nav-item float-right">
                    <Dropdown id='btn-profile'>
                      <Dropdown.Toggle variant="" className={`btn-green ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}`} id="dropdown-basic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark"}`}>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/ProfilePage">Details</Dropdown.Item>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/AdminDashboard">Admin Dashboard</Dropdown.Item>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} onClick={async ()=>{
                            DarkModeSwitch()
                            params.refreshDatas(params.refrDatas+1)
                        }}><DisplayDarkModeLogos/></Dropdown.Item>
                        <hr className={localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}/>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/" onClick={async ()=>{ await localStorage.setItem("token",undefined) }}>Log Out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav>
    )

    

}

export function AdminNavBarWithSearch(params){
    const [alerts, setAlerts] = useState([]);


    useEffect(()=>{
        fetch(`${url}/User/UserAllAlertMessage?userId=${jwtDecode(localStorage.getItem("token")).id}`, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'}})
        .then((res) => res.json())
        .then((data) => {
            setAlerts(data);
        })
        .catch(console.log)
        .finally(() => {
        });
    },[])   
    return(
        <nav className={`navbar row p-2 text-green border-bottom-green fixed-top shadow ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-light"}`}>
                <div className='nav-item col-lg-2 col-sm-0'>

                </div>
                <div className='nav-item col-lg-4 col-sm-7'>
                    <form className="d-flex">
                        <input className={`form-control me-2 ${localStorage.getItem("darkMode")==0? "text-dark":"text-light"}`} name='searchBar' id='searchBar' type="search" placeholder="Search" aria-label="Search" onChange={async (e)=>{
                            if (e.target.value.trim() !== "" && e.target.value.trim() !== "@") {
                                params.setFetchPending(true);
                                await fetch(`${url}/User/SearchWithNameOrTitle?keresettErtek=${e.target.value}&userId=${jwtDecode(localStorage.getItem("token")).id}`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'}})
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data.length > 0) {
                                        if (data[0].username == undefined) {
                                            params.setFeed(<div><PostsKi posts={data}/></div>);
                                            //setFeed(<div><h1 className='text-white'>Posts</h1></div>);

                                        }
                                        else{
                                            params.setFeed(<div><UsersKi users = {data}/></div>)
                                            //setFeed(<div><h1 className='text-white'>Users</h1></div>)
                                        }    
                                    }else{
                                        params.setFeed(<div><PostsKi posts={data}/></div>);
                                    }

                                })
                                .catch(console.log)
                                .finally(() => {
                                    params.setFetchPending(false);
                                })
                            } else {
                                params.setFetchPending(true);
                                fetch(`${url}/UserPost/UserPostWithLike?userId=${jwtDecode(localStorage.getItem("token")).id}`, {method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                                .then((res) => res.json())
                                .then((data) => {
                                    params.setFeed(<div><NewPost refreshDatas = {params.refreshDatas} refrDatas ={params.refrDatas}/><PostsKi posts={data}/></div>);
                                })
                                .catch(console.log)
                                .finally(() => {
                                    params.setFetchPending(false);
                                });
                            }
                        }}/>
                    </form>
                </div>
                <div className='nav-item col-lg-2 col-sm-2'>
                        <AlertDropDown alerts={alerts}/>
                </div>
                <div className="nav-item col-lg-2 col-sm-2">
                    <Dropdown id='btn-profile' className={`float-end `}>
                      <Dropdown.Toggle variant="" className={`btn-green ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}`} id="dropdown-basic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark"}`}>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/ProfilePage">Profile</Dropdown.Item>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/AdminDashBoard">Admin Dashboard</Dropdown.Item>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} onClick={async ()=>{
                            DarkModeSwitch()
                            await params.refreshDatas(params.refrDatas+1)
                        }}><DisplayDarkModeLogos/></Dropdown.Item>
                        <hr className={localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}/>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/" onClick={async ()=>{ await localStorage.setItem("token",undefined) }}>Log Out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav>
    )
}

function AlertDropDown(params){
    return(
        <Dropdown>
            <Dropdown.Toggle variant="" className={`btn-green ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}`} id="dropdown-basic">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark"} overflow-auto `} style={{height:"100px", width:"300px", borderRadius:"10px", border:"1px solid #A8F231"}}>
                    <AlertMessages messages={params.alerts} />
            </Dropdown.Menu>
        </Dropdown>
    )
}

function AlertMessages(params){
    return(
        params.messages.map((msg)=>{
            return(
                <Dropdown.Item key={msg.id} className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`}><div className='text-green'>{msg.title}</div><div className='text-light'>{msg.description}</div><hr/></Dropdown.Item>
            )
        })
    )
}