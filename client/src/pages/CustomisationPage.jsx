import React, { useEffect, useState } from 'react';
import app from '../firebase'; // Assuming you have Firebase configuration here
import { createClient } from '@supabase/supabase-js';
import { getFirestore, collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { Avatar, Button, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Header from '../components/Headers/Header';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const db = getFirestore(app);
const auth = getAuth(app);
const supabaseUrl = "https://khbpumgtlccpgjkhhetq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYnB1bWd0bGNjcGdqa2hoZXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NzkyNjgsImV4cCI6MjA0NzM1NTI2OH0.QAwkiaj4-PL7SkzjCL076zr2CVxExhLuSS5mHYzwmT0";
const supabase = createClient(supabaseUrl, supabaseKey);

const Container = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  margin: 'auto',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  backgroundColor: theme?.palette?.background?.paper || '#fff',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '10px',
  backgroundColor: theme?.palette?.primary?.main || '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: theme?.palette?.primary?.dark || '#115293',
  },
}));

const CustomisationPage = () => {
  const [userData, setUserData] = useState({});
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const q = query(collection(db, 'Users'), where('UserID', '==', auth.currentUser.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setUserData(userDoc.data());
            setAvatarUrl(userDoc.data().avatar || '');
          } else {
            console.error('User not found!');
          }
        } else {
          console.error('No user logged in');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [currentUser]);

  const handlePhotoUpdate = async (event) => {
    const file = event.target.files[0];
    if (!file || !currentUser) return;
  
    try {
      const userDocQuery = query(collection(db, 'Users'), where('UserID', '==', currentUser.uid));
      const userSnapshot = await getDocs(userDocQuery);
      const userData = userSnapshot.docs[0].data();
      if(userData.filePath) await supabase.storage.from('user').remove(userData.filePath).catch((e) => {
        console.log("An Error Occured: " + e);
      })
      const fileName = `${currentUser.uid}-${Date.now()}`;
      setLoading(true);
      const { data, error: uploadError } = await supabase.storage
        .from('user')
        .upload(fileName, file);
  
      if (uploadError) throw uploadError;
  
      console.log('File uploaded successfully:', data);
  
      const publicUrl = "https://khbpumgtlccpgjkhhetq.supabase.co/storage/v1/object/public/user/" + fileName;
  
      console.log('Attempting to get public URL...');
      console.log('File Name:', fileName);
      console.log('Public URL:', publicUrl);

  
      if (!publicUrl) {
        throw new Error('Failed to retrieve the public URL');
      }
  
      setAvatarUrl(publicUrl);  
  
  
      if (!userSnapshot.empty) {
        const userDocRef = userSnapshot.docs[0].ref;
        await setDoc(userDocRef, { avatar: publicUrl, filePath: fileName }, { merge: true });
        alert('Avatar updated successfully!');
      } else {
        alert('User not found in Firestore');
      }
  
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert(`Failed to upload avatar: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const gotoHomePage = () => {
    navigate('/homepage');
  }

  return (
    <>
      <Header isRoot={false} onBack={gotoHomePage}/>
      <Container>
        <Typography variant="h4" gutterBottom>
          Customize Your Profile
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Update your avatar and personal information.
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
          <Avatar
            src={avatarUrl}
            alt="User Avatar"
            sx={{ width: 120, height: 120, marginBottom: '16px' }}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                style={{ display: 'none' }}
                onChange={handlePhotoUpdate}
              />
              <label htmlFor="fileUpload">
                <StyledButton component="span" variant="contained">
                  Upload New Photo
                </StyledButton>
              </label>
            </>
          )}
        </Box>
        <Typography variant="h6" mt={4}>
          {userData.Name || 'User Name'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {userData.EmailID || 'user@example.com'}
        </Typography>
      </Container>
    </>
  );
};

export default CustomisationPage;
