import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from './Back4.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


export default function LoginPageV2 (props) {
    const navigate = useNavigate();
    return (
    <div className="bg-dark text-light vh-100 vw-100 mx-auto" data-bs-theme="dark">
        <div className='d-flex h-25' style={{ background: 'linear-gradient(to bottom, #00ADB5,#A8F231)',borderRadius:'0px 0px 0px 50px', overflow:'hidden'}}>
          <img className='img-fluid' src={Logo} alt="Logo" style={{ width: "100vw", height: "100vh", objectFit:'cover'}}/>
        </div>
        <div className="d-flex vw-100" style={{ background: '#A8F231'}}>
          <div className="d-flex vw-100" style={{ borderRadius:'0px 50px 0px 0px', overflow:'hidden'}}>
              <Form className='bg-dark p-2 vw-100 ' onSubmit={(e)=>{
                e.preventDefault();
                axios({
                  method: 'post',
                  url: 'http://localhost:7043/Auth/login',
                  data: {
                    userName: document.getElementById('username').value,
                    password: document.getElementById('password').value
                  }
                })
                .then((resp) => {
                  if (resp.name =="AxiosError") {
                    return (alert(resp.response.data))
                  }else{
                    localStorage.setItem("token",resp.data);

                    if (jwtDecode(localStorage.getItem("token")).role == props.USER_TYPES.ADMIN_USER) {
                      navigate("/AdminHomePage");                      
                    }else{
                      navigate("/UserHomePage");
                    }
                    
                    
                    /*
                    if (jwtDecode(resp.response.data).Permission == props.USER_TYPES.NORMAL_USER) {
                      navigate("/UserHomePage");
                    }else if (jwtDecode(resp.response.data).Permission == props.USER_TYPES.ADMIN_USER) {
                      navigate("/AdminHomePage");
                    }*/
                  }
                })
                .catch((error)=> {
                  console.log(error)
                })
              }}>
                <Form.Label className='h1'>Login</Form.Label>
                <Form.Group className="mb-3 text-light" controlId="formBasic">
                  <Form.Label>Username</Form.Label>
                  <Form.Control id='username' name='username' type="username" placeholder="Enter username"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control id='password' name='password' type="password" placeholder="Password"/>
                  <Form.Text >
                    <a href='' className="text-muted">Forgot your password?</a>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Text >
                    <p>Don't have a profile?  <a href='/Register' className="text-muted fw-bold">Sign Up</a></p>
                  </Form.Text>
                </Form.Group>
                <Button variant="Dark" className='hover-overlay text-dark fw-bold hover-shadow float-end' type="submit" style={{background: '#A8F231'}}>
                  Submit
                </Button>
              </Form>
          </div>
        </div>
        
    </div>
    )
}