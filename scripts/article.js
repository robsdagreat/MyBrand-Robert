document.addEventListener('DOMContentLoaded', () => {
  const newArticleForm = document.getElementById('new');

  newArticleForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const author = document.getElementById('author').value.trim();
    const title = document.getElementById('title').value.trim();
    const story = document.getElementById('story').value.trim();
    const image = document.getElementById('image').files[0];

    const formData = {author, title, story, image};
    console.log(formData)

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
        },
        body: formData,
      });

      if (response.ok) {
        alert('Article created successfully!');
        window.location.reload(); 
      } else {
        const error = await response.text();
        console.error('Error creating article:', error);
        alert(`Error creating article: ${error}`);
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert('An error occurred while creating the article. Please try again later.');
    }
  });
});
