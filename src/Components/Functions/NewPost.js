import { url } from '../../connect2getherUrl.js';
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
                //var file = e.target.elements.imageFileChooser.value
                if (e.target.elements.PostText.value == "") {
                    alert("Input some text!")
                }else if (e.target.elements.PostTitle.value == "") {
                    alert("Input a title!")
                }else{
                    var id = parseFloat(jwtDecode(localStorage.getItem("token")).id);
                    fetch(`${url}/UserPost/AddUserPost`, {
                        method: "POST",
                        headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'},
                        body: JSON.stringify({
                            "description": e.target.elements.PostText.value,
                            "title": e.target.elements.PostTitle.value,
                            "userId": id
                        })
                    })
                    .then((resp) => {
                        console.log(resp)
                        alert("Post created!")
                    })
                    .catch(console.log)
                    .finally(()=>{
                        proms.refreshDatas(proms.refrDatas+1)
                    })
                }
                
            }
        }>
          <div className="mb-3">
              <input type="text" name="PostTitle" placeholder='Title' className='w-100 input-green'/>
              <textarea name="PostText" placeholder='Post something...' className='w-100 input-green'/>
          </div>
          <button type="submit" className="btn btn-green">Post</button>
        </form>
    )
}