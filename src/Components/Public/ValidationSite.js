import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../connect2getherUrl.mjs";

export default function ValidationSite(){
    const params = useParams();
    const navigate = useNavigate();
    if (params.key == null) {
        navigate("*");
    }else{
        return(
            <div className=''>
                <nav className={`navbar row p-2 text-green border-bottom-green fixed-top shadow bg-dark text-light`}>
                    <div className='nav-item col-lg-4 col-sm-0'>
                        <h3 className="navbar-brand text-green">Connect2Gether</h3>
                    </div>
                </nav>
                <div className="mt-5 bg-dark text-light col-12 vh-100 text-center">
                    <br/>
                    <br/>
                    <h1 className="text-green">Press to validate the user</h1>
                    <input type="button" name="ValidateButton" className="btn btn-green" value="Validate" onClick={async (e)=>{
                        e.preventDefault();
                        e.target.innerHtml = `<div className="spinner-border " role="status">
                            <span className="visually-hidden text-green">Loading...</span>
                        </div>`;
                        await fetch(`${url}/Auth/ValidatedUser?key=${params.key}`,{method:"PUT"})
                        .catch((e)=>{alert("Validation expired!")})
                        .finally(()=>{
                            alert("User validated");navigate("../Login")
                        })
                    }}/>
                </div>
            </div>
        )
    }
    
}