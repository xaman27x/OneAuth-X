import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, remove, get } from 'firebase/database'; 
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
      const generateAndPostOTP = () => {
        const otp = getRandomInteger(100000, 999999);
        setCurrOTP(otp);
        setTimer(30);
        postOneTimePass(service, otp, userID);
      };

      generateAndPostOTP();

      interval = setInterval(() => {
        generateAndPostOTP();
      }, 30000);

      countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      setCurrOTP(null);
      clearOneTimePass(service, userID);
    }
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
        <div className='flex flex-auto'>
        <p className="flex mr-1 text-sm text-gray-500">Time left:</p>
        <p className="flex text-sm text-gray-500">{timer}s</p>
        </div>
      )}
    </div>
  );
};

export default OTP;
