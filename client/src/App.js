import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PassResetPage from './pages/PassResetPage';
import CustomisationPage from './pages/CustomisationPage';
import ProtectedRoute from './components/Protected_Routes/ProtectedRoute'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-pass" element={<PassResetPage />} />

        {/* Protected Routes */}
        <Route
          path="/homepage"
          element={<ProtectedRoute component={HomePage} />}
        />
        <Route
          path="/customisation-page"
          element={<ProtectedRoute component={CustomisationPage} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
