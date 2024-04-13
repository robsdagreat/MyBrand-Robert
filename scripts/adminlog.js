document.addEventListener("DOMContentLoaded", () => {
  const adminForm = document.getElementById("adminlog");


  adminForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value.trim();
    const password = event.target.elements.password.value.trim();
    const formData = { email, password };

    try {
      const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'admin'); 
        alert('Admin logged in successfully!');
        window.location.href = 'https://robsdagreat.github.io/MyBrand-Robert/dashboard.html';
      } else {
        const error = await response.text();
        alert(`Error during admin login: ${error}`);
      }
    } catch (error) {
      console.error('Error occured during logging you in:', error);
      alert('An error occurred during admin login. Please try again later.');
    }
  });
});