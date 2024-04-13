
const articleForm = document.getElementById('new');


articleForm.addEventListener('submit', async(e) => {
  e.preventDefault(); 


  const author = e.target.elements.author.value.trim();
  const title = e.target.elements.title.value.trim();
  const content = e.target.elements.story.value.trim();
  const imageFile = e.target.elements.image.files[0];


  const article = {
    id: Date.now(),
    author, 
    title,
    content,
    image: imageFile ? URL.createObjectURL(imageFile) : null ,
    createdAt: new Date().toISOString(), 
  };

  try{
    const userRole = localStorage.getItem('userRole');
    const token = userRole === 'admin'
      ? localStorage.getItem('adminToken')
      : localStorage.getItem('userToken');

    if (!token) {
      throw new Error('You must be logged in to create a blog post');
    }

    const response = await fetch('https://mybrand-backend-s9f7.onrender.com/api/blog/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    });

    if(response.ok){
      const data = await response.json();
      return data;

    } else{
      const error = await response.text();
      alert(`Error creating blog post : ${error}`);
    }
  } catch(error){
    alert('Error occured while creating a blog. Please try again later');
    console.error('Error:', error);
  }
});