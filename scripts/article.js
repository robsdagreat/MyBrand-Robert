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
  updateDiv.appendChild(deleteIcon);

  oneDiv.appendChild(updateDiv);
  oneDiv.appendChild(articleDiv);

  return oneDiv;
};

const deleteBlog = async (blogId) => {
  const resBox = document.querySelector('.success');
  const resErr = document.querySelector('.error');
  try {
    const token = localStorage.getItem('adminToken'); 
    if (!token) {
      resErr.textContent = 'User is not logged in';
      return;
    }

    const response = await axios.delete(`https://mybrand-backend-s9f7.onrender.com/api/blog/delete/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    resBox.textContent = response.data.message;
  } catch (error) {
    resErr.textContent = error.message;
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

  const reversedLatestBlogs = latestBlogs.slice().reverse();

  
  reversedLatestBlogs.slice(0, 3).forEach((blog) => {
    const blogCard = renderBlogCard(blog);
    latestBlogsContainer.appendChild(blogCard);
  });

  latestBlogsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-icon')) {
      const blogId = event.target.dataset.blogId;
      deleteIconClickHandler(blogId);
    }
  });
});


const updateIconClickHandler = (blogId, title, story, image) => {
  const updateForm = document.querySelector('.update-form');
  updateForm.classList.remove('hidden');

  
  title = document.querySelector('#title').value
  story = document.querySelector('#story').value
  image = document.querySelector('#image').value

  
  const updateBlogForm = document.getElementById('new');
  updateBlogForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const updatedTitle = document.querySelector('#title').value
    const updatedStory = document.querySelector('#story').value
    const updatedImage = document.querySelector('#image').value
    
    await updateBlog(blogId, updatedTitle, updatedStory, updatedImage);
  });
};

const updateBlog = async (blogId, title, story, image) => {
  const resBox = document.querySelector('.success');
  const resErr = document.querySelector('.error');
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      resErr.textContent= 'User is not logged in';
      return;
    }

    const response = await axios.put(`https://mybrand-backend-s9f7.onrender.com/api/blog/edit/${blogId}`, {
      title,
      story,
      image
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    resBox.textContent= response.data;
  } catch (error) {
    resErr.textContent=  error.message;
  }
};

window.addEventListener('load', async () => {

  document.querySelectorAll('.update-icon').forEach((icon) => {
    icon.addEventListener('click', () => {
      const blogId = icon.dataset.blogId;
      const title = icon.dataset.title;
      const story = icon.dataset.story;
      const image = icon.dataset.image;
      updateIconClickHandler(blogId, title, story, image);
    });
  });
});