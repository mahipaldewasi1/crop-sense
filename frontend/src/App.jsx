import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import Layout from "./components/Layout";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ScanScreen from "./screens/ScanScreen";
import ResultScreen from "./screens/ResultScreen";
import StoreScreen from "./screens/StoreScreen";
import DiseaseMapScreen from "./screens/DiseaseMapScreen";
import FollowUpMonitoring from "./screens/FollowUpMonitoring";

// Login/register ke bina in screens tak nahi jaane dena
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home" element={<ProtectedRoute><Layout><HomeScreen /></Layout></ProtectedRoute>} />
      <Route path="/scan" element={<ProtectedRoute><Layout><ScanScreen /></Layout></ProtectedRoute>} />
      <Route path="/result" element={<ProtectedRoute><Layout><ResultScreen /></Layout></ProtectedRoute>} />
      <Route path="/store" element={<ProtectedRoute><Layout><StoreScreen /></Layout></ProtectedRoute>} />
      <Route path="/disease-map" element={<ProtectedRoute><Layout><DiseaseMapScreen /></Layout></ProtectedRoute>} />
      <Route
        path="/follow-up"
        element={
          <ProtectedRoute>
            <Layout>
              <FollowUpMonitoring />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
  
    </Routes>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
