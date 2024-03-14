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
