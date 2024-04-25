import { useNavigate, useParams } from "react-router-dom";
import { url, url2 } from "../../connect2getherUrl.js";

export default function FPemailEntry (){

    const navigate = useNavigate();

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
            <h1 className="text-green">Enter your email</h1>

            <form onSubmit={async (e)=>{
                e.preventDefault();
                e.target.innerHtml = `<div className="spinner-border " role="status">
                    <span className="visually-hidden text-green">Loading...</span>
                </div>`;

                
                await fetch(`${url}/UserProfile/ForgetPassword?email=${e.target.elements.email.value}&url=${url2}/ForgatePassword/?userId=`,{method:"POST"})
                .catch((e)=>{alert("Link expired!"); alert(e)})
                .finally(()=>{
                    alert("Check your email");navigate("../Login")
                })
                
                
            }}>
                <input type="email" id="email" name="email" placeholder="Email" required className="input-green"/>
                <input type="submit" id="SubmitPassword" name="SubmitPassword" value="Submit" className="btn btn-green"/>
            </form>

        </div>
        </div>
    )


}