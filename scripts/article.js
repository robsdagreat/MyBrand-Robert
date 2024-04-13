const articleForm = document.getElementById('new');
articleForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const author = e.target.elements.author.value.trim();
  const title = e.target.elements.title.value.trim();
  const content = e.target.elements.story.value.trim();
  const imageFile = e.target.elements.image.files[0];

  const article = {
    id: Date.now(),
    author,
    title,
    content,
    image: imageFile ? URL.createObjectURL(imageFile) : null,
    createdAt: new Date().toISOString(),
  };

  try {
    let userRole = localStorage.getItem('userRole');
    let token;

    if (userRole === 'admin') {
      token = localStorage.getItem('adminToken');
    } else {
      token = localStorage.getItem('userToken');
    }

    console.log('User role:', userRole);
    console.log('Token:', token);

    if (!token) {
      throw new Error('You must be logged in to create a blog post');
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
        alert('Blog post created successfully!');
      } else {
        alert(`Error creating blog post: ${data.message}`);
      }
    } else {
      const error = await response.text();
      alert(`Error creating blog post: ${error}`);
    }
  } catch (error) {
    alert('Error occurred while creating a blog. Please try again later');
    console.error('Error:', error);
  }
});