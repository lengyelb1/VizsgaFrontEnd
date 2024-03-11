import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import NewComment from './NewComment';
import NewPost from './NewPost';
export default function SinglePostDisplay(){
    const prop = useParams();
    const [data,setData] = useState();

    useEffect(()=>{
        fetch(`http://localhost:7043/UserPost/id?id=${prop.id}`,{method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r)=>
            r.json()
        )
        .then((resp)=>
            setData(resp)
        )
    },[]);

    function CommentsKi (params) {
        if (params.post.comments != null && params.post.comments != "null") {
            return (
                <div>
                    {params.post.comments.map((comment) => (
                    <div key={params.post.id+(comment.id+1)} id={`commnet-${params.post.id+(comment.id)}`} className='card card-green col-12 d-inline-block m-1 p-1 '>
                        <p className='card-title'>{comment.userId}</p>
                        <div className='card-body p-1 mx-auto'>
                            <p className=''>{comment.text}</p>
                        </div>
                    </div>
                    ))}
                    <NewComment postId={params.post.id} userId={1}/>
                </div>
            )    
        }else{
            return <div className="spinner-border text-green" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
        }
    }
    if (data != null) {
        return(
            <div className="vh-100 bg-dark">
                <nav className="navbar navbar-dark p-2 bg-dark text-green w-100 border-bottom-green fixed-top shadow">
                    <div className="nav-item">
                      <a className="nav-link" href="/" onClick={()=>{
                          localStorage.setItem("token",undefined)
                      }}>Log Out</a>
                    </div>
                    <div className="nav-item">
                      <a className="nav-link" href="/ProfilePage">Profile</a>
                    </div>
                </nav>
                {
                        <div key={data.id + 1} className='card col-md-5 p-2 bg-dark text-light mx-auto mt-3 border border-dark shadow-green'>
                            <h5 className='text-muted'>{data.userId}</h5>
                            <h5 className=''>{data.title}</h5>
                            <div className='card-body'>
                                <a href={`/SinglePostDisplay/${data.id}`}><div className='small'>{data.description}</div></a>
                            </div>
                            <div className='text-green align-middle'>
                                {data.like}
                                <button className='btn rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#A8F231" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                    </svg>
                                </button>
                                <button className='btn rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#A8F231" className="bi bi-fire" viewBox="0 0 16 16">
                                      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <CommentsKi post={data}/>
                            </div>
                        </div>
                    
                }
            </div>
        )
    }
    else{
        return (
            <div className='bg-dark vh-100 text-center text-green'>
                <div className="spinner-border " role="status">
                    <span className="visually-hidden text-green">Loading...</span>
                </div>
            </div>
            )
    }
    

}