import { useState, useEffect } from 'react';
import NewComment from '../Functions/NewComment';
import NewPost from '../Functions/NewPost';
import '../User/UserHomePage.css';
import { jwtDecode } from 'jwt-decode';
import Dropdown from 'react-bootstrap/Dropdown';
import { url } from '../../connect2getherUrl.js';
import { DarkModeBodySetter, DarkModeLogoText, DarkModeSwitch, DisplayDarkModeLogos, LightModeLogoText } from '../Functions/DarkModeFunctions';
import { PostsKi, UsersKi } from './UserFunctions.js';
export default function MyNavBar(params){
    return(
        <nav className="navbar navbar-dark p-2 text-green border-bottom-green fixed-top shadow">
                <div className="nav-item ">
                    <a href="../UserHomePage" className={`${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"} p-2 text-decoration-none`}>Home</a>
                </div>
                <div className="nav-item float-right">
                    <Dropdown id='btn-profile'>
                      <Dropdown.Toggle variant="" className={`btn-green ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}`} id="dropdown-basic">
                        Profile
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark"}`}>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/ProfilePage">Details</Dropdown.Item>
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

export function MyNavBarWithSearch(params){
    return(
        <nav className={`navbar row p-2 text-green border-bottom-green fixed-top shadow ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-light"}`}>
                <div className='nav-item col-lg-4 col-sm-0'>

                </div>
                <div className='nav-item col-lg-4 col-sm-9'>
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
                <div className="nav-item col-lg-4 col-sm-3">
                    <Dropdown id='btn-profile' className={`float-end `}>
                      <Dropdown.Toggle variant="" className={`btn-green ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}`} id="dropdown-basic">
                        Profile
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark"}`}>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/ProfilePage">Details</Dropdown.Item>
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