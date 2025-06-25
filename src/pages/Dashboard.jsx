import CardButton from '../components/CardButton';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const nav = useNavigate();
  const [trip, setTrip] = useState(null);
  const driver = localStorage.getItem('driver_id');

  useEffect(() => {
    if (!driver) return nav('/');
    supabase.from('trips').select('*').eq('driver_id', driver)
      .order('start_time', {ascending:false}).limit(1)
      .then(({ data }) => setTrip(data[0]));
  }, []);

  return (
    <div className="container">
      <h2>🚚 Dashboard</h2>
      <p>Current Trip: <strong>{trip?.status || 'None'}</strong></p>
      <div className="card-group">
        <CardButton label="Fuel Entry" onClick={() => nav('/fuel')} />
        <CardButton label="Load Entry" onClick={() => nav('/load')} />
        <CardButton label="Delivery Entry" onClick={() => nav('/deliver')} />
        <CardButton label="Trip History" onClick={() => nav('/trips')} />
        <CardButton label="Profile" onClick={() => nav('/profile')} />
      </div>
    </div>
  );
}
