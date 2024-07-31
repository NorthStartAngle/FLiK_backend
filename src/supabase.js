const { createClient } = require('@supabase/supabase-js');

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcnFqa3J4a3F3anN2Z3Z0aWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIwMDM0NzksImV4cCI6MTk5NzU3OTQ3OX0.fvE4hjxmButu-uFUIKuK-kJda13eaGKtwtMcvxB3lL0'
const SUPABASE_URL = 'https://uprqjkrxkqwjsvgvtigb.supabase.co'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY,{auth: {
        autoRefreshToken: false,
        persistSession: true,
        detectSessionInUrl: true
    }
    // ,global: { fetch: fetch.bind(globalThis) }
});

supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("AuthState changed: ", event);
    switch (event) {
        case "SIGNED_IN":
        case "TOKEN_REFRESHED": {
            break;
        }
        case "SIGNED_OUT":
        case "USER_DELETED": {
            break;
        }
        case "PASSWORD_RECOVERY": {
            console.log("password recovery state entered");
            break;
        }
    }
});
module.exports = supabase;