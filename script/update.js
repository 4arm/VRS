// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

//function to update
document.getElementById('updateForm').addEventListener('submit', async(event) =>{
    event.preventDefault();

    // Supabase credentials (replace with your actual values)
    const SUPABASE_URL = 'https://cpjugdkidkbffbyjinsk.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwanVnZGtpZGtiZmZieWppbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MTgzMzYsImV4cCI6MjA1MzA5NDMzNn0.zhk3oFD1whGdkeW9-0TzmLQTIG4kBRamNXjxoy1c-bY';      
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');

    function displayUserInfo(username, role) {
        if (username) {
            document.getElementById('username-display').textContent = username;
            document.getElementById('role-display').textContent = role.charAt(0).toUpperCase() + role.slice(1);
            document.querySelector('.user-icon').textContent = username.charAt(0).toUpperCase();
        }
    }

    if (username) {
        displayUserInfo(username, role);
    } else {
        console.error("No user session found.");
        document.getElementById("username").innerText = "Not Logged In";
        alert('No session found. Redirecting to login.');
        window.location.href = 'login.html';
    }
});