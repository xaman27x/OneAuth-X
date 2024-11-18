import React, { useState, useEffect } from 'react';
import Header from '../components/Headers/Header';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../firebase';
import ServicesBuilder from '../components/Builders/ServicesBuilder';
import Spinner from '../components/Snippets/Spinner';

const db = getFirestore(app);
const auth = getAuth(app);

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const collectionRef = collection(db, "Services");
        const q = query(collectionRef, where('UserID', '==', auth.currentUser.uid));
        const snapshots = await getDocs(q);

        const fetchedServices = [];
        snapshots.docs.forEach((snapshot) => {
          const data = snapshot.data();
          if (data.Services) {
            fetchedServices.push(...data.Services);
          }
        });

        setServices(fetchedServices);
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <Header />
      
      {/* Display a spinner while loading */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Spinner /> {/* Create a simple spinner component */}
        </div>
      ) : (
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
            Active Services
          </h1>
          {services.length > 0 ? (
            <ServicesBuilder Services={{ array: services }} />
          ) : (
            <div className="text-center text-gray-600 mt-20">
              <p className="text-lg">No services found. Please add some services.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};



export default HomePage;
