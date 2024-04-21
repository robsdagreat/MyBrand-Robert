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
        resErr.textContent= 'You must be logged in as an admin to create a blog post.';
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

const fetchLatestBlogs = async () => {
  try {
    const response = await axios.get('https://mybrand-backend-s9f7.onrender.com/api/blogs');
    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    return [];
  }
};

const renderBlogCard = (blog) => {
  const oneDiv = document.createElement('div');
  oneDiv.id = 'one';

  const articleDiv = document.createElement('div');
  articleDiv.id = 'article';

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  titleDiv.innerHTML = `<h3>Title:</h3>`;
  articleDiv.appendChild(titleDiv);

  const blogDiv = document.createElement('div');
  blogDiv.classList.add('blog');
  blogDiv.innerHTML = `<p>${blog.title}</p>`;
  articleDiv.appendChild(blogDiv);

  const dateDiv = document.createElement('div');
  dateDiv.classList.add('date');
  dateDiv.innerHTML = `<span>${new Date(blog.date).toDateString()}</span>`;
  articleDiv.appendChild(dateDiv);

  const updateDiv = document.createElement('div');
  updateDiv.id = 'update';
  const updateIcon = document.createElement('img');
  updateIcon.src = './imgs/mdi_pencil-outline.svg';
  updateIcon.alt = 'Update';
  updateDiv.appendChild(updateIcon);

  const deleteIcon = document.createElement('img');
  deleteIcon.src = './imgs/flowbite_trash-bin-outline.svg';
  deleteIcon.alt = 'Delete';
  deleteIcon.classList.add('delete-icon'); 
  deleteIcon.dataset.blogId = blog._id; 
  deleteIcon.addEventListener('click', () => deleteIconClickHandler(blog._id));
  updateDiv.appendChild(deleteIcon);

  oneDiv.appendChild(updateDiv);
  oneDiv.appendChild(articleDiv);

  return oneDiv;
};

const deleteBlog = async (blogId) => {
  try {
    const token = localStorage.getItem('adminToken'); 
    if (!token) {
      console.log('User is not logged in');
      return;
    }

    const isAdminResponse = await axios.get('https://your-backend-url/admin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!isAdminResponse.data.isAdmin) {
      console.log('User is not an admin');
      return;
    }

    const response = await axios.delete(`https://your-backend-url/blogs/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Blog deleted:', response.data);
    // Optional: Display success message or update UI
  } catch (error) {
    console.error('Error deleting blog:', error);
    // Optional: Display error message or handle error
  }
};

const handleDeleteBlog = async (blogId) => {
  const confirmDelete = confirm('Are you sure you want to delete this blog?');
  if (confirmDelete) {
    await deleteBlog(blogId);
  }
};

const deleteIconClickHandler = async (blogId) => {
  await handleDeleteBlog(blogId);
};

window.addEventListener('load', async () => {
  const latestBlogs = await fetchLatestBlogs();
  const latestBlogsContainer = document.getElementById('latest-blogs-container');

  latestBlogsContainer.innerHTML = ''; 

  latestBlogs.slice(0, 3).forEach((blog) => {
    const blogCard = renderBlogCard(blog);
    latestBlogsContainer.appendChild(blogCard);
  });

  // Event delegation for dynamically created delete icons
  latestBlogsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-icon')) {
      const blogId = event.target.dataset.blogId;
      deleteIconClickHandler(blogId);
    }
  });
});
