document.addEventListener('DOMContentLoaded', async () => {
    const table = document.querySelector('table tbody');
  
    try {
      const token = localStorage.getItem('adminToken');
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
    
      localStorage.removeItem('contactForm');
    });
  });
  