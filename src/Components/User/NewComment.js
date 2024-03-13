import { useNavigate } from 'react-router-dom';
import '../User/UserHomePage.css';



const NewComment = (proms) => {    
    return (
        <div className=''>
            <form onSubmit={(e) => {

                document.getElementById("submitCommentBtn").innerHTML = <div className="spinner-border " role="status">
                    <span className="visually-hidden text-green">Loading...</span>
                </div>;
                e.persist();
                e.preventDefault();
                fetch("http://localhost:7043/Comment", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        "text": e.target.elements.comment.value,
                        "postId": proms.postId,
                        "userId": proms.userId,
                        "id": 0,
                        "commentId": 0

                    }),
                })
                .then((resp) => {
                    console.log(resp)
                })
                .catch(console.log);
            }}>
                <label>
                    <input type="text" name="comment" placeholder='Say something...' className='input-green'/>
                </label>
                <input id='submitCommentBtn' type="submit" value="Post" className='btn-green'/>
            </form>
        </div>
    )
}

export default NewComment
