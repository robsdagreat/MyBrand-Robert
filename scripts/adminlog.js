document.addEventListener("DOMContentLoaded", () => {
  const adminForm = document.getElementById("adminlog");

  if (!adminForm) {
    console.error("Admin login form not found");
  } else {
    adminForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        const email = event.target.elements.email.value.trim();
        const password = event.target.elements.password.value.trim();

        const formData = {
          email: email,
          password: password,
        };

        const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert('Admin logged in successfully!');
          window.location.href = 'https://robsdagreat.github.io/MyBrand-Robert/dashboard.html';
        } else {
          const error = await response.text();
          console.error('Error logging in:', error);
        }
      } catch (error) {
        console.error('Error occurred during logging in as admin:', error);
        
      }
    });
  }
});
