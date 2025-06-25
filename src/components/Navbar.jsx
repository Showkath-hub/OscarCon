import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [driverName, setDriverName] = useState('');

  const items = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Fuel', path: '/fuel' },
    { label: 'Load', path: '/load' },
    { label: 'Deliver', path: '/deliver' },
    { label: 'Trips', path: '/trips' },
    { label: 'Profile', path: '/profile' },
  ];

  useEffect(() => {
    const name = localStorage.getItem('driver_name');
    setDriverName(name || 'Driver');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <span className="navbar-brand">Oscar Constructions</span>
        <span className="navbar-user">👷 {driverName}</span>
      </div>

      <div className="navbar-links">
        {items.map((item) => (
          <button
            key={item.path}
            className="nav-btn"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
        <button className="nav-btn logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}
