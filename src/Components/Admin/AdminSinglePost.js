import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { url } from "../../connect2getherUrl.mjs";
export default function AdminSinglePost(){
    const prop = useParams();
    const [data,setData] = useState();

    useEffect(()=>{
        fetch(`${url}/AdminUserPost/UserGetPosts?id=${prop.id}`,{method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r)=>
            r.json()
        )
        .then((resp)=>
            setData(resp)
        )
    },[]);

    function CommentsKi (params) {
        if (params.post.comments.length > 0) {
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
                </div>
            )    
        }else{
            return (<p>No comments</p>)
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
                <br/>
                <div key={data.id + 1} className='card col-md-5 p-2 bg-dark text-light mx-auto mt-4 border border-dark shadow-green'>
                    <div className='card-body'>
                        {console.log(data)}
                        <h5 className='text-light'>{data.userId}</h5>
                        <h5 className=''>{data.title}</h5>
                        <div className='small'>{data.description}</div>
                    </div>
                    <div className='text-green align-middle'>
                        <p>Likes: {data.like}</p>
                        <p>Upload date: {data.uploadDate}</p>
                    </div>
                    <div className="mt-2 border-top ">
                        <CommentsKi post={data}/>
                    </div>
                </div>
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