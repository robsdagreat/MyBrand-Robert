document.addEventListener('DOMContentLoaded', () => {
  const newArticleForm = document.getElementById('new');
  newArticleForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    
    const resBox = document.querySelector('.success');
    const resErr = document.querySelector('.error');
    
    try {

      const title = document.querySelector('#title').value
      const story = document.querySelector('#story').value
      const image = document.querySelector('#image').value
      
      
      console.log(`title:${title} stroy: ${story} image: ${image}`);
      
      const formData = {
        title: title,
        story: story,
        image: image
      }
      const token = localStorage.getItem('adminToken');
      const role = localStorage.getItem('role');

      if (!token || !role || role.trim().toLowerCase() !== 'admin') {
        alert('You must be logged in as an admin to create a blog post.');
        return;
      }

      const response = await axios.post('https://mybrand-backend-s9f7.onrender.com/api/blog/add', formData, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      

      if (response.status === 200) {
        resBox.textContent = response.data.message;
      } else {
    
        console.error('Error creating article:', response.data);
        resErr.textContent= `Error creating article: ${response.data.message}`;

      }
    } catch (error) {

      console.error('Error creating article:', error);
      resErr.textContent= 'An error occurred while creating the article. Please try again later.';

    }
  });
});
