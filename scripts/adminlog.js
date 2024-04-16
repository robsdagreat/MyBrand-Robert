function checkAuth() {
  const userIsLoggedIn = sessionStorage.getItem("userToken");

  if (userIsLoggedIn) {
    window.location.href = "https://robsdagreat.github.io/MyBrand-Robert/dashboard.html";
  }
}

function next() {
  window.setTimeout(function () {
    window.location.href = "blog.html";
  }, 1700);
}

const adminLoginForm = document.getElementById("adminLoginForm");
const adminSubmitError = document.getElementById("adminSubmitError");

const loginAdmin = async (event) => {
  try {
    event.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

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
    adminSubmitError.textContent = 'An error occurred during admin login. Please try again later.';
  }
};

if (!adminLoginForm) {
  console.error("Admin login form not found");
} else {
  adminLoginForm.addEventListener("submit", loginAdmin);
}