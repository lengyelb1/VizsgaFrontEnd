import { useNavigate } from 'react-router-dom';
import '../css/UserHomePage.css';


const NewComment = (proms) => {    
    return (
        <div className=''>
            <form onSubmit={(e) => {
                e.persist();
                e.preventDefault();
                fetch("https://localhost:7043/Comment", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        "text": e.target.elements.comment.value,
                        "postId": proms.postId,
                        "userId": proms.userId
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
                <input type="submit" value="Post" className='btn-green' />
            </form>
        </div>
    )
}

export default NewComment
