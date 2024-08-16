import React from 'react'
import logo from '../../Images/logo.png';
import heart from '../../Images/heart.svg';
import profile from '../../Images/profile.svg';
function Header() {
    return (
        <div className="flex min-h-[50px] items-center shadow-md justify-between">
            <img src={heart} alt="" />
            <img
                src={logo}
                alt="Logo"
                className="h-8"
            />
            <img src={profile} />
        </div>
    )
}

export default Header