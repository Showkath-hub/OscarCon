// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbkeqzoaxxfcslcliyxn.supabase.co'; // replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNia2Vxem9heHhmY3NsY2xpeXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0Mjc2MzgsImV4cCI6MjA2NjAwMzYzOH0.wIl5hF1zjYFFlL8Y33edJIj819AP5bhpP-pAcyhK9X8'; // replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
