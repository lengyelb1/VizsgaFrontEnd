import { useState, useEffect } from 'react';
import NewComment from './NewComment';
import NewPost from './NewPost';
import '../User/UserHomePage.css';
import { jwtDecode } from 'jwt-decode';
import Dropdown from 'react-bootstrap/Dropdown';
import { url } from '../../connect2getherUrl.mjs';
import { DarkModeBodySetter, DarkModeLogoText, DarkModeSwitch, DisplayDarkModeLogos, LightModeLogoText } from '../DarkModeFunctions';

export default function UserHomePageV2(){

    const [posts, setPosts] = useState([]);
    const [Allposts, setAllPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [feed,setFeed] = useState();
    const [refrDatas,refreshDatas] = useState(0)

    

    useEffect(() => {
        DarkModeBodySetter();

        setFetchPending(true);

        fetch(`${url}/UserPost/UserPostWithLike?userId=${jwtDecode(localStorage.getItem("token")).id}`, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'}})
        .then((res) => res.json())
        .then((data) => {
            setFeed(<div><NewPost refreshDatas = {refreshDatas} refrDatas ={refrDatas}/><PostsKi posts={data}/></div>);
        })
        .catch(console.log)
        .finally(() => {
            setFetchPending(false);
        });
    }, [refrDatas]);

    //UserHomePageV2 returning 
    return(
        <div className='p-2'>
            <nav className={`navbar row p-2 text-green border-bottom-green fixed-top shadow ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-light"}`}>
                <div className='nav-item col-lg-4 col-sm-0'>

                </div>
                <div className='nav-item col-lg-4 col-sm-9'>
                    <form className="d-flex">
                        <input className={`form-control me-2 ${localStorage.getItem("darkMode")==0? "text-dark":"text-light"}`} name='searchBar' id='searchBar' type="search" placeholder="Search" aria-label="Search" onChange={async (e)=>{
                            if (e.target.value.trim() !== "" && e.target.value.trim() !== "@") {
                                setFetchPending(true);
                                await fetch(`${url}/User/SearchWithNameOrTitle?keresettErtek=${e.target.value}&userId=${jwtDecode(localStorage.getItem("token")).id}`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'}})
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data.length > 0) {
                                        if (data[0].username == undefined) {
                                            setFeed(<div><PostsKi posts={data}/></div>);
                                            //setFeed(<div><h1 className='text-white'>Posts</h1></div>);

                                        }
                                        else{
                                            setFeed(<div><UsersKi users = {data}/></div>)
                                            //setFeed(<div><h1 className='text-white'>Users</h1></div>)
                                        }    
                                    }else{
                                        setFeed(<div><PostsKi posts={data}/></div>);
                                    }

                                })
                                .catch(console.log)
                                .finally(() => {
                                    setFetchPending(false);
                                })
                            } else {
                                setFetchPending(true);
                                fetch(`${url}/UserPost/UserPostWithLike?userId=${jwtDecode(localStorage.getItem("token")).id}`, {method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                                .then((res) => res.json())
                                .then((data) => {
                                    setFeed(<div><NewPost refreshDatas = {refreshDatas} refrDatas ={refrDatas}/><PostsKi posts={data}/></div>);
                                })
                                .catch(console.log)
                                .finally(() => {
                                    setFetchPending(false);
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
                            await refreshDatas(refrDatas+1)
                        }}><DisplayDarkModeLogos/></Dropdown.Item>
                        <hr className={localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-green"}/>
                        <Dropdown.Item className={`btn-profile-menu ${localStorage.getItem("darkMode")==0? "light":"dark"}`} href="/" onClick={async ()=>{ await localStorage.setItem("token",undefined) }}>Log Out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav>
            <div className="min-vh-100 mx-auto mt-5 ">
                <FeedKi/>
            </div>
        </div>
    )

    function FeedKi () {
        if (isFetchPending) {
            return (
                <div className="spinner-border text-green" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            )
        }
        else {
            return (feed)
        }
    }

    function PostsKi (params) {
        if (isFetchPending) {
            return (
                <div className=' text-center text-green mt-5'>
                    <div className="spinner-border " role="status">
                        <span className="visually-hidden text-green">Loading...</span>
                    </div>
                </div>
            )
        }else{
            if (params.posts.length < 1) {
                return (
                    <div className=' text-center text-green mt-5'>
                        <h4>No post found</h4>
                    </div>
                )
            }
            else{
                return (params.posts.map((post) => <Post_ key={post.id + 2} post={post}/>))
            }
        }
    }
    /* Comment card Render */
    function CommentsKi (params) {
        return params.post.comments.map((comment) => {
            
            return(<div key={params.post.id+(comment.id+1)} id={`commnet-${params.post.id+(comment.id)}`} className={`card card-green col-12 d-inline-block m-1 p-1 ${localStorage.getItem("darkMode")==0? "text-dark":"text-green"}`}>
                <p className='card-title'>{comment.userName}</p>
                <div className='card-body p-1 mx-auto'>
                    <p className="">{comment.text}</p>
                </div>
            </div>)
            

        })    
    }
    /* User card Render */
    function UsersKi (params) {
        return params.users.map((user) => (
            <div key={user.id} id={`user-${user.id}`} className='card card-green col-12 d-inline-block m-1 p-1 '>
                <p className='card-title'>{user.username}</p>
                <div className='card-body p-1 mx-auto'>
                    <p className=''>Points: {user.point}</p>
                </div>
            </div>
        ))
    }


    function Post_ (params) {
        const post = params.post
        /*Post card render */
        return (
            <div key={post.id + 1} className={`card col-md-5 p-2 mx-auto mt-3 border border-dark shadow-green ${localStorage.getItem("darkMode")==0? "text-dark ":"bg-dark text-light"}`}>
                <a className='card-body text-decoration-none' href={`/SinglePostDisplay/${post.id}`}>
                    <h5 className=''>{post.userName}</h5>
                    <h5 className=''>{post.title}</h5>
                    <div className='small'>{post.description}</div>
                </a>
                <div className='text-green align-middle'>
                    {post.like}
                    
                    <LikeButton post = {post}/>
                    
                </div>
                <div>
                    
                    <CommentsKi post={post}/>
                    <NewComment refreshDatas = {refreshDatas} refrDatas ={refrDatas} postId={post.id}/>
                </div>
            </div>
        )
    }

    function LikeButton(params){
        var post = params.post
        if (post.liked) {
            return(
                <button className='btn rounded' onClick={
                    async () => {
                        setFetchPending(true)
                        fetch(`${url}/UserPost/Like`,{method:"POST",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'},body: JSON.stringify({
                            "postId": post.id,
                            "userId": jwtDecode(localStorage.getItem("token")).id,
                            "isLiked": false
                          })
                        })
                        .finally( () => {
                            setFetchPending(false)
                            refreshDatas(refrDatas+1)
                        })
                    }
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#A8F231" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                    </svg>
                </button>
            )
        }else{
            return(
                <button className='btn rounded' onClick={
                    async () => {
                        setFetchPending(true)
                        fetch(`${url}/UserPost/Like`,{method:"POST",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'},body: JSON.stringify({
                            "postId": post.id,
                            "userId": jwtDecode(localStorage.getItem("token")).id,
                            "isLiked": true
                          })
                        })
                        .finally(()=> {
                            setFetchPending(false)
                            refreshDatas(refrDatas+1)
                        })
                    }
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                    </svg>
                </button>
            )
        }
    }

}