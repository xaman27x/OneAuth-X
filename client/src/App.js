import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PassResetPage from './pages/PassResetPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/forgot-pass' element={<PassResetPage />} />
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
