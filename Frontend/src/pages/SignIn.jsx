import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import kitchen from "../../Images/kitchen.jpg";
import logo from '../../Images/logo.png';
import OAuth from '../components/OAuth';

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [popupMessage, setPopupMessage] = useState(''); // Error message state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                setPopupMessage(data.message);  // Set error message in popup
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            setPopupMessage(error.message);  // Set error message if there's an issue
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div>
            {/* Popup Message */}
            {popupMessage && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white px-6 py-4 rounded shadow-lg">
                        <p className="text-red-500 font-semibold">{popupMessage}</p>
                        <button
                            onClick={() => setPopupMessage('')}
                            className="mt-4 bg-[#00643c] text-white py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full mt-2 h-[180px]">
                <img className='w-full h-full' src={kitchen} alt="" />
            </div>
            <div className='w-full h-[37px] flex justify-center items-center mt-4'>
                <div className='w-[146px] h-full'>
                    <img className='w-full h-full' src={logo} alt="" />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="bg-white px-4 flex flex-col gap-2 py-2 rounded-lg w-[300px]">
                    <h6 className="text-base font-bold mb-2">Sign In</h6>
                    <div className="mb-4">
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
                        Sign In
                    </button>
                    <OAuth/>
                </form>
            </div>
            <div className='flex justify-center gap-2 mt-1'>
                <p className="text-base font-thin">If you are a new user?</p>
                <NavLink className="text-[#00643c] underline hover:text-green-950" to="/signup">Sign Up</NavLink>
            </div>
        </div>
    );
}

export default SignIn;
