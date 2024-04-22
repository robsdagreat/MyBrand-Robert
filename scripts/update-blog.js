console.log('updateBlogForm found');

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
            },
          });
          console.log('Response:', response.data);
          resBox.textContent = response.data.message; // Update this line to handle the response correctly
        } catch (error) {
          console.error('Error:', error);
          resErr.textContent = error.message;
        }
      };    
    if (updateBlogForm) {
        updateBlogForm.addEventListener('submit', async (event) => {
            
          event.preventDefault();
          const blogId = new URLSearchParams(window.location.search).get('id');
          const updatedTitle = titleInput.value;
          const updatedStory = storyTextarea.value;
          const updatedImage = imageInput.value;
          console.log('Form Data:', { blogId, updatedTitle, updatedStory, updatedImage });
          await updateBlog(blogId, updatedTitle, updatedStory, updatedImage);
        });
      }
  });
  