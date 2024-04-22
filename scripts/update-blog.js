document.addEventListener('DOMContentLoaded', () => {
    const updateBlogForm = document.getElementById('updateForm');
    const titleInput = document.getElementById('update-title');
    const storyTextarea = document.getElementById('update-story');
    const imageInput = document.getElementById('update-image');
    const resBox = document.querySelector('.success');
    const resErr = document.querySelector('.error');
  
    const updateBlog = async (blogId, title, story, image) => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          resErr.textContent = 'User is not logged in';
          return;
        }
  
        const requestPayload = { title, story, image };
        const response = await axios.put(`https://mybrand-backend-s9f7.onrender.com/api/blog/edit/${blogId}`, requestPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          console.log('Response:', response.data);
          resBox.textContent = response.data.message;
        } else {
          console.error('Error updating article:', response.data);
          resErr.textContent = `Error updating article: ${response.data.message}`;
        }
      } catch (error) {
        console.error('Error updating article:', error);
        resErr.textContent = 'An error occurred while updating the article. Please try again later.';
      }
    };
  
    if (updateBlogForm) {
      updateBlogForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const blogId = document.getElementById('blogId').value;
        const updatedTitle = titleInput.value;
        const updatedStory = storyTextarea.value;
        const updatedImage = imageInput.value;
  
        if (!updatedTitle || !updatedStory || !updatedImage) {
          resErr.textContent = 'Please fill in all the required fields.';
          return;
        }
  
        await updateBlog(blogId, updatedTitle, updatedStory, updatedImage);
      });
    }
  
    // Set the value of blogId input field from URL parameters
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');
    const blogIdInput = document.getElementById('blogId');
    blogIdInput.value = blogId;
  });
  