import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';
import app from '../firebase';
import ServicesBuilder from '../components/Builders/ServicesBuilder';
import Spinner from '../components/Snippets/Spinner';
import { FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const db = getFirestore(app);
const auth = getAuth(app);

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('Anonymous');
  const [user, setUser] = useState(null); 
  const [userImageUri, setUserImageUri] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
        fetchServices(currentUser.uid);
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId) => {
    try {
      const userCollectionRef = collection(db, "Users");
      const userQuery = query(userCollectionRef, where('UserID', '==', userId));
      const userSnapshots = await getDocs(userQuery);
      userSnapshots.docs.forEach((snapshot) => {
        setName(snapshot.data().Name);
        setUserImageUri(snapshot.data().avatar);
      });
    } catch (e) {
      console.error("An Error Occurred: ", e);
    }
  };

  const fetchServices = async (userId) => {
    try {
      const collectionRef = collection(db, "Services");
      const q = query(collectionRef, where('UserID', '==', userId));
      const snapshots = await getDocs(q);

      const fetchedServices = [];
      snapshots.docs.forEach((snapshot) => {
        const data = snapshot.data();
        if (data.Services) {
          fetchedServices.push(...data.Services);
        }
      });

      setServices(fetchedServices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  const redirectToCustomisationPage = () => {
    navigate('/customisation-page');
    console.log("User Redirected");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-600 to-indigo-700 relative text-white font-sans">
      <motion.div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl text-gray-800 transition-transform transform ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: drawerOpen ? 1 : 0, x: drawerOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-3xl font-bold">Profile</h2>
            <button
              className="text-xl hover:text-red-600 transition"
              onClick={() => setDrawerOpen(false)}
            >
              ✖
            </button>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            {userImageUri != '' && <img className="text-4xl text-gray-600 rounded-full w-16 h-16" src={userImageUri}/>}
            {userImageUri == '' && <FiUser className="text-4xl text-gray-600"/>}
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-500">{auth.currentUser?.email}</p>
            </div>
          </div>
          <div className='flex items-center justify-center space-x-4 mb-6'>
            <p className='text-xl text-gray-700 hover:underline hover:cursor-pointer hover:text-blue-500' onClick={redirectToCustomisationPage}>Customise your Profile</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full bg-blue-500 hover:bg-red-600 text-white py-3 rounded-md mt-4 transition"
          >
            <FiLogOut className="inline-block mr-2"/> Sign Out
          </button>
        </div>
      </motion.div>

      {/* drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <motion.header
        className="flex justify-between items-center p-5 bg-transparent absolute top-0 left-0 right-0 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className='flex flex-col' style={{ fontFamily: 'Saira Stencil One'}}>
          <h1 className="text-4xl font-bold">OneAuthX</h1>
          <h1 className='ml-5 font-light'>Simply Secure.</h1>
        </div>
        <button
          className="text-3xl text-white hover:text-gray-300 transition"
          onClick={() => setDrawerOpen(true)}
        >
          <FiMenu />
        </button>
      </motion.header>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Spinner />
          </motion.div>
        </div>
      ) : (
        <div className="container mx-auto px-8 py-20">
          <motion.h1
            className="mt-8 text-4xl font-bold text-center mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ fontFamily: 'Saira Stencil One'}}
          >
            Your Active Services
          </motion.h1>

          {/* Services List */}
          {services.length > 0 ? (
            <ServicesBuilder Services={{ array: services }} />
          ) : (
            <div
              className="text-center text-white mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg">No services found. Please add some services.</p>
            </div>
          )}
        </div>
      )}
      <footer className="bg-transparent py-8 text-center mt-10">
        <div className="flex justify-center items-center space-x-3">
          {/* GitHub SVG Icon */}
          <a
            href="https://github.com/xaman27x"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="32"
              height="32"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.614-4.042-1.614-.546-1.387-1.334-1.756-1.334-1.756-1.09-.744.084-.729.084-.729 1.204.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.997.108-.775.42-1.305.763-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.47-2.381 1.236-3.221-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.403c1.018.005 2.043.138 3.003.403 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.24 2.873.117 3.176.765.84 1.236 1.911 1.236 3.221 0 4.61-2.804 5.624-5.476 5.92.432.372.815 1.103.815 2.222 0 1.604-.014 2.896-.014 3.293 0 .32.218.694.825.576C20.565 21.795 24 17.297 24 12 24 5.373 18.627 0 12 0z" />
            </svg>
          </a>
          <p className="text-white font-semibold text-lg">Developed by Aman Morghade</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
