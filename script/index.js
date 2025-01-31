// Import Supabase client 
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase credentials (replace with your actual values)
const SUPABASE_URL = 'https://cpjugdkidkbffbyjinsk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwanVnZGtpZGtiZmZieWppbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MTgzMzYsImV4cCI6MjA1MzA5NDMzNn0.zhk3oFD1whGdkeW9-0TzmLQTIG4kBRamNXjxoy1c-bY';      
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to login
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    const spinner = document.getElementById('spinner');
    const loginBtn = document.querySelector('button[type="submit"]');

    errorMsg.textContent = '';

    // Basic validation
    if (username === '' || password === '') {
        errorMsg.textContent = 'Please fill in all fields.';
        return;
    }

    spinner.style.display = 'block';  // Show spinner
    loginBtn.disabled = true; // Disable button to prevent multiple submissions

    setTimeout(async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('username, password, role')
                .eq('username', username)
                .single();

            spinner.style.display = 'none';  // Hide spinner
            loginBtn.disabled = false;  // Re-enable button

            if (error || !data) {
                errorMsg.textContent = 'Invalid username or password.';
                return;
            }

            if (data.password === password) {
                // Store session securely
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('role', data.role);


                // Redirect based on role
                if (data.role === 'admin') {
                    window.location.href = 'dashboard.html';
                } else if (data.role === 'user') {
                    window.location.href = 'dashboard.html';
                } else {
                    errorMsg.textContent = 'Invalid role.';
                }

            } else {
                errorMsg.textContent = 'Invalid username or password.';
            }
        } catch (error) {
            spinner.style.display = 'none';  // Hide spinner
            loginBtn.disabled = false;  // Re-enable button
            console.error('Error:', error);
            errorMsg.textContent = 'An error occurred. Please try again.';
        }
    }, 1000);  // Simulating delay for better UX
});

// Dropdown menu toggle function
function toggleDropdown(id) {
    var submenu = document.getElementById(id);
    submenu.style.display = (submenu.style.display === "block") ? "none" : "block";
}
