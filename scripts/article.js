const articleForm = document.getElementById('new');
articleForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const author = e.target.elements.author.value.trim();
  const title = e.target.elements.title.value.trim();
  const story = e.target.elements.story.value.trim();
  const imageFile = e.target.elements.image.files[0];

  const article = {
    id: Date.now(),
    author,
    title,
    story,
    image: imageFile ? URL.createObjectURL(imageFile) : null,
    createdAt: new Date().toISOString(),
  };

  try {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      alert('You must be logged in to create a blog');
      return;
    }

    if (role !== 'admin') {
      alert('You must be an admin to create a blog');
      return;
    }

    const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/blog/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        alert('Blog post was created successfully!');
      } else {
        alert(`Error creating blog: ${data.message}`);
      }
    } else {
      const error = await response.text();
      alert(`Error creating blog post: ${error}`);
    }
  } catch (error) {
    alert('Error occurred while creating a blog. Please try again after some time!');
    console.error('Error:', error);
  }
});