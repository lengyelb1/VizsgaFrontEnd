import { url } from "../../../connect2getherUrl"
import NewComment from "../../Functions/NewComment"
import '../AdminDashBoard.css';
import { DislikeButton, LikeButton } from "../../Functions/UserFunctions"

export function AdminPostsKi (params) {



    if (params.isFetchPending) {
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
            return (params.posts.map((post) => <AdminPost_ key={post.id + 2} post={post} refreshDatas={params.refreshDatas} refrDatas={params.refrDatas}/>))
        }
    }
}

function AdminPost_ (params) {
    const post = params.post
    /*Post card render */
    return (
        <div key={post.id + 1} className={`card col-md-5 p-2 mx-auto mt-3 border border-dark shadow-green ${localStorage.getItem("darkMode")==0? "text-dark ":"bg-dark text-light"}`}>
            <a className='card-body text-decoration-none ' href={`/AdminSingleUser/${post.userId}`}>
                <h5 className={`postUserName  ${localStorage.getItem("darkMode")==0? "dark":""}`}>{post.userName}</h5>
            </a>
            <a className='card-body text-decoration-none' href={`/AdminSinglePost/${post.id}`}>
                <h5 className=''>{post.title}</h5>
                <div className='small'>{post.description}</div>
            </a>
            <div className='text-green align-middle'>
                {post.like}
                <LikeButton post = {post} refreshDatas={params.refreshDatas} refrDatas={params.refrDatas}/>
                {post.dislike}
                <DislikeButton post = {post} refreshDatas={params.refreshDatas} refrDatas={params.refrDatas}/>

            </div>
            <p className="d-inline-flex gap-1">
                <button className="btn btn-green" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${post.id}`} aria-expanded="false" aria-controls="collapseExample">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-text-fill " viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
                    </svg>
                </button>
                <button type="button" className="btn btn-green" data-bs-toggle="modal" data-bs-target="#AlertMessageSendModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                    </svg>
                </button>
            </p>
            <div className="collapse" id={`collapseExample${post.id}`}>
                <AdminCommentsKi post={post}/>
                <NewComment refreshDatas = {params.refreshDatas} refrDatas ={params.refrDatas} postId={params.post.id}/>
            </div>
            <div className={`modal fade `} id="AlertMessageSendModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className={`modal-content ${localStorage.getItem("darkMode")==0? "bg-light text-dark ":"bg-dark text-light"}`}>
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Send message to {post.userName}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={async (e)=>{
                        e.preventDefault();
                        await fetch(`${url}/AdminAlertMessage/SendAlertMessageByUserId`, {method:"POST",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'},body:JSON.stringify({
                            "title": e.target.elements.Title.value,
                            "description": e.target.elements.Message.value,
                            "userId": post.userId
                              
                        })})
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data)
                        })
                        .catch(console.log)
                        .finally(() => {
                            params.refreshDatas(params.refrDatas+1)
                        });
                    }}>
                        <input type="text" className="form-control input-green " placeholder="Title" id="Title"/>
                        <textarea className="form-control input-green" placeholder="Message text..." id="Message"/>
                        <br/>
                        <button type="submit" className="btn btn-green" data-bs-dismiss="modal">Send</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

        </div>
    )
}

export function AdminCommentsKi (params) {
    return params.post.comments.map((comment) => {
        return(<div key={params.post.id+(comment.id+1)} id={`commnet-${params.post.id+(comment.id)}`} className={`card card-green col-12 d-inline-block m-1 p-1 ${localStorage.getItem("darkMode")==0? "text-dark":"text-green"}`}>
            <a className='card-title text-decoration-none' href={`/SingleDisplayUser/${comment.userId}`}>
                <p className={`postUserName  ${localStorage.getItem("darkMode")==0? "dark":""}`}>{comment.userName}</p>
            </a>
            <div className='card-body p-1 mx-auto'>
                <p className="">{comment.text}</p>
            </div>
        </div>)
        

    })    
}

export function AdminUsersKi (params) {
    return params.users.map((user) => (
        <div key={user.id} id={`user-${user.id}`} className='card card-green col-12 d-inline-block m-1 p-1 '>
            <p className='card-title'>{user.username}</p>
            <div className='card-body p-1 mx-auto'>
                <p className=''>Points: {user.point}</p>
            </div>
        </div>
    ))
}