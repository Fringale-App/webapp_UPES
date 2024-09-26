import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleGoogleClick() {
        try {
            const provider = new GoogleAuthProvider();
            
            // Force Google to show the account selection prompt
            provider.setCustomParameters({ prompt: 'select_account' });

            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/user/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    avatar: result.user.photoURL,
                }),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));
            console.log(data);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full">
            <button
                onClick={handleGoogleClick}
                type="button"
                className="uppercase w-full px-3 py-2 text-white bg-red-700 rounded-md text-center hover:opacity-95"
            >
                Continue with Google
            </button>
        </div>
    );
}

export default OAuth;
