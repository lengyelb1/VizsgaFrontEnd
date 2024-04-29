import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from '../Back4.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { url, url2 } from '../../connect2getherUrl.js'
import { Alert } from 'react-bootstrap';
import { useState } from 'react';



export default function SignUpPage() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState({});
  let sendData = {

  }
  return (
    <div className="bg-dark text-light vh-100 vw-100 mx-auto" data-bs-theme="dark">
      <div className='d-flex h-25' style={{ background: 'linear-gradient(to bottom, #00ADB5,#A8F231)', borderRadius: '0px 0px 0px 50px', overflow: 'hidden' }}>
        <img className='img-fluid' src={Logo} alt="Logo" style={{ width: "100vw", height: "100vh", objectFit: 'cover' }} />
      </div>
      <div className="d-flex vw-100" style={{ background: '#A8F231' }}>
        <div className="d-flex vw-100" style={{ borderRadius: '0px 50px 0px 0px', overflow: 'hidden' }}>
          <Form className='bg-dark p-2 vw-100' onSubmit={async (e) => {
            e.preventDefault();
            e.target.SubmitButton.innerHTML = `<div className="spinner-border text-green" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>`
            await axios({
              method: 'post',
              url: `${url}/Auth/Register?validationUrl=${url2}/Validation/`,
              data: sendData
            })
              .then((resp) => {
                alert("Check your email for verification link!");
                navigate("../Login")
              })
              .catch((error) => {
                console.log(error)
                if (error.response && error.response.data) {
                  alert(error.response.data)
                }
              })
              .finally(() => {
                e.target.SubmitButton.innerHTML = `Submit`
              })
          }}>
            <Form.Label className='h1'>Sign Up</Form.Label>
            <Form.Group className="mb-3 text-light" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control id="username" type="username" placeholder="Enter username" />
            </Form.Group>
            <div className="mb-3">
              <label for="profileImage" className="form-label">Profile image</label>
              <input onChange={async (e) => {

                const file = e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                await setProfileImage(e.target.files[0])
                sendData = {
                  userName: document.getElementById('username').value,
                  password: document.getElementById('password').value,
                  email: document.getElementById('email').value,
                  profileImage: e.target.files[0]
                }
                console.log(profileImage)
                console.log(e.target.files[0])
                /*
                reader.onload = function () {
                  setProfileImage(reader.result.split(',')[1])
                  console.log(reader.result);
                };
                */
              }} className="form-control form-control-sm" id="profileImage" type="file" />
            </div>
            <Form.Group className="mb-3 text-light" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control id="email" type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control id="password" type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="Dark" name='SubmitButton' className='hover-overlay text-dark fw-bold hover-shadow float-end bg-green' type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>

    </div>
  )
}
