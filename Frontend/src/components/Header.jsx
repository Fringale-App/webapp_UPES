import React from 'react'
import logo from '../../Images/logo.png';
import heart from '../../Images/heart.svg';
import profile from '../../Images/profile.svg';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';


function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
      }, [location.search]);

      const goToBucket = () => {
        navigate('/bucket');
    };

    return (
        <div>
            <div className="flex min-h-[50px] items-center shadow-md justify-between">
                <img className="cursor-pointer" src={heart} onClick={goToBucket} alt="" />
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-8"
                    />
                </NavLink>
                <NavLink to="/signin">
                    <img className="cursor-pointer" src={profile} />

                </NavLink>
              
                
            </div>
            <div className="mt-4 mr-4 ml-4 relative">
                <form onSubmit={handleSubmit}>
                    <button>
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </button>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        placeholder="what do you want today? (eg: burger, fries etc)"
                        className="w-full pl-10 pr-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                </form>

            </div>
        </div>
    )
}

export default Header