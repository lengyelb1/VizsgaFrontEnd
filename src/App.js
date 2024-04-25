import './App.css';
import { jwtDecode } from 'jwt-decode';
import HomePage from './Components/Public/HomePage';
import { Route, Routes, BrowserRouter,useNavigate } from 'react-router-dom';
import LoginPageV2 from './Components/Public/loginPage_V2';
import NoAccess from './Components/Public/NoAccess';
import NotFound404 from './Components/Public/NotFound404';
import { useEffect } from 'react';
import SignUpPage from './Components/Public/signUpPage';
import AdminHomePage from './Components/Admin/AdminHomePage';
import AdminPutSingleUser from './Components/Admin/AdminPutSingleUser';
import AdminDeleteUser from './Components/Admin/AdminDeleteUser';
import ProfilePage from './Components/User/ProfilePage';
import SinglePostDisplay from './Components/User/SinglePostDisplay';
import AdminSinglePost from './Components/Admin/AdminSinglePost';
import UserHomePageV2 from './Components/User/UserHomePage_V2';
import ValidationSite from './Components/Public/ValidationSite';
import ChangePassword from './Components/User/ChangePassword';
import ChangeUsernameEmail from './Components/User/ChangeUsernameEmail';
import SingleDisplayUser from './Components/User/SingleDisplayUser';
import PostChange from './Components/User/PostChange';
import CommentChange from './Components/User/CommentChange';
import DeletePost from './Components/User/DeletePost';
import DeleteComment from './Components/User/DeleteComment';
import FPemailEntry from './Components/Functions/FPemailEntry';
import FPPasswordEntry from './Components/Functions/FPPasswordEntry';

function App() {
  //const navigate = useNavigate();
  const USER_TYPES = {
    PUBLIC: 'PUBLIC',
    NORMAL_USER: 'Default',
    ADMIN_USER: 'Admin',
  }

  var ROLES  = "None"
  
  useEffect(()=> {

    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode",0)
    }

    RefreshRole()    
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicElement> <HomePage/> </PublicElement>}></Route>
        <Route path="/Register" element={<PublicElement> <SignUpPage/> </PublicElement>}></Route>
        <Route path="/Login" element={<PublicElement> <LoginPageV2 USER_TYPES = {USER_TYPES}/> </PublicElement>}></Route>
        <Route path="/UserHomePage" element={<UserElement> <UserHomePageV2/> </UserElement>}></Route>
        <Route path="/SinglePostDisplay/:id" element={<UserElement> <SinglePostDisplay/> </UserElement>}></Route>
        <Route path="/ProfilePage" element={<UserElement> <ProfilePage/> </UserElement>}></Route>
        <Route path="/ChangePassword" element={<UserElement> <ChangePassword/> </UserElement>}></Route>
        <Route path="/ChangeUsernameEmail" element={<UserElement> <ChangeUsernameEmail/> </UserElement>}></Route>
        <Route path="/SingleDisplayUser/:id" element={<UserElement> <SingleDisplayUser/> </UserElement>}></Route>
        <Route path="/PostChange/:id" element={<UserElement> <PostChange/> </UserElement>}></Route>
        <Route path="/CommentChange/:id" element={<UserElement> <CommentChange/> </UserElement>}></Route>
        <Route path="/DeletePost/:id" element={<UserElement> <DeletePost/> </UserElement>}></Route>
        <Route path="/DeleteComment/:id" element={<UserElement> <DeleteComment/> </UserElement>}></Route>
        <Route path="/ForgatePasswordEmail" element={<PublicElement> <FPemailEntry/> </PublicElement>}></Route>
        <Route path="/ForgatePassword" element={<PublicElement> <FPPasswordEntry/> </PublicElement>}></Route>

        <Route path="/AdminHomePage" element={<AdminElement> <AdminHomePage/> </AdminElement>}></Route>
        <Route path='/AdminPutSingleUser/:id' element={<AdminElement> <AdminPutSingleUser/> </AdminElement>}></Route>
        <Route path='/AdminSinglePost/:id' element={<AdminElement> <AdminSinglePost/> </AdminElement>}></Route>
        <Route path='/AdminDeleteUser/:id' element={<AdminElement> <AdminDeleteUser/> </AdminElement>}></Route>
        <Route path='/Validation/:key' element={<PublicElement> <ValidationSite/> </PublicElement>}></Route>
        <Route path="*" element={<NotFound404/>}></Route>
      </Routes>
    </BrowserRouter>
  );

  function PublicElement({ children })
  {
    RefreshRole()
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
      try {
        ROLES = jwtDecode(localStorage.getItem("token")).role        
      } catch (error) {
        
      }
    }
  }
}

export default App;

