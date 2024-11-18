import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../../firebase';
import OTP from '../Snippets/OTP';
import ToggleButton from '../Snippets/ToggleButton';

const auth = getAuth(app);

const ServicesBuilder = ({ Services }) => {
  const servicesArray = Services?.array || [];
  const [toggleStates, setToggleStates] = useState({});

  const handleToggle = (service) => {
    setToggleStates((prevStates) => ({
      ...prevStates,
      [service]: !prevStates[service],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servicesArray.map((service, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{service}</h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Toggle button to control OTP generation */}
            <ToggleButton
              isToggled={toggleStates[service] || false}
              onToggle={() => handleToggle(service)}
            />

            <OTP
              userID={auth.currentUser.uid}
              service={service}
              isActive={toggleStates[service] || false}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesBuilder;
