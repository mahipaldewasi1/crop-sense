import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import Layout from "./components/Layout";
import ExpertAuthScreen from "./screens/ExpertAuthScreen";
import ExpertDashboard from "./screens/ExpertDashboard";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ScanScreen from "./screens/ScanScreen";
import ResultScreen from "./screens/ResultScreen";
import StoreScreen from "./screens/StoreScreen";
import DiseaseMapScreen from "./screens/DiseaseMapScreen";
import FollowUpMonitoring from "./screens/FollowUpMonitoring";
import ExpertCaseScreen from "./screens/ExpertCaseScreen";
import DiseaseGuide from "./screens/DiseaseGuide";

// Login/register ke bina in screens tak nahi jaane dena
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}
function ExpertRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/expert" replace />;
  }

  if (user.role !== "expert") {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function FarmerRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === "expert") {
    return <Navigate to="/expert/dashboard" replace />;
  }

  return children;
}
function AppRoutes() {
  return (
    <Routes>

      {/* Farmer / Expert entry points */}
      <Route path="/" element={<LoginScreen />} />
      <Route path="/expert" element={<ExpertAuthScreen />} />

      {/* Expert Dashboard */}
      <Route
        path="/expert/dashboard"
        element={
          <ExpertRoute>
            <ExpertDashboard />
          </ExpertRoute>
        }
      />
      <Route
  path="/expert/cases/:scanId"
  element={
    <ProtectedRoute>
      <ExpertCaseScreen />
    </ProtectedRoute>
  }
/>

      {/* Farmer screens */}
      <Route
        path="/home"
        element={
          <FarmerRoute>
            <Layout>
              <HomeScreen />
            </Layout>
          </FarmerRoute>
        }
      />

      <Route
        path="/scan"
        element={
          <FarmerRoute>
            <Layout>
              <ScanScreen />
            </Layout>
          </FarmerRoute>
        }
      />

      <Route
        path="/result"
        element={
          <FarmerRoute>
            <Layout>
              <ResultScreen />
            </Layout>
          </FarmerRoute>
        }
      />

      <Route
        path="/store"
        element={
          <FarmerRoute>
            <Layout>
              <StoreScreen />
            </Layout>
          </FarmerRoute>
        }
      />

      <Route
        path="/disease-map"
        element={
          <FarmerRoute>
            <Layout>
              <DiseaseMapScreen />
            </Layout>
          </FarmerRoute>
        }
      />

      <Route
        path="/follow-up"
        element={
          <FarmerRoute>
            <Layout>
              <FollowUpMonitoring />
            </Layout>
          </FarmerRoute>
        }
      />
     <Route
  path="/disease-guide"
  element={
    <FarmerRoute>
      <DiseaseGuide />
    </FarmerRoute>
  }
/>
      {/* Anything unknown */}
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
