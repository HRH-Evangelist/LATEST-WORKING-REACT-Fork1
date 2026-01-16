import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import Login from './Login.tsx';
import UserNFC from './UserNFC.tsx';
import UserRedirect from './UserRedirect.tsx';
import EditProfile from './EditProfile.tsx';
import HHL from './HHL.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-nfc" element={<UserNFC />} />
        <Route path="/user" element={<UserRedirect />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/hhl" element={<HHL />} />
        <Route path="/" element={<Navigate to="/hhl" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
