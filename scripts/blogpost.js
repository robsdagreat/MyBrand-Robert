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
        <span>Loading...</span>
    </div>
    </div>
    <div class="line"></div>
    <div class="reply">
      <h2>Replies</h2>

    </div>
    <div id="comment">
      
      
    </div>
  `;
  fetchCommentsForBlog(blog._id);
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
    if (userData && userData.user.userId && userData.user.username) {
      const userId = userData.user.userId
      const username = userData.user.username;
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
          const comments = await response.json();
          console.log('Comment added successfully:', comments);
          resBox.textContent = comments.message;
          commentInput.value = '';
          fetchCommentsForBlog(articleId);
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

async function fetchCommentsForBlog(blogId) {
  try {
    const response = await fetch(`https://mybrand-backend-s9f7.onrender.com/api/comments/${blogId}`);
    if (response.ok) {
      const comments = await response.json();
      updateCommentCount(comments.length);
      updateCommentsSection(comments);
    } else {
      console.error('Error fetching comments:', response.status);
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}
  

function updateCommentCount(count) {
  const commentCountElement = document.querySelector('.comment span');
  commentCountElement.textContent = count;
}

function updateCommentsSection(comments) {
  const commentsContainer = document.querySelector('.reply');

  if (Array.isArray(comments)) {
    comments.forEach(comment => {
      const commentElement = createCommentElement(comment);
      commentsContainer.appendChild(commentElement);
    });
  } else if (typeof comments === 'object' && comments !== null) {
    const commentElement = createCommentElement(comments);
    commentsContainer.appendChild(commentElement);
  } else {
    console.error('Invalid comments data:', comments);
  }
}

function createCommentElement(comment) {
  const commentElement = document.createElement('div');
  commentElement.classList.add('comment-item');
  commentElement.innerHTML = `
  
    <div>
      <div id="commentUser"><span>@${comment.user.username}</span></div>
    </div>
    <div id="commentDiv">
    <div>
      <p id="commentComment">${comment.comment}</p>
    </div>
    <div id="commentTime">
      <div><span>${new Date(comment.createdAt).toLocaleTimeString()}</span></div>
      <div><span>.</span></div>
      <div><span>${new Date(comment.createdAt).toLocaleDateString()}</span></div>
    </div>
    </div>  
  `;
  return commentElement;
}


