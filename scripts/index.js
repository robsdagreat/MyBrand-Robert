document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger img');
    const burgerMenu = document.querySelector('.burgerMenu');
    const profile= document.getElementsByClassName("profile")[0];

    burger.addEventListener('click', () => {
      burgerMenu.classList.toggle("burgerShow");
      
    });

    const contactForm = document.getElementById("contactForm");
    

    contactForm.addEventListener('submit', (event)=>{

        event.preventDefault();
        
        const name = event.target.elements.name.value.trim();
        const email = event.target.elements.email.value.trim();
        const message = event.target.elements.message.value.trim();

        if(!name || !email || !message){
            alert("Please fill the form correctly");
            return;
        }

        const formData= {name, email, message};

        const savedData= JSON.parse(localStorage.getItem('contactForm')) || [];

        savedData.push(formData);

        localStorage.setItem('contactForm', JSON.stringify(savedData));

        alert('Form submitted successfully');
    })
  });

  
