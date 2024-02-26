import './App.css';
import { jwtDecode } from 'jwt-decode';
import HomePage from './Components/HomePage';
import { Route, Routes, BrowserRouter,useNavigate } from 'react-router-dom';
import LoginPageV2 from './Components/loginPage_V2';
import NoAccess from './Components/NoAccess';
import NotFound404 from './Components/NotFound404';
import UserHomePage from './Components/UserHomePage';
import { useEffect } from 'react';
import SignUpPage from './Components/signUpPage';

function App() {
  //const navigate = useNavigate();
  const USER_TYPES = {
    PUBLIC: 'PUBLIC',
    NORMAL_USER: 'Default',
    ADMIN_USER: 'Admin',
  }

  var ROLES  = "None"
  
  

  useEffect(()=> {
    RefreshRole()
    /*switch (ROLES) {
      case "Default":
      navigate("UserHomePage")
      break;
      case "Admin":
      navigate("AdminHomePage")
      break;
    
      default:
        break;
    }*/
  })
  /*
  console.log("Nyers token: "+localStorage.getItem("token"))
  console.log(jwtDecode(localStorage.getItem("token")))
  console.log("Dekódolt token permission: "+jwtDecode(localStorage.getItem("token")).Permission)
  */
  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicElement> <HomePage/> </PublicElement>}></Route>
        <Route path="/Register" element={<PublicElement> <SignUpPage/> </PublicElement>}></Route>
        <Route path="/Login" element={<PublicElement> <LoginPageV2 USER_TYPES = {USER_TYPES}/> </PublicElement>}></Route>
        <Route path="/UserHomePage" element={<UserElement> <UserHomePage/> </UserElement>}></Route>
        <Route path="/AdminHomePage" element={<AdminElement> <h1>Admin</h1> </AdminElement>}></Route>
        <Route path="*" element={<NotFound404/>}></Route>
      </Routes>
    </BrowserRouter>
  );

  function PublicElement({ children })
  {
    return <>{children}</>
  }

  function UserElement({ children })
  {
    RefreshRole()
    if (ROLES === USER_TYPES.NORMAL_USER || ROLES === USER_TYPES.ADMIN_USER)
    {
      return <>{children}</>
    } else
    {
      return <NoAccess/>
    }
  }
  function AdminElement({ children })
  {
    RefreshRole()
    if (ROLES === USER_TYPES.ADMIN_USER)
    {
      return <>{children}</>
    } else
    {
      return <NoAccess/>
    }
  }

  function RefreshRole(){
    if (localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == undefined) {
    }else{
      //ROLES = localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")).Permission : 'Default'
      ROLES = jwtDecode(localStorage.getItem("token")).Permission
    }
  }
}

export default App;

