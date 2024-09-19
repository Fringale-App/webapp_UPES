import React, { useState, useEffect } from 'react';
import logo from '../../Images/logo.png';
import heart from '../../Images/heart.svg';
import profile from '../../Images/profile.svg';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Handle form submission for search functionality
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search); // URLSearchParams to manage query string
        urlParams.set('searchTerm', searchTerm); // Set search term in URL
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`); // Navigate to the search page with search term
    };

    // Synchronize search term with the URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search); // Corrected 'location' to 'window.location'
        const searchTermFromUrl = urlParams.get('searchTerm'); // Get search term from URL
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl); // Set the search term if found in URL
        }
    }, [window.location.search]); // Dependency array includes 'window.location.search' for URL changes

    // Navigate to the bucket page
    const goToBucket = () => {
        navigate('/bucket');
    };

    return (
        <div>
            <div className="flex min-h-[50px] items-center shadow-md justify-between">
                {/* Bucket icon */}
                <img className="cursor-pointer" src={heart} onClick={goToBucket} alt="Bucket" />

                {/* Logo */}
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-8"
                    />
                </NavLink>

                {/* Profile icon */}
                <NavLink to={currentUser ? "/profile" : "/signin"}>
                    <img className="cursor-pointer w-10 h-10 rounded-full mr-2 object-cover"
                        src={currentUser ? currentUser.avatar : profile}
                        alt={currentUser ? "User Avatar" : "Default Avatar"}
                    />
                </NavLink>
            </div>

            {/* Search Bar */}
            <div className="mt-4 mr-4 ml-4 relative">
                <form onSubmit={handleSubmit}>
                    <button type="submit"> {/* Added 'type="submit"' for better accessibility */}
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </button>

                    <input
                        type="text"
                        value={searchTerm} // Bind input value to searchTerm state
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on change
                        placeholder="What do you want today? (e.g., burger, fries, etc.)"
                        className="w-full pl-10 pr-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </form>
            </div>
        </div>
    );
}

export default Header;
