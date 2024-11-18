import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Header from '../components/Headers/Header';
import app from '../firebase';

const auth = getAuth(app);

const PassResetPage = () => {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email).then(() => {
      console.info("Reset link sent to your mail!");
      setResetStatus(true);
    })
    .catch((e) => {
      console.error(e)
    })
  }

  return (
    <>
    <Header />
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
        <h2 className='flex flex-row w-full justify-center text-2xl font-bold mb-5'>Send Reset Link</h2>
        <form className='space-y-6'>
          <label htmlFor='email' className="block text-sm font-medium text-black mb-1">
            Email Address
          </label>
          <input type='email' id='email' value={email} onChange={handleEmailChange} className='text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your Email' />
          <div className='flex flex-col items-center mt-4 justify-center'>
          <button className='w-40 rounded-3xl p-3 justify-center bg-blue-600 text-white' onClick={handleSubmit}>Submit</button>
          {resetStatus && <h2 className='mt-4 font-semibold text-black hover:cursor-pointer hover:opacity-60'>
            A Reset Link has been sent to your mail.
            </h2>
          }
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default PassResetPage;