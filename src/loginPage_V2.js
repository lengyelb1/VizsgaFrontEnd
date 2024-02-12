import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Logo from './Back4.png';

const LoginPageV2 = () => {

    return (
    <div className="bg-dark text-light vh-100 vw-100 mx-auto" data-bs-theme="dark">
        <div className='d-flex h-25' style={{ background: 'linear-gradient(to bottom, #00ADB5,#A8F231)',borderRadius:'0px 0px 0px 50px', overflow:'hidden'}}>
          <img className='img-fluid' src={Logo} alt="Logo" style={{ width: "100vw", height: "100vh", objectFit:'cover'}}/>
        </div>
        <div className="d-flex vw-100" style={{ background: '#A8F231'}}>
          <div className="d-flex vw-100" style={{ borderRadius:'0px 50px 0px 0px', overflow:'hidden'}}>
              <Form className='bg-dark p-2 vw-100 ' >
                <Form.Label className='h1'>Login</Form.Label>
                <Form.Group className="mb-3 text-light" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"/>
                  <Form.Text >
                    <a href='' className="text-muted">Forgot your password?</a>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Text >
                    <p>Don't have a profile?  <a href='' className="text-muted fw-bold">Sign Up</a></p>
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

export default LoginPageV2;