import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../Back4.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Toast from 'react-bootstrap/Toast';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {url, url2} from '../../connect2getherUrl.js'


export default function LoginPageV2 (props) {
    const navigate = useNavigate();

    const [showA, setShowA] = useState(false);
    const [_error, setError] = useState();
    const [inputEmpty, setInputEmpty] = useState(true);
        
    const toggleShowA = () => setShowA(!showA);
    return (
    <div className="bg-dark text-light vh-100 vw-100 mx-auto" data-bs-theme="dark">
        <div className='d-flex h-25' style={{ background: 'linear-gradient(to bottom, #00ADB5,#A8F231)',borderRadius:'0px 0px 0px 50px', overflow:'hidden'}}>
          <img className='img-fluid' src={Logo} alt="Logo" style={{ width: "100vw", height: "100vh", objectFit:'cover'}}/>
        </div>
        <div className="d-flex vw-100" style={{ background: '#A8F231'}}>
          <div className="d-flex vw-100" style={{ borderRadius:'0px 50px 0px 0px', overflow:'hidden'}}>
              <Form className='bg-dark p-2 vw-100 ' onSubmit={(e)=>{
                e.preventDefault();
                if(document.getElementById('username').value == "" || document.getElementById('password').value == ""){
                  setInputEmpty(true)
                  toggleShowA()
                }else{
                  e.target.elements.loginButton.disabled = true
                  e.target.elements.loginButton.innerHTML = `<div className="spinner-border " role="status">
                      <span className="visually-hidden text-green">Loading...</span>
                  </div>`
                  fetch(`${url}/Auth/Login`,{method:"POST",headers:{"Content-Type": "application/json"}, body: JSON.stringify({
                    userName: document.getElementById('username').value,
                    password: document.getElementById('password').value
                  })})
                  .then((resp) => resp.text())
                  .then((data) => {
                    
                    localStorage.setItem("token",data);
  
                    navigate("/AdminHomePage");


                    if (jwtDecode(localStorage.getItem("token")).role == props.USER_TYPES.ADMIN_USER) {
                      navigate("/AdminHomePage");                      
                    }else{
                      navigate("/UserHomePage");
                    }
                    
                      
                    
                  })
                  .catch((error)=> {
                    console.log(error)
                    setError(error)
                    toggleShowA()
                  })
                  .finally(()=>{
                    e.target.elements.loginButton.disabled = false
                    e.target.elements.loginButton.innerHTML = `Submit`
                  })
                }
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
                    <a href={`./ForgatePasswordEmail`} className="text-muted">Forgot your password?</a>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Text >
                    <p>Don't have a profile?  <a href='/Register' className="text-muted fw-bold">Sign Up</a></p>
                  </Form.Text>
                </Form.Group>
                <Button variant="Dark" id='loginButton' name='loginButton' className='hover-overlay text-dark fw-bold hover-shadow float-end' type="submit" style={{background: '#A8F231'}}>
                  Submit
                </Button>
              </Form>
          </div>
          
        </div>
        <div className='float-end'>
          <MyToast header = "Alert!" error={_error}></MyToast>
        </div>
    </div>
    )

    function MyToast(params) {
      if (params.error) {
        return (
          <Toast show={showA} onClose={toggleShowA} className='bg-danger'>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{params.header}</strong>
          </Toast.Header>
          <Toast.Body>Something went wrong!</Toast.Body>
        </Toast>
        );
      }else if (inputEmpty){
        return (
          <Toast show={showA} onClose={toggleShowA} className='bg-warning'>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{params.header}</strong>
          </Toast.Header>
          <Toast.Body>Please enter the username and password</Toast.Body>
        </Toast>
        );
      }else{
        return (
          <Toast show={showA} onClose={toggleShowA} className='bg-danger'>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{params.header}</strong>
          </Toast.Header>
          <Toast.Body>Unknown</Toast.Body>
        </Toast>
        );
      }
      
      
    }
    
}

