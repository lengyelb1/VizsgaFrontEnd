import { useState, useEffect } from 'react';
import NewPost from '../Functions/NewPost';
import '../User/UserHomePage.css';
import { jwtDecode } from 'jwt-decode';
import Dropdown from 'react-bootstrap/Dropdown';
import { url } from '../../connect2getherUrl.js';
import { DarkModeBodySetter, DarkModeLogoText, DarkModeSwitch, DisplayDarkModeLogos, LightModeLogoText } from '../Functions/DarkModeFunctions';
import { LikeButton, PostsKi } from '../Functions/UserFunctions';
import { MyNavBarWithSearch } from '../Functions/MyNavBar.js';

export default function UserHomePageV2(){

    const [posts, setPosts] = useState([]);
    const [Allposts, setAllPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [feed,setFeed] = useState();
    const [refrDatas,refreshDatas] = useState(0)

    useEffect(() => {
        DarkModeBodySetter();

        setFetchPending(true);

        fetch(`${url}/UserPost/UserPostWithLike?userId=${jwtDecode(localStorage.getItem("token")).id}`, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`,'content-type': 'application/json'}})
        .then((res) => res.json())
        .then((data) => {
            setFeed(<div><br/><br/><NewPost refreshDatas = {refreshDatas} refrDatas ={refrDatas}/><PostsKi posts={data} refreshDatas={refreshDatas} refrDatas={refrDatas}/></div>);
        })
        .catch(console.log)
        .finally(() => {
            setFetchPending(false);
        });

        

    }, [refrDatas]);

    //UserHomePageV2 returning 
    return(
        <div className='p-2'>
            <MyNavBarWithSearch refrDatas={refrDatas} refreshDatas={refreshDatas} setFetchPending={setFetchPending} setFeed={setFeed} /> 
            <div className="min-vh-100 mx-auto mt-5 ">
                <FeedKi/>
            </div>
        </div>
    )

    function FeedKi () {
        if (isFetchPending) {
            return (
                <div className="spinner-border text-green" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            )
        }
        else {
            return (feed)
        }
    }
}