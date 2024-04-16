document.addEventListener('DOMContentLoaded', () => {
  const newArticleForm = document.getElementById('new');
  newArticleForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const author = document.getElementById('author').value.trim();
    const title = document.getElementById('title').value.trim();
    const story = document.getElementById('story').value.trim();
    const imageInput = document.getElementById('image');
    const image = imageInput.files[0];

    
    const base64 = await convertToBase64(image);

    const requestBody = {
      author: author,
      title: title,
      story: story,
      image: base64,
    };

    try {
      const token = localStorage.getItem('adminToken');
      const role = localStorage.getItem('role');

      if (!token || !role || role.trim().toLowerCase() !== 'admin') {
        alert('You must be logged in as an admin to create a blog post.');
        return;
      }

      const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/blog/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('Article created successfully!');
        window.location.reload();
      } else {
        const error = await response.json();
        console.error('Error creating article:', error);
        alert(`Error creating article: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert('An error occurred while creating the article. Please try again later.');
    }
  });
});

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}