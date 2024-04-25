import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../connect2getherUrl.js";

export default function FPPasswordEntry (){
    var params = useParams();

    return (
        <div className=''>
        <nav className={`navbar row p-2 text-green border-bottom-green fixed-top shadow bg-dark text-light`}>
            <div className='nav-item col-lg-4 col-sm-0'>
                <h3 className="navbar-brand text-green">Connect2Gether</h3>
            </div>
        </nav>
        <div className="mt-5 bg-dark text-light col-12 vh-100 text-center">
            <br/>
            <br/>
            <h1 className="text-green">Enter your new password</h1>

            <form onSubmit={async (e)=>{
                e.preventDefault();
                e.target.innerHtml = `<div className="spinner-border " role="status">
                    <span className="visually-hidden text-green">Loading...</span>
                </div>`;

                if (e.target.elements.password.value != e.target.elements.passwordAgain.value){
                    alert("Passwords don't match!")
                    
                }else{
                    await fetch(`${url}/UserProfile/ForgetPassword2?userId=${params.userId}`,{method:"PUT",body:{
                        "password": e.target.elements.password.value,
                    }})
                    .catch((e)=>{alert("Link expired!")})
                    .finally(()=>{
                        alert("Password changed");navigate("../Login")
                    })
                }
                
            }}>
                <input type="text" id="password" name="password" placeholder="Password" required/>
                <input type="text" id="passwordAgain" name="passwordAgain" placeholder="Password Again" required/>
                <input type="submit" id="SubmitPassword" name="SubmitPassword" value="Submit" className="btn btn-green"/>
            </form>

        </div>
        </div>
    )


}