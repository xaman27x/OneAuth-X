import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, remove, get } from 'firebase/database'; // Import 'remove' to clear data
import app from '../../firebase';

const database = getDatabase(app);

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function postOneTimePass(service, otp, userID) {
  if (!userID || !service) return;
  const userRef = ref(database, `Users/${userID}/${service}`);
  const data = { otp: otp };


  try {
    await set(userRef, data);
    console.log('OTP successfully posted:', otp);
  } catch (error) {
    console.error('Error posting OTP:', error);
  }
}

async function clearOneTimePass(service, userID) {
  if (!userID || !service) return;
  const userRef = ref(database, `Users/${userID}/${service}`);

  try {
    await remove(userRef);
    console.log('OTP cleared for service:', service);
  } catch (error) {
    console.error('Error clearing OTP:', error);
  }
}

const OTP = ({ service, userID, isActive }) => {
  const [currOTP, setCurrOTP] = useState(null);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!userID || !service) return;

    let interval = null;
    let countdown = null;

    if (isActive) {
      // Function to generate and post OTP
      const generateAndPostOTP = () => {
        const otp = getRandomInteger(100000, 999999);
        setCurrOTP(otp);
        setTimer(30); // Reset timer to 30 seconds when OTP is generated
        postOneTimePass(service, otp, userID);
      };

      // Generate initial OTP and post it
      generateAndPostOTP();

      // Set up interval to generate and post OTP every 30 seconds
      interval = setInterval(() => {
        generateAndPostOTP();
      }, 30000);

      // Timer countdown logic
      countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      // Clear OTP from database when toggled off
      setCurrOTP(null);
      clearOneTimePass(service, userID);
    }

    // Cleanup intervals when component unmounts or `isActive` changes
    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [userID, service, isActive]);

  return (
    <div className="flex items-center space-x-4">
      <h2 className='text-2xl text-blue-600 font-bold hover:text-pretty'>
        {currOTP !== null ? currOTP : 'Toggle'}
      </h2>
      {isActive && (
        <p className="text-sm text-gray-500">Time left: {timer}s</p>
      )}
    </div>
  );
};

export default OTP;
