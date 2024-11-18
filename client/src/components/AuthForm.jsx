import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase'; 
import { getFirestore, collection, addDoc, query, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";


const auth = getAuth(app);
const db = getFirestore(app);
const userRef = collection(db, "Users");

const AuthForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 

    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          console.log('Logged in:', userCred.user.email);
          navigate('/homepage');
        })
        .catch((err) => {
          setError('Login failed. Please check your credentials.');
          console.error(err);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          console.log('Registered:', userCred.user.email);
          let userData = {
            'UserID': userCred.user.uid,
            'EmailID': email
          };
          addDoc(userRef, userData);
        })
        .catch((err) => {
          setError('Registration failed. Please check your details.');
          console.error(err);
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              value={email}
              onChange={handleEmailChange}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="flex justify-center items-center mt-6">
          <p className="text-sm text-gray-600 mr-4">
            {isLogin ? 'New User?' : 'Already Signed In?'}
          </p>
          <a
            href="#"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium text-blue-600 hover:underline cursor-pointer"
          >
            {isLogin ? 'Register' : 'Login'}
          </a>
        </div>
        <div className='flex flex-row items-center justify-center mt-3'>
          <p className='text-sm text-gray-600 mr-4'>Forgot Password?</p>
          <a onClick={() => {
            navigate('/forgot-pass');
          }}
          className='text-sm font-medium text-blue-600 hover:underline cursor-pointer'
          >Click Here
          </a>
          </div>
      </div>
    </div>
  );
};

export default AuthForm;
