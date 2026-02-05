import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Login from './Login.tsx';
import UserNFC from './UserNFC.tsx';
import UserRedirect from './UserRedirect.tsx';
import EditProfile from './EditProfile.tsx';
import HHL from './HHL.tsx';
import ResetPassword from './ResetPassword.tsx';
import { TermsOfService } from './components/Terms.tsx';
import { PrivacyPolicy } from './components/Privacy.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HHL />} />
        <Route path="/register" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/user-nfc" element={<UserNFC />} />
        <Route path="/user" element={<UserRedirect />} />
        <Route path="/edit_profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
