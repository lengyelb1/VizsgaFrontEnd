import '../User/UserHomePage.css';
import { jwtDecode } from 'jwt-decode';

/*
    "description": e.target.elements.PostText.value,
    "title": e.target.elements.PostTitle.value,
    "userId": proms.userId
*/
export default function NewPost (proms){


    return (
        <form className='col-md-5 p-2 mx-auto rounded shadow-green text-green' onSubmit={
            (e) => {
                e.persist();
                e.preventDefault();
                var file = e.target.elements.imageFileChooser.value
                var id = parseFloat(jwtDecode(localStorage.getItem("token")).id);
                fetch("http://localhost:7043/UserPost", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "description": e.target.elements.PostText.value,
                        "title": e.target.elements.PostTitle.value,
                        "userId": id
                    })
                })
                .then((resp) => {
                    console.log(resp)
                    console.log("File:")
                    console.log(file)
                })
                .catch(console.log);
            }
        }>
          <div className="mb-3">
              <input type="text" name="PostTitle" placeholder='Title' className='w-100 input-green'/>
              <input type="text" name="PostText" placeholder='Post something...' className='w-100 input-green'/>
          </div>
          <button type="submit" className="btn btn-green">Post</button>
          <input type='file' className='file-input m-1' id='imageFileChooser'/>
        </form>
    )
}