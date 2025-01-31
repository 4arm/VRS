// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

document.addEventListener("DOMContentLoaded", async function () {
    // Initialize Supabase
    const SUPABASE_URL = 'https://cpjugdkidkbffbyjinsk.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwanVnZGtpZGtiZmZieWppbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MTgzMzYsImV4cCI6MjA1MzA5NDMzNn0.zhk3oFD1whGdkeW9-0TzmLQTIG4kBRamNXjxoy1c-bY';      
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Get username and role from session storage
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');

    // Fetch user profile from Supabase
    async function fetchUserProfile(username) {
        if (!username) {
            console.error("No username provided");
            return;
        }

        console.log("Fetching user:", username);
        
        // 1️⃣ Fetch user details from 'users' table
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('users_id, username, email, role')
            .eq('username', username)
            .single();

        if (userError || !user) {
            console.error('User not found:', userError);
            document.getElementById("username").innerText = "User not found";
            return;
        }

        // 2️⃣ Fetch additional user info from 'users_information' using users_id
        const { data: userInfo, error: infoError } = await supabase
            .from('users_information')
            .select('full_name, matric_no, department')
            .eq('users_id', user.users_id)
            .single();

        console.log("Supabase Response:", user, userInfo, infoError);

        if (infoError || !userInfo) {
            console.error('Error fetching user info:', infoError);
        }

        // Update user profile on the page
        document.getElementById("username").innerText = user.username;
        document.getElementById("email").innerText = user.email;
        document.getElementById("role").innerText = user.role;
        document.getElementById("full_name").innerText = userInfo.full_name || "N/A";
        document.getElementById("matric_no").innerText = userInfo.matric_no || "N/A";
        document.getElementById("department").innerText = userInfo.department || "N/A";
    }

    // Display user information in UI
    function displayUserInfo(username, role) {
        if (username) {
            document.getElementById('username-display').textContent = username;
            document.getElementById('role-display').textContent = role.charAt(0).toUpperCase() + role.slice(1);
            document.querySelector('.user-icon').textContent = username.charAt(0).toUpperCase();
        }
    }

    // Role-based content visibility
    function handleRoleBasedAccess(role) {
        if (role === 'admin') {
            document.getElementById('admin-content').style.display = 'block';
        } else if (role === 'user') {
            document.getElementById('user-content').style.display = 'block';
        } else {
            alert('Unknown role. Redirecting to login.');
            window.location.href = 'login.html';
        }
    }

    // Logout function
    function setupLogout() {
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                sessionStorage.clear();
                window.location.href = 'index.html';
            });
        }
    }

    function setupUpdate() {
        const logoutButton = document.getElementById('update-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                sessionStorage.clear();
                window.location.href = 'update.html';
            });
        }
    }

    // Main execution flow
    if (username) {
        fetchUserProfile(username);
        displayUserInfo(username, role);
        handleRoleBasedAccess(role);
    } else {
        console.error("No user session found.");
        document.getElementById("username").innerText = "Not Logged In";
        alert('No session found. Redirecting to login.');
        window.location.href = 'login.html';
    }

    setupLogout();
    setupUpdate();
});
