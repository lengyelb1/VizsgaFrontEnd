import { useState } from 'react';
import '../../css/HomePage.css';
import Logo from '../Back4.png';
import Toast from 'react-bootstrap/Toast';

export default function HomePage () {
    const [showA, setShowA] = useState(true);
        
    const toggleShowA = () => setShowA(!showA);


    return (
        <div className="bg-dark text-light vh-100 vw-100 mx-auto" data-bs-theme="dark">
            <header className='bg-dark'>
                <div className='d-flex h-25'  style={{ background: 'linear-gradient(to bottom, #00ADB5,#A8F231)',borderRadius:'0px 0px 0px 50px', overflow:'hidden'}}>
                    <img id='background' className='img-fluid' src={Logo} alt="Logo" style={{ width: "100vw", height: "100vh", objectFit:'cover'}}/>
                    <div className='fixed-top bg-dark w-50 p-2' style={{borderRadius:'0px 0px 50px 0px'}}>
                        <h1 className='text-green'>Connect 2 Gether</h1>
                        <p><b className='text-green'>Connect</b> with your family, friends, and <b className='text-green'>Share something with them!</b></p>

                    </div>

                    <div className='bg-dark fixed-bottom col-lg-3 col-sm-4 h-auto p-3' style={{borderRadius:'0px 50px 0px 0px'}}>
                        <a href="Register"><button className="btn btn-green ">Register</button></a>
                        <p className=''>Already has a profile?</p>
                        <a href="Login"><button className="btn btn-green ">Login</button></a>
                    </div>
                    <div className='position-fixed bottom-0 end-0 p-3'>
                        <Cookies/>
                    </div>
                </div>

            </header>
            
        </div>
    )

    

    function Cookies() {
        return (
            <Toast show={showA} onClose={toggleShowA} style={{backgroundColor:'#c79152'}}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Cookies🍪</strong>
              <small></small>
            </Toast.Header>
            <Toast.Body>Just to warn you, we are use cookies! </Toast.Body>
          </Toast>
        );
      }
    }
/*
document.addEventListener("mousemove",parallax);
document.addEventListener("mouseenter",parallax);
document.addEventListener("mouseleave",parallax);


function parallax(e){
        const back = document.getElementById("background");
        console.log(back)
        const speed = 2;

        const x = ((window.innerWidth - e.pageX*speed)/30);
        const y = ((window.innerWidth - e.pageY*speed)/30);
        back.style.transform = `translateX(${x}px) translateY(${y}px)`;
}
*/