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
  updateIcon.classList.add('update-icon');
  updateIcon.src = './imgs/mdi_pencil-outline.svg';
  updateIcon.alt = 'Update';
  updateIcon.dataset.blogId = blog._id; 
  console.log('Update Icon Element:', updateIcon); 
  updateIcon.addEventListener('click', () => handleUpdateIcon(blog._id));
  updateDiv.appendChild(updateIcon);


  const deleteIcon = document.createElement('img');
  deleteIcon.src = './imgs/flowbite_trash-bin-outline.svg';
  deleteIcon.alt = 'Delete';
  deleteIcon.classList.add('delete-icon');
  deleteIcon.dataset.blogId = blog._id;
  updateDiv.appendChild(deleteIcon);


  oneDiv.appendChild(updateDiv);
  oneDiv.appendChild(articleDiv);

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



const handleUpdateIcon = (event) => {
  if (!event.target) {
    console.error('Invalid event target');
    return;
  }

  const blogId = event.target.dataset.blogId;
  console.log('blogId:', blogId);

  if (blogId !== undefined) {
    const url = `https://robsdagreat.github.io/MyBrand-Robert/updateBlog.html?id=${blogId}`;
    window.location.href = url;
  } else {
    console.error('Invalid blogId');
  }
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
    } else if (event.target.classList.contains('update-icon')) {
      handleUpdateIcon(event);
    } else if (event.target.closest('.update-icon')) {
      const updateIcon = event.target.closest('.update-icon');
      const blogId = updateIcon.dataset.blogId;
      handleUpdateIcon({ target: updateIcon });
    }
  });
});
