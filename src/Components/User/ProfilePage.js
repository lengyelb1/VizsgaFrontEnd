import { useEffect, useState } from 'react'
import './UserHomePage.css'
import { jwtDecode } from 'jwt-decode'
import { url } from '../../connect2getherUrl.js'
import { DarkModeBodySetter, DarkModeSwitch, DisplayDarkModeLogos } from '../Functions/DarkModeFunctions';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavBar from '../Functions/MyNavBar.js';
import NewComment from '../Functions/NewComment.js';
import { CommentsKi, LikeButton } from '../Functions/UserFunctions.js';
export default function ProfilePage (){
    const [data,setData] = useState({});
    const [allPosts,setAllPosts] = useState([]);
    const [allComments,setAllComments] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [refrDatas,refreshDatas] = useState(0)
    const navigate = useNavigate();

    useEffect(()=>{
        DarkModeBodySetter();
        
        fetch(`${url}/UserProfile/UserProfileById?id=${jwtDecode(localStorage.getItem("token")).id}`,{method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r)=>
            r.json()
        )
        .then((resp)=>{
            setData(resp)
        })
        
        fetch(`${url}/UserPost/UserPostWithLike?userId=${jwtDecode(localStorage.getItem("token")).id}`,{method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r)=>
            r.json()
        )
        .then((resp)=>{
           setAllPosts(resp)
        })

        fetch(`${url}/Comment/AllCommentByOwner?userId=${jwtDecode(localStorage.getItem("token")).id}`,{method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r)=>
            r.json()
        )
        .then((resp)=>{
           setAllComments(resp)
        })
    },[refrDatas])

    if (data != null && data != undefined) {
        return(
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
                    <h3 className='text-green'>{data.userId}</h3>
                    <p>{data.email}</p>
                    <p>Last login: {data.lastLogin}</p>
                    <p>Registration Date: {data.registrationDate}</p>
                    <p>Points: {data.points}</p>
                    <p>Rank: {data.rank?.name}</p>
                    <div className='d-inline-flex gap-2'>
                        <a href='/ChangePassword' className='btn btn-green'>Change Password</a>
                        <a href='/ChangeUsernameEmail' className='btn btn-green mt-1'>Change Username & Email</a>
                    </div>
                </div>
                <div className='d-flex justify-content-center gap-2'>
                    <button className="btn btn-green" type="button" data-bs-target="#carouselExample" aria-expanded="false" data-bs-slide-to="0">Posts</button>
                    <button className="btn btn-green" type="button" data-bs-target="#carouselExample" aria-expanded="false" data-bs-slide-to="1">Comments</button>
                </div>
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="carousel-item active p-2">
                        <h4 className='text-center'>Own Posts:</h4>
                        <PostsKi/>
                    </div>
                    <div className="carousel-item p-2">
                        <h4 className='text-center'>Comments:</h4>
                        <CommentsKi/>
                    </div>
                  </div>
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

    function PostsKi() {
        if (allPosts != undefined && allPosts != null) {
            return allPosts.map((post) => {
                if (post.userId == jwtDecode(localStorage.getItem("token")).id) {
                    return (
                        <div key={post.id + 1} className={`card col-md-5 p-2 mx-auto mt-3 border border-dark shadow-green ${localStorage.getItem("darkMode")==0? "text-dark ":"bg-dark text-light"}`}>
                            
                            <h5 className={` ${localStorage.getItem("darkMode")==0? "dark":""}`}>{post.userName}</h5>
                            
                            <a className='card-body text-decoration-none' href={`/SinglePostDisplay/${post.id}`}>
                                <h5 className=''>{post.title}</h5>
                                <div className='small'>{post.description}</div>
                            </a>
                            <div className='text-green align-middle'>
                                {post.like}
                                <LikeButton post = {post} refreshDatas={refreshDatas} refrDatas={refrDatas}/>
                            </div>
                            <div className="d-inline-flex gap-2">
                                <button className="btn btn-green" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${post.id}`} aria-expanded="false" aria-controls="collapseExample">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-text-fill" viewBox="0 0 16 16">
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
                                    </svg>
                                </button>
                                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletePost">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-trash3" viewBox="0 0 16 16">
                                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                    </svg>
                                </button>
                                <div className={`modal fade`} id="deletePost" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div className={`modal-dialog `}>
                                    <div className={`modal-content ${localStorage.getItem("darkMode")==0? "":"dark"}`}>
                                      <div className={`modal-header `}>
                                        <h1 className={`modal-title fs-5 text-green`} id="exampleModalLabel">Are you sure about deleting?</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={async() =>{fetch(`${url}/UserPost/DeleteUserPostById?id=${post.id}&userId=${jwtDecode(localStorage.getItem("token")).id}`,{method:"DELETE",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}); alert("Successfull delete!"); refreshDatas(refrDatas+1); }}>Delete</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <a href={`./PostChange/${post.id}`} className='btn btn-warning'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                    </svg>
                                </a>
                            </div>
                            <div className="collapse" id={`collapseExample${post.id}`}>
                                <CommentsKi post={post}/>
                                <NewComment refreshDatas = {refreshDatas} refrDatas ={refrDatas} postId={post.id}/>
                            </div>
                        </div>
                    )
                }
            })    
        }
    }

    function CommentsKi(){
        if (allComments != null && allComments != undefined) {
            return allComments.map((comment)=> {
                if (comment.ownComment) {
                    return(<div key={comment.id+1} id={`commnet-${comment.id}`} className={`card card-green col-6 mx-auto p-1 ${localStorage.getItem("darkMode")==0? "text-dark":"text-green"}`}>
                    <div className='card-body p-1 mx-auto'>
                        <a className='text-decoration-none' href={`/SinglePostDisplay/${comment.postId}`}>
                            {console.log(comment)}
                            <p className='postUserName'>Post</p>
                        </a>
                        <p className="">{comment.text}</p>
                        <div className='d-inline-flex gap-2'>
                            <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteCommentModal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-trash3" viewBox="0 0 16 16">
                                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </button>
                            <div className={`modal fade`} id="deleteCommentModal" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                              <div className={`modal-dialog `}>
                                <div className={`modal-content ${localStorage.getItem("darkMode")==0? "":"dark"}`}>
                                  <div className="modal-header">
                                    <h1 className="modal-title fs-5 text-green" id="exampleModalLabel2">Are you sure about deleting?</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={async() =>{fetch(`${url}https://localhost:7043/Comment/DeleteCommentByUserId?id=${comment.id}&userId=${jwtDecode(localStorage.getItem("token")).id}`,{method:"DELETE",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}); alert("Successfull delete!"); refreshDatas(refrDatas+1); }}>Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <a href={`./CommentChange/${comment.id}`} className='btn btn-warning'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>)
                }  
            })
        }
    }

}