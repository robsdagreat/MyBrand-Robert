document.addEventListener('DOMContentLoaded', async () => {
  const blogContainer = document.querySelector('#blogContainer');

  const getAllBlogs = async () => {
    try {
      const response = await axios.get('https://mybrand-backend-s9f7.onrender.com/api/blogs');
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('An error occurred during getting all blogs', error);
      return [];
    }
  }

  const renderArticle = (article) => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('blog');
    articleElement.innerHTML = `
    <div class="profile">
    <div class="image">
    <div class="img"><img src="./imgs/PXL_20231130_120837861.PORTRAIT.jpg" alt="" /></div>
  </div>
      <div class="name"><span>@${article.author}</span></div>
      <div class="separate"><span>.</span></div>
      <div class="date"><span>${new Date(article.createdAt).toLocaleString()}</span></div>
    </div>
    <div class="content">
      <div class="story">
        <p><span id="title">${article.title}</span> ${article.story.slice(0, 100)}...</p>
      </div>
      <div class="cover">
        <a href="./blogpost.html"><img src="${article.image}" alt="" /></a>
      </div>
    </div>
    <div class="react">
      <div class="like">
        <img class="blogLike" src="./imgs/icon-park-twotone_like.png" alt="" data-article-id="${article._id}" />
        <span id="likeCount_blog${article._id}">${article.likes.length}</span>
      </div>
      <div class="comment">
        <a href="./blogpost.html"><img class="comment-link" src="./imgs/basil_comment-solid.png" alt="" /></a>
      <span>${comments?.length} </span>
      </div>
    </div>
    <div class="line"></div>
  `;
    
  
  const commentLink = articleElement.querySelector('.cover');
  commentLink.dataset.articleId = article._id;

  commentLink.addEventListener('click', (event) => {
    event.preventDefault();
    const articleId = event.currentTarget.dataset.articleId;
    handleCommentClick(articleId);
  });

  
    const likeIcon = articleElement.querySelector('.blogLike');
    likeIcon.addEventListener('click', () => handleLike(article._id, articleElement));

    return articleElement;
  }

  async function renderBlogs() {
    const blogs = await getAllBlogs();
    blogs.forEach(blog => {
      const articleElement = renderArticle(blog);
      blogContainer.appendChild(articleElement);
    });
  }

  renderBlogs();
});

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }
});

async function logout() {
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    const role = localStorage.getItem('role');

    if (!token) {
      console.error('No token found');
      return;
    }

    const logoutEndpoint = role === 'admin' ? 'https://mybrand-backend-s9f7.onrender.com/api/admin/logout' : 'https://mybrand-backend-s9f7.onrender.com/api/user/logout';

    const response = await fetch(logoutEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      window.location.href = 'https://robsdagreat.github.io/MyBrand-Robert/index.html';
    } else {
      console.error('Logout failed:', response.status);
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
}


function handleCommentClick(articleId) {
  window.location.href = `https://robsdagreat.github.io/MyBrand-Robert/blogpost.html?articleId=${articleId}`;
}


async function handleLike(articleId, articleElement) {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = 'https://robsdagreat.github.io/MyBrand-Robert/login.html';
      return;
    }

    const response = await fetch(`https://mybrand-backend-s9f7.onrender.com/api/blog/${articleId}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const { blog } = await response.json();
      const likeCountElement = articleElement.querySelector(`#likeCount_blog${articleId}`);
      likeCountElement.textContent = blog.likes.length;
    } else {
      const { message } = await response.json();
      console.error('Error liking the article:', message);
    }
  } catch (error) {
    console.error('Error liking the article:', error);
  }
}
