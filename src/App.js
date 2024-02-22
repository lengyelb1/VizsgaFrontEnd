import './App.css';
import { jwtDecode } from 'jwt-decode';
import HomePage from './Components/HomePage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPageV2 from './Components/loginPage_V2';
import NoAccess from './Components/NoAccess';
import NotFound404 from './Components/NotFound404';

function App() {

  const USER_TYPES = {
    PUBLIC: 'PUBLIC',
    NORMAL_USER: 'Default',
    ADMIN_USER: 'ADMIN',
  }

  const ROLES = localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")).role : 'Default'

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicElement> <HomePage/> </PublicElement>}></Route>
        <Route path="/Login" element={<PublicElement> <LoginPageV2/> </PublicElement>}></Route>
        <Route path="/User" element={<UserElement> <h1>User</h1> </UserElement>}></Route>
        <Route path="/Admin" element={<AdminElement> <h1>Admin</h1> </AdminElement>}></Route>
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
    if (ROLES === USER_TYPES.ADMIN_USER)
    {
      return <>{children}</>
    } else
    {
      return <NoAccess/>
    }
  }
}

export default App;

