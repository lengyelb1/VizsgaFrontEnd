import '../css/HomePage.css';
import Logo from './Back4.png';


export default function HomePage () {
    return <div className="bg-dark text-light vh-100 vw-100 mx-auto" data-bs-theme="dark">
        <header className='bg-dark'>
            <div className='d-flex h-25' style={{ background: 'linear-gradient(to bottom, #00ADB5,#A8F231)',borderRadius:'0px 0px 0px 50px', overflow:'hidden'}}>
                <img className='img-fluid' src={Logo} alt="Logo" style={{ width: "100vw", height: "100vh", objectFit:'cover'}}/>
                <div className='fixed-top bg-dark w-50 p-2' style={{borderRadius:'0px 0px 50px 0px'}}>
                    <h1 className='text-green'>Connect 2 Gether</h1>
                    <p><b className='text-green'>Connect</b> with your family, friends, and <b className='text-green'>Share something with them!</b></p>
                </div>

                
                

                <div className='bg-dark fixed-bottom w-25 h-auto p-3' style={{borderRadius:'0px 50px 0px 0px'}}>
                    <a href="Register"><button className="btn btn-green ">Register</button></a>
                    <p className=''>Already has a profile?</p>
                    <a href="Login"><button className="btn btn-green ">Login</button></a>
                </div>
                
            </div>
            
        </header>
    </div>
}