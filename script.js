document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate authentication (replace this with actual authentication logic)
    if (username === 'doctor' && password === 'password') {
        window.location.href = 'https://www.medqr.or.ke/upload.html';
    } else {
        alert('Invalid credentials');
    }
});
