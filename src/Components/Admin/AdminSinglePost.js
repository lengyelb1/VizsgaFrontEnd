import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../connect2getherUrl.js";
import AdminNavBar from "./Functions/AdminNavBar.js";

export default function AdminSinglePost(){
    const prop = useParams();
    const [data,setData] = useState();

    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${url}/AdminUserPost/UserGetPostById?id=${prop.id}`,{method:"GET",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((r)=>
            r.json()
        )
        .then(async (resp)=>
            await setData(resp[0])
        )
    },[]);

    function CommentsKi (params) {
        if (params.post.comments) {
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
        }else{
            return (<p>No comments</p>)
        }
        
    }
    if (data != null) {
        return(
            <div className="vh-100 bg-dark">
                <AdminNavBar/>
                <br/>
                <br/>
                <br/>
                <a className="nav-link" onClick={async ()=>{await navigate(-1)}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={localStorage.getItem("darkMode")==0? "black":"#A8F231"} class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg></a>
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