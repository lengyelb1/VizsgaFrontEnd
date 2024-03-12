import { useState, useEffect } from 'react';
import './User/UserHomePage.css';


export default function NotFound404 () {
    return (
    <div className="mx-auto text-center bg-dark text-green vh-100">
        <h1 className='display-2 text-shadow-green'>Not Found</h1>
        <br/>
        <h1 className='bg-green display-1'>404</h1>
    </div>
    
    )
}