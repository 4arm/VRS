document.addEventListener('DOMContentLoaded', function() {
    const userInfo = document.querySelector('.user-info');
    const dropdown = document.querySelector('.dropdown');

    userInfo.addEventListener('click', function() {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!userInfo.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
    const postButton = document.querySelector('.post-button');
    postButton.addEventListener('click', function() {
        window.location.href = 'newpostO.html';
    });
});