document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    logoutButton.style.cursor= 'pointer';
    if (logoutButton) {
      logoutButton.addEventListener('click', logout());
    }else{
        console.log("No logout button found")
    }
  });
  
  async function logout() {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const role = localStorage.getItem('role');
  
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const logoutEndpoint = role === 'admin' ? 'https://mybrand-backend-s9f7.onrender.com/api/admin/logout' : 'https://mybrand-backend-s9f7.onrender.com/api/user/logout';
  
      const response = await fetch(logoutEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        window.location.href = 'https://robsdagreat.github.io/MyBrand-Robert/login.html';
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }