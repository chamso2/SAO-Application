import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct

function Header() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setRole(userDocSnap.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
        setRole(null);
      })
      .catch((error) => {
        console.error('Error during logout:', error.message);
      });
  };

  return (
    <header className="bg-sao-image bg-cover bg-center w-full p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="logo">
            <img src={logo} alt="Logo" className="h-20" />
          </div>
          <div className="flex space-x-4">
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-primary rounded-lg text-white px-4 py-2"
                >
                  Logout
                </button>
                {role === 'admin' && (
                  <Link to="/addEvent">
                    <button className="bg-primary rounded-lg text-white px-4 py-2">
                      Add Event
                    </button>
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login">
                <button className="bg-primary rounded-lg text-white px-4 py-2">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
