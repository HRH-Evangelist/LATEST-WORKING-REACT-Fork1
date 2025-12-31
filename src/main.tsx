import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import Login from './Login.tsx';
import UserNFC from './UserNFC.tsx';
import EditProfile from './EditProfile.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-nfc" element={<UserNFC />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
