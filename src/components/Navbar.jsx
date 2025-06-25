import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/oscarlogo.png'; // ensure this file exists

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [driverName, setDriverName] = useState('Driver');
  const [profileUrl, setProfileUrl] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('driver_name');
    const url = localStorage.getItem('profile_url');
    if (name) setDriverName(name);
    if (url) setProfileUrl(url);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="nav-header">
        <div className="nav-brand">
          <img src={logo} alt="Oscar" className="brand-logo" />
          <span className="brand-text">OSCAR CONSTRUCTIONS</span>
        </div>

        <img
          src={profileUrl || 'https://via.placeholder.com/40'}
          alt="Profile"
          className="profile-icon"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Side Drawer */}
      <div className={`side-menu ${open ? 'open' : ''}`}>
        <div className="menu-top">
          <img
            src={profileUrl || 'https://via.placeholder.com/80'}
            alt="Driver"
            className="driver-pic"
          />
          <p className="driver-name">👷 {driverName}</p>
        </div>

        <div className="menu-links">
          {[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Fuel', path: '/fuel' },
            { label: 'Load', path: '/load' },
            { label: 'Deliver', path: '/deliver' },
            { label: 'Trips', path: '/trips' },
            { label: 'Profile', path: '/profile' },
          ].map((item) => (
            <button key={item.path} onClick={() => { navigate(item.path); setOpen(false); }}>
              {item.label}
            </button>
          ))}

          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
