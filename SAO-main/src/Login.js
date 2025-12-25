import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase'; // Ensure this path is correct

function Login() {
    const navigate = useNavigate();
    // const auth = getAuth();
    // const firestore = getFirestore();

    const handleSignIn = async () => {
        const provider = new OAuthProvider('microsoft.com');

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const displayName = user.displayName;

            // Extract the university ID from the displayName
            const universityID = displayName.match(/<\s*(\d+)\s*>/)[1];
            console.log('University ID:', universityID);

            // Prepare user data to be stored in Firestore
            const userData = {
                username: user.displayName,
                id: universityID,
                role: 'user'
            };

            // Reference to the user's document in Firestore
            const userDocRef = doc(db, 'users', user.uid);

            // Check if the user document already exists
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                console.log('User already exists in Firestore.');
                // Optionally, update user data here if needed
            } else {
                // Store user data in Firestore if it doesn't already exist
                await setDoc(userDocRef, userData);
                console.log('User added to Firestore.');
            }

            // Navigate to home page after successful sign-in
            navigate('/');
        } catch (error) {
            console.error('Error during sign-in:', error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 relative">
                <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back!</h1>
                <p className="text-gray-600 mb-6 text-center">
                    Sign in with your Microsoft account to continue.
                </p>
                <button 
                    onClick={handleSignIn}
                    className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                    <FontAwesomeIcon icon={faMicrosoft} className='mr-3' size='lg' />
                    Sign in with Microsoft
                </button>
                <p className="text-gray-600 text-center mt-4">
                    Don't have an account? <a href="/signup" className="text-blue-600 font-semibold">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
