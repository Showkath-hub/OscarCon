import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function DeliveryEntry() {
  const nav = useNavigate();
  const driver = localStorage.getItem('driver_id');
  const [trip, setTrip] = useState(null);
  const [odo, setOdo] = useState('');
  const [cust, setCust] = useState('');
  const [ref, setRef] = useState('');

  useEffect(() => {
    supabase.from('trips').select('*')
      .eq('driver_id', driver).eq('status', 'Loaded')
      .order('start_time', {ascending:false}).limit(1)
      .then(r=>setTrip(r.data[0]));
  }, []);

  const handle = async () => {
    if(!trip) return alert('No loaded trip');
    await supabase.from('trips').update({
      odo_delivery: Number(odo),
      customer_name: cust,
      customer_reference: ref,
      status: 'Delivered',
      end_time: new Date()
    }).eq('id', trip.id);

    alert('🏁 Trip Delivered!');
    nav('/dashboard');
  };

  return (
    <div className="container">
      <h2>🏁 Delivery Entry</h2>
      {trip ? <>
        <input type="number" placeholder="ODO Delivery" onChange={e=>setOdo(e.target.value)} />
        <input type="text" placeholder="Customer Name" onChange={e=>setCust(e.target.value)} />
        <input type="text" placeholder="Reference/Notes" onChange={e=>setRef(e.target.value)} />
        <button onClick={handle}>Mark Delivered</button>
      </> : <p>No loaded trip found.</p>}
    </div>
  );
}
