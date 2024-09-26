import React, { useState } from 'react';
import bowl from "../../Images/bro.jpg";
import logo from '../../Images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { signUpStart, signUpSuccess, signUpFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.user.loading); // Get loading state from Redux
    const error = useSelector((state) => state.user.error); // Get error state from Redux
    const [formData, setFormData] = useState({
        name: "",
        email: '',
        password: ''
    });
    
    const [popupMessage, setPopupMessage] = useState(''); // State for popup message
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Function to trigger popup
    const triggerPopup = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false); // Hide popup after 3 seconds
        }, 3000);
    };

    async function handleSubmit(e) {
        const { name, email, password } = formData;
        e.preventDefault();
        
        if (!name || !email || !password) {
            triggerPopup("Please fill all the fields"); // Show popup for empty fields
            return;
        }
    
        try {
            dispatch(signUpStart()); // Dispatch sign up start action
            const result = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await result.json(); // Parsing the JSON response
    
            if (data.success === false || !result.ok) { // If the sign-up fails
                dispatch(signUpFailure(data.message || "Sign Up Failed")); // Dispatch failure
                triggerPopup(data.message || "An error occurred during sign up"); // Show error popup
            } else {
                dispatch(signUpSuccess(data)); // Dispatch success if signup was successful
                triggerPopup("Sign Up successful! Redirecting..."); // Show success popup
                setTimeout(() => {
                    navigate('/signin'); // Navigate to signin page after successful signup
                }, 1500);
            }
        } catch (err) {
            dispatch(signUpFailure(err.message)); // Handle error and dispatch failure
            triggerPopup("An error occurred. Please try again."); // Show popup for error
        }
    }
    

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
                <form onSubmit={handleSubmit} className="bg-white flex flex-col gap-2 px-4 py-2 rounded-lg w-[300px]">
                    <h6 className="text-base font-bold mb-2">Sign Up</h6>
                    <div className="mb-4">
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
                        disabled={loading} // Disable button when loading
                        className="w-full bg-[#00643c] text-white font-semibold py-2 px-4 rounded-md hover:bg-green-950 transition duration-200"
                    >
                        {loading ? "Loading.." : "Sign Up"}
                    </button>
                    <OAuth/>
                </form>
            </div>
            <div className='flex justify-center gap-2 mt-1'>
                <p className="text-base font-thin">Already a user?</p>
                <NavLink className="text-[#00643c] underline hover:text-green-950" to="/signin">Sign In</NavLink>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded shadow-lg">
                    {popupMessage}
                </div>
            )}
        </div>
    );
}

export default SignUp;
