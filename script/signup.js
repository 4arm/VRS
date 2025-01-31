// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase credentials (replace with your actual values)
const SUPABASE_URL = 'https://cpjugdkidkbffbyjinsk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwanVnZGtpZGtiZmZieWppbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MTgzMzYsImV4cCI6MjA1MzA5NDMzNn0.zhk3oFD1whGdkeW9-0TzmLQTIG4kBRamNXjxoy1c-bY';      
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


//function to signup
document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Show spinner while processing
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('status').innerText = ''; 

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase
        .from('users')
        .insert([{ username, email, password, }]);

    // Hide spinner once request is completed
    document.getElementById('spinner').style.display = 'none';

    if (error) {
        document.getElementById('status').innerText = 'Error: ' + error.message;
    } else {
        console.log('User created:', data);
        document.getElementById('status').innerText = 'Sign-up successful! Redirecting...';
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }
});