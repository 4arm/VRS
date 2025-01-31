// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase credentials (replace with your actual values)
const SUPABASE_URL = 'https://cpjugdkidkbffbyjinsk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwanVnZGtpZGtiZmZieWppbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MTgzMzYsImV4cCI6MjA1MzA5NDMzNn0.zhk3oFD1whGdkeW9-0TzmLQTIG4kBRamNXjxoy1c-bY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to check if the user is logged in
async function checkAuth() {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
    

    if (!username) {
        alert('Please log in first!');
        window.location.href = 'index.html';
        return;
    }

    if (!role) {
        alert('Please log in first!');
        window.location.href = 'index.html';
        return;
    }


    if (role === 'admin') {
        document.getElementById('admin-content').style.display = 'block';
        document.getElementById('admin-conten').style.display = 'block';
    } else if (role === 'user') {
        document.getElementById('user-content').style.display = 'block';
    } else {
    alert('Unknown role. Redirecting to login.');
        window.location.href = 'login.html';
    }

    // Display user information
    displayUserInfo(username, role);
}

// Function to fetch and display user information
function displayUserInfo(username, role) {
    document.getElementById('username-display').textContent = username;
    document.getElementById('role-display').textContent = role.charAt(0).toUpperCase() + role.slice(1);
    
    // Set user initials in the icon
    document.querySelector('.user-icon').textContent = username.charAt(0).toUpperCase();
}

// Logout function
document.getElementById('logout-button').addEventListener('click', () => {
    sessionStorage.clear(); // Clear session storage
    window.location.href = 'index.html';
})

// Ensure logout link works correctly
document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = 'index.html';
})  

// Call the function to check authentication when the page loads
checkAuth();
