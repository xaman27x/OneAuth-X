import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; 
import { onAuthStateChanged, getAuth } from 'firebase/auth'; 
import app from '../../firebase'; 

const ProtectedRoute = ({ component: Component, redirectTo = '/', ...rest }) => {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default ProtectedRoute;
