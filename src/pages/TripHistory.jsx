import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function TripHistory() {
  const driver = localStorage.getItem('driver_id');
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    supabase.from('trips').select('*')
      .eq('driver_id', driver)
      .order('start_time', {ascending:false})
      .then(r => setTrips(r.data));
  }, []);

  return (
    <div className="container">
      <h2>📅 Trip History</h2>
      {trips.map(t => (
        <div key={t.id} className="history-card">
          <p>{t.material_type} – {t.status}</p>
          <p>Start: {t.odo_start} | Delivery: {t.odo_delivery}</p>
        </div>
      ))}
    </div>
  );
}
