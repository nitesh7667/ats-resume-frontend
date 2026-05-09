import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './components/auth/login.jsx'
import Signup from './components/auth/signup.jsx'
import { Toaster } from 'react-hot-toast'

import ProtectedRoute from './components/protectedRoute.jsx'
import ResumeAnalyzer from './components/ResumeAnalyzer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="/ats" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)