
    const likePost= (postId)=> {
        const likeCountElement = document.getElementById(`likeCount_${postId}`);
        let likeCount = parseInt(likeCountElement.textContent);
        likeCount++;
        likeCountElement.textContent = likeCount;
    }

    const addComment = (postId)=> {
        const commentInput = document.getElementById(`commentInput_${postId}`);
        const commentList = document.getElementById(`commentList_${postId}`);

        const commentText = commentInput.value;
        if (commentText.trim() === '') {
            alert('Please enter a valid comment.');
            return;
        }

        
        const newComment = document.createElement('li');
        newComment.textContent = commentText;

        
        commentList.appendChild(newComment);

        
        commentInput.value = '';
    }
