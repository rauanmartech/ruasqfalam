import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://pkqbdahzbmkifbnmghzc.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcWJkYWh6Ym1raWZibm1naHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Njg5NTEsImV4cCI6MjA4OTU0NDk1MX0.-qQwdIUwdHcMGN7RMsdesVZea-ZZjiAg4_hoxx0-TUM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


