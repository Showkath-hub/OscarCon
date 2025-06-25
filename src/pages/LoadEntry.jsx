import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
export default function LoadEntry() {
  const nav = useNavigate();
  const driver = localStorage.getItem('driver_id');
  const [odo, setOdo] = useState('');
  const [material, setMaterial] = useState('');
  const [weight, setWeight] = useState('');
  const [rate, setRate] = useState('');

  const handle = async () => {
    await supabase.from('trips').insert({
      driver_id: driver,
      odo_start: Number(odo), material_type: material,
      weight: Number(weight), rate_per_ton: rate ? Number(rate) : null,
      status: 'Loaded'
    });
    alert('⚡ Load started!');
    nav('/dashboard');
  };

  return (
    <div className="container">
      <h2>📦 Load Entry</h2>
      <input type="number" placeholder="ODO Start" onChange={e=>setOdo(e.target.value)} />
      <select onChange={e=>setMaterial(e.target.value)}>
        <option value="">Material</option>
        <option>Sand</option>
        <option>Stone 20mm</option>
        <option>Stone 30mm</option>
        <option>Stone 40mm</option>
        <option>Gravel</option>
      </select>
      <input type="number" placeholder="Weight (tons)" onChange={e=>setWeight(e.target.value)} />
      <input type="number" placeholder="Rate/ton (optional)" onChange={e=>setRate(e.target.value)} />
      <button onClick={handle}>Start Loading</button>
    </div>
  );
}
