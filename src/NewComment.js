import { useNavigate } from 'react-router-dom';

const NewComment = (proms) => {    
    return (
        <div>
            <form onSubmit={(e) => {
                e.persist();
                e.preventDefault();
                fetch("https://connect2getherapi20240212180941.azurewebsites.net/Comment", {
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
                .then(() => {
                    console.log("comment added")
                })
                .catch(console.log);
            }}>
                <label>
                    Comment:
                    <input type="text" name="comment" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default NewComment
