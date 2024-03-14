document.addEventListener('DOMContentLoaded', () => {
    // ... Your existing code ...

    const addComment = (blogId) => {
        
        const getCurrentUserId = () => {
            return localStorage.getItem('userId');
        };
        
        const getCurrentUser = () => {
            const signedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const currentUserId = getCurrentUserId();
        
            return signedUsers.find(user => user.userId === currentUserId) || null;
        };
        

        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
            alert("Please log in to add a comment.");
            window.location.href = './login.html';
            return;
        }

        const commentInput = document.getElementById(`commentInput_${blogId}`);
        const commentList = document.getElementById(`commentList_${blogId}`);

        if (!commentInput || !commentList) {
            console.error(`Comment input or list not found for blogId: ${blogId}`);
            return;
        }

        const commentText = commentInput.value.trim();

        if (!commentText) {
            alert("Please enter a comment.");
            return;
        }

        
        const currentUser = getCurrentUser();

    
        const newComment = {
            userId: currentUserId,
            userName: currentUser ? currentUser.name : 'Anonymous',
            text: commentText,
            timestamp: new Date().toLocaleString(),
        };

        
        const comments = JSON.parse(localStorage.getItem(`comments_${blogId}`)) || [];

        
        comments.unshift(newComment);

        
        localStorage.setItem(`comments_${blogId}`, JSON.stringify(comments));

       
        commentInput.value = '';

        
        displayComments(blogId);
    };

    const displayComments = (blogId) => {
        const commentList = document.getElementById(`commentList_${blogId}`);

        if (!commentList) {
            console.error(`Comment list not found for blogId: ${blogId}`);
            return;
        }

       
        const comments = JSON.parse(localStorage.getItem(`comments_${blogId}`)) || [];

        
        commentList.innerHTML = '';

       
        comments.forEach((comment) => {
            const commentItem = document.createElement('li');
            commentItem.innerHTML = `
                <div class="profile">
                    <div class="img"><img src="./imgs/et_profile-male.png" alt="" /></div>
                    <div class="name"><span>@${comment.userName}</span></div>
                </div>
                <div class="story">
                    <p>${comment.text}</p>
                </div>
                <div class="time">
                    <div class="date2"><span>${comment.timestamp}</span></div>
                </div>
            `;
            commentList.appendChild(commentItem);
        });
    };

    
    const commentForms = document.querySelectorAll('.comment form');
    commentForms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const blogId = form.getAttribute('data-blog-id');
            addComment(blogId);
        });
    });

   
    const blogIds = ['blog1', 'blog2', 'blog3'];
    blogIds.forEach((blogId) => {
        displayComments(blogId);
    });
});
