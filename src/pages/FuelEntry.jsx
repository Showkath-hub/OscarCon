// src/pages/FuelEntry.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function FuelEntry() {
  const navigate = useNavigate();
  const driverId = localStorage.getItem('driver_id');
  const driverName = localStorage.getItem('driver_name');

  const [odo, setOdo] = useState('');
  const [liters, setLiters] = useState('');
  const [rate, setRate] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔧 Function to sanitize filenames
  function sanitizeFilename(name) {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^a-z0-9_.-]/g, '')   // Keep alphanumeric, dash, underscore, dot
      .replace(/-+/g, '-');           // Remove consecutive dashes
  }

  const handleSubmit = async () => {
    if (!odo || !liters || !rate) return alert('Please fill all fields');
    if (!file) return alert('Please upload a bill image');

    try {
      setLoading(true);

      const safeFileName = sanitizeFilename(file.name);
      const filePath = `${driverName}/${Date.now()}-${safeFileName}`;
      console.log('📂 DriverID', driverId);
      console.log('📂 DriverName:', driverName);
      console.log('📂 Sanitized file name:', safeFileName);
      console.log('📂 Uploading file to:', filePath);
      // Upload file to Supabase Storage
      const { data: uploadedFile, error: uploadError } = await supabase
        .storage
        .from('fuel-bills')
        .upload(filePath, file);

      if (uploadError) {
        console.error('❌ Upload error:', uploadError);
        alert('Failed to upload fuel bill image.');
        return;
      }

      // Get public URL
      const {
        data: { publicUrl },
        error: urlError,
      } = supabase.storage.from('fuel-bills').getPublicUrl(filePath);

      if (urlError) {
        console.error('❌ URL generation error:', urlError);
        alert('Fuel bill uploaded, but URL retrieval failed.');
        return;
      }

      // Insert into fuel_logs
      const { error: insertError } = await supabase.from('fuel_logs').insert({
        driver_id: driverId,
        odo_at_fuel: Number(odo),
        liters: Number(liters),
        rate: Number(rate),
        amount: Number(liters) * Number(rate),
        fuel_bill_url: publicUrl,
      });

      if (insertError) {
        console.error('❌ Insert error:', insertError);
        alert('Failed to save fuel log entry.');
        return;
      }

      alert('✅ Fuel log submitted successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>⛽ Fuel Entry</h2>

      <input
        type="number"
        placeholder="ODO Reading"
        value={odo}
        onChange={(e) => setOdo(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px' }}
      />

      <input
        type="number"
        placeholder="Liters"
        value={liters}
        onChange={(e) => setLiters(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px' }}
      />

      <input
        type="number"
        placeholder="Rate per Liter"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px' }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: 'block', marginBottom: '10px' }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}
