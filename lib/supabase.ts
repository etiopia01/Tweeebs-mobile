import 'react-native-url-polyfill/auto'
import {createClient} from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

 const supabase = createClient("https://dkuqdlrusijeuaelblwr.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrdXFkbHJ1c2lqZXVhZWxibHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1MjA0MDIsImV4cCI6MjAxNzA5NjQwMn0.-nbX3r2qRBAfkKJtyd4YZZoPbVY_H0X3NIRdVCGYqnY", { auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export default supabase