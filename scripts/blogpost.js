document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('articleId');

  if (!articleId) {
    console.error('No article ID found in the URL.');
    return;
  }

  async function fetchBlogPost(articleId) {
    try {
      const response = await fetch(`https://mybrand-backend-s9f7.onrender.com/api/blog/${articleId}`);
      if (response.ok) {
        const blog = await response.json();
        renderBlogPost(blog);
      } else {
        console.error('Error fetching blog post:', response.status);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    }
  }

  fetchBlogPost(articleId);
});

function renderBlogPost(blog) {
  const blogElement = document.getElementById('blog');
   blogElement.innerHTML = `
    <div class="profile">
      <div class="img"><img src="./imgs/et_profile-male.png" alt="" /></div>
      <div class="name"><span>@${blog.author}</span></div>
      <div class="separate"><span>.</span></div>
      <div class="date"><span>${new Date(blog.createdAt).toLocaleString()}</span></div>
    </div>
    <div class="content">
      <div class="story">
        <p>${blog.title}</p>
        ${blog.story ? `<p>${blog.story.slice(0, 100)}...</p>` : ''} <!-- Check if blog.story exists before slicing -->
      </div>
      <div class="cover"><img src="${blog.image}" alt="" /></div>
    </div>
    <div class="like">
      <img class="blogLike" src="./imgs/icon-park-twotone_like.png" alt="" data-article-id="${blog._id}" />
      <span id="likeCount_blog${blog._id}">${blog.likes.length}</span>
    </div>
    <div class="comment">
      <a href="#" class="comment-link" data-article-id="${blog._id}">
        <img src="./imgs/basil_comment-solid.png" alt="" />
        <span>${blog.comments.length}</span>
      </a>
    </div>
    <div class="line"></div>
    <div class="reply">
      <h2>Replies</h2>
    </div>
    <div id="comment">
      <div class="profile">
        <div class="name"><span>@Musafiri_yves</span></div>
      </div>
      <div class="reply">
        <p>Note that React 19 is focused on the (awesome) features already in canary. React Compiler is more of the thing that comes next after that, so 19 != Compiler.</p>
      </div>
      <div class="time">
        <div class="date2"><span>12:39 AM</span></div>
        <div class="separate2"><span>.</span></div>
        <div class="date3"><span>${new Date(blog.createdAt).toLocaleString()}</span></div>
      </div>
    </div>
  `;
}
