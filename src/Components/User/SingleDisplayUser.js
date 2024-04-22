import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../connect2getherUrl.js";
import NewComment from "../Functions/NewComment";
import { jwtDecode } from "jwt-decode";
import { DarkModeSwitch, DisplayDarkModeLogos } from "../Functions/DarkModeFunctions";
import { Dropdown } from "react-bootstrap";
import MyNavBar from "../Functions/MyNavBar.js";

export default function SingleDisplayUser () {

    const prop = useParams();
    const [data,setData] = useState();
    const [refrDatas,refreshDatas] = useState(0)
    const [isFetchPending, setFetchPending] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        setFetchPending(true)
        fetch(`${url}/User/UserById?id=${prop.id}`,{method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r)=>
            r.json()
        )
        .then((resp)=>
            setData(resp)
        )
        .finally(()=>{setFetchPending(false)})
    },[refrDatas])

    return(
        <div className={`min-vh-100 ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-light"}`}>
            <MyNavBar refrDatas={refrDatas} refreshDatas={refreshDatas}/>
            <br className="mt-5"/>
            <br className="mt-5"/>
            
            <div>
                <UserKi data= {data} isFetchPending={isFetchPending}/>
            </div>

        </div>
    )

    function UserKi(params){
        const data = params.data
        const isFetchPending = params.isFetchPending;
        if (isFetchPending || data === undefined) {
            return(
                <div className="spinner-border text-green" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            )
        }else{
            return(
                <div className={`col-9 p-2 mx-auto mt-4  ${localStorage.getItem("darkMode")==0? "bg-light text-dark":"bg-dark text-light"}`}>
                    <div className='constent p-2'>
                        {console.log(data)}
                        <a className="nav-link" onClick={async ()=>{await navigate(-1)}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={localStorage.getItem("darkMode")==0? "black":"#A8F231"} className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg></a>
                        <h3 className='text-green'>{data[0].username}</h3>
                        <h5 className=''>Last Login: {data[0].lastLogin.replace("T"," ")}</h5>
                        <h5 className=''>Registration Date: {data[0].registrationDate.replace("T00:00:00","")}</h5>
                        <h5 className='text-green'>Rank: {data[0].rank.name}</h5>
                        <h5 className='text-green'>Points: {data[0].points}</h5>

                        <div className='small'></div>
                    </div>
                    <div className='text-green align-middle'>
                        <hr className="border-3"/>
                    </div>
                    <div>
                        <PostsKi posts={data[0].userPosts}/>
                    </div>
                </div>
            )
        }
    }
 
    function CommentsKi (params) {
        if (params.post.comments != null && params.post.comments != "null") {
            return (
                <div>
                    {params.post.comments.map((comment) => {
                        if (comment.userName) {
                            return (<div key={params.post.id+(comment.id+1)} id={`commnet-${params.post.id+(comment.id)}`} className='card card-green col-12 d-inline-block m-1 p-1 '>
                                <a className='text-decoration-none ' href={`/SingleDisplayUser/${comment.userId}`}>
                                    <p className={`card-title postUserName ${localStorage.getItem("darkMode")==0? "dark":""}`}>{comment.userName}</p>
                                </a>
                                <div className='card-body p-1 mx-auto'>
                                    <p className=''>{comment.text}</p>
                                </div>
                            </div>)
                        }else{
                            return(<div key={params.post.id+(comment.id+1)} id={`commnet-${params.post.id+(comment.id)}`} className='card card-green col-12 d-inline-block m-1 p-1 '>
                                <a className='text-decoration-none' href={`/SingleDisplayUser/${comment.userId}`}>
                                    <p className={`card-title postUserName ${localStorage.getItem("darkMode")==0? "dark":""}`}>{comment.userId}</p>
                                </a>
                                <div className='card-body p-1 mx-auto'>
                                    <p className=''>{comment.text}</p>
                                </div>
                            </div>)
                        }
                    })}
                </div>
            )    
        }else{
            return <div className="spinner-border text-green" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
        }
    }

    function LikeButton(params){
        var post = params.post
        console.log("Post liked: "+post)
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
                        .catch((e) => {
                            console.log(e)
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
    function Post_ (params) {
        const post = params.post
        /*Post card render */
        return (
            <div key={post.id + 1} className={`card col-md-5 p-2 mx-auto mt-3 border border-dark shadow-green ${localStorage.getItem("darkMode")==0? "text-dark ":"bg-dark text-light"}`}>
                <a className='card-title text-decoration-none' href={`/SingleDisplayUser/${post.userId}`}>
                    <p className={`postUserName  ${localStorage.getItem("darkMode")==0? "dark":""}`}>{post.userName}</p>
                </a>

                <a className='card-body text-decoration-none' href={`/SinglePostDisplay/${post.id}`}>
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
}