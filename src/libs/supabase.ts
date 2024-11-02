import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fnyihzqxvycjvsjisolx.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
