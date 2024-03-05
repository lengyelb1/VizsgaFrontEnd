import { useState, useEffect } from 'react';
import './User/UserHomePage.css';

export default function NoAccess () {
    return (
        <div className="mx-auto text-center bg-dark text-green vh-100">
            <h1 className='display-2 text-shadow-green'>No Access</h1>
            <br/>
            <h1 className='bg-green display-1'>Sorry, you don't have access to this site.</h1>
        </div>
    )
}