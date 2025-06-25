import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Profile() {
  const driver = localStorage.getItem('driver_id');
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.from('drivers').select('name, phone, profile_pic_url')
      .eq('id', driver).single()
      .then(r => setUser(r.data));
  }, []);

  return (
    <div className="container">
      <h2>👤 Profile</h2>
      {user && <>
        {user.profile_pic_url && <img src={user.profile_pic_url} alt="Profile" className="profile-pic" />}
        <p>Name: {user.name}</p>
        <p>Phone: {user.phone}</p>
      </>}
    </div>
  );
}
