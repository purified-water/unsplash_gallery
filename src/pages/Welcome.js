import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/unsplash.png'
import '../App.css';

function Welcome() {
    return (
        <div className='home_page'>
            <img className='app_logo' src={logo} alt="Unsplash Logo" />
            <h1>Unsplash Photo Gallery</h1>
            <text>Made by Nguyen Phuoc Anh Tuan - 21120588</text>
            <Link className="view_button" to="/photos">View Photos</Link>
        </div>
    )
}

export default Welcome