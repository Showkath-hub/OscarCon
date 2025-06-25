import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FuelEntry from './pages/FuelEntry';
import LoadEntry from './pages/LoadEntry';
import DeliveryEntry from './pages/DeliveryEntry';
import TripHistory from './pages/TripHistory';
import Profile from './pages/Profile';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('driver_id'));

  // Update when driver_id changes (login/logout)
  useEffect(() => {
    const listener = () => setIsLoggedIn(!!localStorage.getItem('driver_id'));
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
      <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

      {isLoggedIn && (
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fuel" element={<FuelEntry />} />
          <Route path="/load" element={<LoadEntry />} />
          <Route path="/deliver" element={<DeliveryEntry />} />
          <Route path="/trips" element={<TripHistory />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
