document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger img');
    const burgerMenu = document.querySelector('.burgerMenu');

    burger.addEventListener('click', () => {
      burgerMenu.classList.toggle("burgerShow");
      
    });

    const contactForm = document.getElementById("contactForm");
    

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const resBox = document.getElementById('response');
    
      const name = event.target.elements.name.value.trim();
      const email = event.target.elements.email.value.trim();
      const message = event.target.elements.message.value.trim();
    
      if (!name || !email || !message) {
        alert("Please fill the form correctly");
        return;
      }
    
      const formData = { name, email, message };
    
      try {
        const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        console.log('Response from backend:', response);
    
        if (response.ok) {
          const data = await response.json();
          if (data.message) {

            resBox.textContent = data.message;
            contactForm.reset();
          } else {
            resBox.textContent='Error submitting the form';
          }
        } else {
          const error = await response.text();
          resBox.textContent= `Error: ${error}`;
        }
      } catch (error) {
        resBox.textContent= 'An error occurred while sending the message. Please try again later';
        console.error("Error:", error);
      }
    
    });
  });