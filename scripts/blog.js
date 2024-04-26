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

  async function fetchCommentsForBlog(blogId, articleElement) {
    try {
      const response = await fetch(`https://mybrand-backend-s9f7.onrender.com/api/comments/${blogId}`);
      if (response.ok) {
        const comments = await response.json();
        updateCommentCount(comments.length, articleElement);
        renderComments(comments, articleElement);
      } else {
        console.error('Error fetching comments:', response.status);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  function updateCommentCount(count, articleElement) {
    const commentCountElement = articleElement.querySelector('#commentCount');
    commentCountElement.textContent = count;
  }

  function renderComments(comments, articleElement) {
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');

    comments.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');
      commentElement.innerHTML = `
        <div class="comment-header">
          <img src="${comment.author.avatar}" alt="${comment.author.username}" />
          <span>${comment.author.username}</span>
          <span>${new Date(comment.createdAt).toLocaleString()}</span>
        </div>
        <div class="comment-body">
          ${comment.text}
        </div>
      `;
      commentsContainer.appendChild(commentElement);
    });

    articleElement.appendChild(commentsContainer);
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
          <span id="commentCount"></span>
        </div>
      </div>
      <div class="line"></div>
    `;

    const commentCountElement = articleElement.querySelector('#commentCount');
    commentCountElement.textContent = article.comments.length;

    const commentLink = articleElement.querySelector('.cover a');
    commentLink.addEventListener('click', async (event) => {
      event.preventDefault();
      await fetchCommentsForBlog(article._id, articleElement);
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