document.addEventListener('DOMContentLoaded', async () => {
    const table = document.querySelector('table tbody');
  
    try {
      const token = localStorage.getItem('adminToken'); // Assuming you store the token in localStorage
      if (!token) {
        throw new Error('Authentication token not found');
      }
  
      const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/contact/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        resErr.textContent= 'Failed to fetch queries';
      }
      
      const { Queries } = await response.json();
  
      Queries.forEach(data => {
        const newRow = table.insertRow();
  
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const messageCell = newRow.insertCell(2);
  
        nameCell.textContent = data.name;
        emailCell.textContent = data.email;
        messageCell.textContent = data.message;
      });
    } catch (error) {
      console.error(error);
      
    }
  
    const clearButton = document.querySelector('.one1');
  
    clearButton.addEventListener('click', () => {
      table.innerHTML = 'Queries deleted!!!';
      // You may want to make a request to your backend to delete all queries here
      localStorage.removeItem('contactForm');
    });
  });
  