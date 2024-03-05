import { useEffect, useState } from "react"

export default function SinglePostDisplay(prop){
    const [data,setData] = useState();

    useEffect(()=>{
        fetch(`http://localhost:7043/UserPost/id?id=${prop.id}`,{method:"PUT",headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
        .then((resp)=>{
            setData(resp);
            console.log(data)
        })
    },[]);

    
    return(
        <div>
            <h1>Single display</h1>
        </div>
    )

}