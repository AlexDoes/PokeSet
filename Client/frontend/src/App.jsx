import MainLayout from "./layouts/MainLayout";
import React, { useEffect } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import CardsList from "./components/CardsList";
import { Home } from "./components/Home";
import CardDirectory from "./components/CardDirectory";
import CardDetail from "./components/CardDetail";
import { GetAllCardsSimple } from "./components/GetAllCardsSimple";
import ErrorPage from "./components/ErrorPage";
import About from "./components/About";
import RandomCard from "./components/RandomCard";

const PrivateRoute = ({ children }) => {
  const { user, token } = useAuth();
  return token && user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { getCurrentUser, token, user } = useAuth();

  useEffect(() => {
    if (token && !user) {
      getCurrentUser();
    }
  }, [token, user]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<CardsList />} />
          <Route path="/cardslist" element={<CardDirectory />} />
          <Route path="/cards/:id" element={<CardDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/random-card" element={<RandomCard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cards" element={<CardsList />} />
            <Route path="/cardslist" element={<CardDirectory />} />
            <Route path="/cards/:id" element={<CardDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/random-card" element={<RandomCard />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </Router>
  );
};

export default App;
