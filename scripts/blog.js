const getAllBlogs = async () => {
  try {
    const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/blogs');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Response:', data);
    return data;
  } catch (error) {
    console.error('An error occurred during getting all blogs', error);
    return [];
  }
}



// const blogContainer = document.querySelector('#blogContainer');

// function renderArticle(article) {
//   const articleElement = document.createElement('div');
//   articleElement.classList.add('blog');
  
  
//   articleElement.innerHTML = `
//     <div class="profile">
//       <div class="img"><img src="./imgs/et_profile-male.png" alt="" /></div>
//       <div class="name"><span>@${article.author}</span></div>
//       <div class="separate"><span>.</span></div>
//       <div class="date"><span>${new Date(article.createdAt).toLocaleString()}</span></div>
//     </div>
//     <div class="content">
//       <div class="story">
//         <p><span id="title">${article.title}</span> ${article.content.slice(0, 100)}...</p>
//       </div>
//       <div class="cover">
//         <a href="./blogpost.html"><img src="${article.image}" alt="" /></a>
//       </div>
//     </div>
//     <div class="react">
//       <div class="like">
//         <img class="blogLike" src="./imgs/icon-park-twotone_like.png" alt="" data-article-id="${article.id}" />
//         <span id="likeCount_blog${article._id}">${article.likes.length}</span>
//       </div>
//       <div class="comment">
//         <a href="./blogpost.html"><img src="./imgs/basil_comment-solid.png" alt="" /></a>
//         <span>0</span>
//       </div>
//     </div>
//     <div id="comment">
//       <span class="com">Comments</span>
//       <div class="name"><span>@Musafiri_yves</span></div>
//     </div>
//     <div class="reply">
//       <p>Wow! I can't wait to experience it.</p>
//     </div>
//     <div class="time">
//       <div class="date2"><span>12:39 AM</span></div>
//       <div class="separate2"><span>.</span></div>
//       <div class="date3"><span>${new Date(article.createdAt).toLocaleString()}</span></div>
//     </div>
//     <div class="line"></div>
//   `;

//  return articleElement; 
// }

// async function renderBlogs() {
//     const blogs = await getAllBlogs();
//     blogs.forEach(blog => {
//       const articleElement = renderArticle(blog);
//       blogContainer.appendChild(articleElement);
//     });
//   }

