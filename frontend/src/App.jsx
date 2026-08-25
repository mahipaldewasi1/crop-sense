import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PhoneFrame from "./components/PhoneFrame";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ScanScreen from "./screens/ScanScreen";
import ResultScreen from "./screens/ResultScreen";
import StoreScreen from "./screens/StoreScreen";

// Login/register ke bina in screens tak nahi jaane dena
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
      <Route path="/scan" element={<ProtectedRoute><ScanScreen /></ProtectedRoute>} />
      <Route path="/result" element={<ProtectedRoute><ResultScreen /></ProtectedRoute>} />
      <Route path="/store" element={<ProtectedRoute><StoreScreen /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PhoneFrame>
          <AppRoutes />
        </PhoneFrame>
      </BrowserRouter>
    </AuthProvider>
  );
}
