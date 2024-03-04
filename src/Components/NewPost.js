export default function NewPost (proms){
    return (
        <form className='col-md-5 p-2 mx-auto rounded shadow-green text-green' onSubmit={
            (e) => {
                e.persist();
                e.preventDefault();
                fetch("http://localhost:7043/User", {
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
            }
        }>
          <div class="mb-3">
              <input type="text" name="Post-text" placeholder='Post something...' className='w-100 input-green'/>
          </div>
          <button type="submit" class="btn btn-green">Post</button>
        </form>
    )
}