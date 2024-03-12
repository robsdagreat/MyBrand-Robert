document.addEventListener('DOMContentLoaded', ()=>{
    const queriesData= JSON.parse(localStorage.getItem('contactForm',)) || [];
    
    const table= document.querySelector('table tbody');

    queriesData.forEach(data => {
        const newRow= table.insertRow();


        const nameCell= newRow.insertCell(0);
        const emailCell= newRow.insertCell(1);
        const messageCell= newRow.insertCell(2);

        nameCell.textContent= data.name;
        emailCell.textContent= data.email;
        messageCell.textContent= data.message;
    });
     
    const clearButton= document.querySelector('.one1');

    clearButton.addEventListener('click', ()=>{
        table.innerHTML= 'Queries deleted!!!';

        localStorage.removeItem('contactForm');
    });
});