import React from 'react'
import bowl from "../../Images/bro.jpg"
import logo from '../../Images/logo.png'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


function SignUp() {
    const [formData, setFormData] = useState({
        name:"",
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Email:', formData.email);
        console.log('Password:', formData.password);
        // You can add further actions like API calls here
    };
    return (
        <div>
            <div className="w-full mt-2 h-[180px]">
                <img className='w-full object-cover h-full' src={bowl} alt="" />
            </div>
            <div className='w-full h-[37px] flex justify-center items-center mt-4'>
                <div className='w-[146px] h-full'>
                    <img className='w-full h-full' src={logo} alt="" />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="bg-white px-4 py-2 rounded-lg w-[300px]">
                    <h6 className="text-base font-bold mb-2">Sign Up</h6>
                    <div className="mb-4">
                        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Gmail
                </label> */}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00643c]"
                            placeholder="Enter your Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Gmail
                </label> */}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00643c]"
                            placeholder="Enter your Gmail"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label> */}
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00643c]"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#00643c] text-white font-semibold py-2 px-4 rounded-md hover:bg-green-950 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            <div className='flex justify-center gap-2 mt-1'>
                <p className="text-base font-thin">Already a user?</p>
                <NavLink className="text-[#00643c] underline hover:text-green-950" to="/signin">Sign In</NavLink>
            </div>

        </div>
    )
}

export default SignUp