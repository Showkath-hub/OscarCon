import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Login({ onLogin }) {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from('drivers')
      .select('*')
      .eq('phone', phone)
      .eq('pin', pin)
      .single();

    if (data) {
      localStorage.setItem('driver_id', data.id);
      localStorage.setItem('driver_name', data.name); // also update driver_name for Navbar
      if (onLogin) onLogin(); // ✅ notify App that login happened
      navigate('/dashboard');
    } else {
      alert('Invalid phone or PIN');
    }
  };

  return (
    <div className="container">
      <h1>🚚 Driver Login</h1>
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password"
        maxLength={4}
        placeholder="4-digit PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
