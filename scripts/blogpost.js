document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('articleId');
  localStorage.setItem('Article ID', articleId);
  if (!articleId) {
    console.error('No article ID found in the URL.');
    return;
  }

  async function fetchBlogPost(articleId) {
    try {
      const response = await fetch(`https://mybrand-backend-s9f7.onrender.com/api/blog/${articleId}`);
      if (response.ok) {
        const blog = await response.json();
        renderBlogPost(blog.blog);
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
  if (!blog) {
    console.error('No blog data provided.');
    return;
  }
  blogElement.innerHTML = `
    <div class="profile">
    <div class="image">
      <div class="img"><img src="./imgs/PXL_20231130_120837861.PORTRAIT.jpg" alt="" /></div>
    </div>
      <div class="name" style="color:  rgb(253, 183, 53);"><span>Created by: @${blog.author}</span></div>
      <div class="separate" style="color:  rgb(253, 183, 53);"><span>.</span></div>
      <div class="date" style="color:  rgb(253, 183, 53);"><span>${new Date(blog.createdAt).toLocaleString()}</span></div>
    </div>
    <div class="story">
    <p style="margin-bottom: 50px; color:  rgb(253, 183, 53);">${blog.title}</p>
    </div>
   
    <div class="cover"><img src="${blog.image}" alt="" /></div>
    <div class="content">
      <div class="story" style="margin-top: 50px">
        <p class="story2">${blog.story}</p>
      </div>
    </div>
    <div class="reaction">
    <div class="like">
      <img class="blogLike" src="./imgs/icon-park-twotone_like.png" alt="" data-article-id="${blog._id}" />
      <span id="likeCount_blog${blog._id}">${blog.likes?.length ?? 0}</span>
    </div>
    <div class="comment">
        <img src="./imgs/basil_comment-solid.png" alt="" />
        <span>${blog.comments?.length ?? 0}</span>
    </div>
    </div>
    <div class="line"></div>
    <div class="reply">
      <h2>Replies</h2>

    </div>
    <div id="comment">
      
      
    </div>
  `;
  updateCommentsSection(blog.comments);
}

const resBox = document.querySelector('.success');
const resErr = document.querySelector('.error');

const commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', (event) => handleCommentSubmit(event));

async function handleCommentSubmit(event) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (!token || !userId) {
    window.location.href = 'https://robsdagreat.github.io/MyBrand-Robert/login.html';
    return;
  }

  const articleId = localStorage.getItem('Article ID');
  if (!articleId) {
    resErr.textContent = 'No article ID found in the URL.';
    return;
  }

  event.preventDefault();
  const commentInput = event.target.elements.comment.value.trim();

  if (!commentInput) {
    resErr.textContent = "Please enter something to comment";
    return;
  }

  try {
    const userResponse = await fetch(`https://mybrand-backend-s9f7.onrender.com/api/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const userData = await userResponse.json();
    console.log(userData);
    if (userData && userData.userId && userData.username) {
      const userId = userData.userId;
      const username = userData.username;

      try {
        const response = await fetch(`https://mybrand-backend-s9f7.onrender.com/api/${articleId}/comments/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ user: { userId, username }, comment: commentInput, blogId: articleId }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Comment added successfully:', data);
          resBox.textContent = data.message;
          commentInput.value = '';
          updateCommentsSection(data.blog.comments);
        } else {
          const { message } = await response.json();
          resErr.textContent = `Error adding comment:, ${message}`;
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    } else {
      resErr.textContent = 'Error fetching user data.';
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
  

function updateCommentsSection(comments) {
  const commentsContainer = document.querySelector('.reply');
  commentsContainer.innerHTML = '';

  comments.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment-item');
    commentElement.innerHTML = `
      <div class="profile">
        <div class="name"><span>@${comment.user.username}</span></div>
      </div>
      <div class="reply">
        <p>${comment.comment}</p>
      </div>
      <div class="time">
        <div class="date2"><span>${new Date(comment.createdAt).toLocaleTimeString()}</span></div>
        <div class="separate2"><span>.</span></div>
        <div class="date3"><span>${new Date(comment.createdAt).toLocaleDateString()}</span></div>
      </div>
    `;
    commentsContainer.appendChild(commentElement);
  });
}

