document.addEventListener('DOMContentLoaded', () => {
    const getCurrentUserId = () => {
        return localStorage.getItem('currentUserId');
    };

    const likePost = (blogId) => {
        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
            alert("Please log in to like the blog.");
            window.location.href = './login.html';
            return;
        }

        const likeCountElement = document.getElementById(`likeCount_${blogId}`);

        if (!likeCountElement) {
            console.error(`Like count element not found for blogId: ${blogId}`);
            return;
        }

        const currentLikes = parseInt(likeCountElement.textContent, 10) || 0;
        const newLikes = currentLikes + 1;

        likeCountElement.textContent = newLikes;

        const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || {};
        likedBlogs[blogId] = likedBlogs[blogId] || [];
        likedBlogs[blogId].push(currentUserId);

        localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
    };

    const likeButtons = document.querySelectorAll('.blog .like img');
    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const blogId = event.currentTarget.closest('.blog').id;
            likePost(blogId);
        });
    });
});


const blogContainer = document.getElementById('blogContainer');

const articles = JSON.parse(localStorage.getItem('articles')) || [];

function renderArticle(article) {
  const articleElement = document.createElement('div');
  articleElement.classList.add('blog');
  articleElement.innerHTML = `
    <div class="profile">
      <div class="img"><img src="./imgs/et_profile-male.png" alt="" /></div>
      <div class="name"><span>@${article.author}</span></div>
      <div class="separate"><span>.</span></div>
      <div class="date"><span>${new Date(article.createdAt).toLocaleString()}</span></div>
    </div>
    <div class="content">
      <div class="story">
        <p><span id="title">${article.title}</span> ${article.content.slice(0, 100)}...</p>
      </div>
      <div class="cover">
        <a href="./blogpost.html"><img src="${article.image}" alt="" /></a>
      </div>
    </div>
    <div class="react">
      <div class="like">
        <img src="./imgs/icon-park-twotone_like.png" alt="" />
        <span id="likeCount_blog${article.id}">0</span>
      </div>
      <div class="comment">
        <a href="./blogpost.html"><img src="./imgs/basil_comment-solid.png" alt="" /></a>
        <span>0</span>
      </div>
    </div>
    <div id="comment">
      <span class="com">Comments</span>
      <div class="name"><span>@Musafiri_yves</span></div>
    </div>
    <div class="reply">
      <p>Wow! I can't wait to experience it.</p>
    </div>
    <div class="time">
      <div class="date2"><span>12:39 AM</span></div>
      <div class="separate2"><span>.</span></div>
      <div class="date3"><span>${new Date(article.createdAt).toLocaleString()}</span></div>
    </div>
    <div class="line"></div>
  `;

  return articleElement;
}


function renderArticles() {
  blogContainer.innerHTML = '';

  articles.forEach((article) => {
    const articleElement = renderArticle(article);
    blogContainer.appendChild(articleElement);
  });
}


renderArticles();
