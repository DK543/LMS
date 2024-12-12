document.addEventListener("DOMContentLoaded", () => {
    const blogSection = document.getElementById("blog-section");
    const blogTitleInput = document.getElementById("blog-title");
    const videoUrlInput = document.getElementById("video-url");
    const addBlogButton = document.getElementById("add-blog");
  
    // Function to add a blog
    const addBlog = () => {
      const blogTitle = blogTitleInput.value.trim();
      const videoUrl = videoUrlInput.value.trim();
  
      if (blogTitle === "" || videoUrl === "") {
        alert("Please enter both a blog title and a video URL.");
        return;
      }
  
      // Validate video URL
      if (!isValidVideoUrl(videoUrl)) {
        alert("Please enter a valid YouTube video URL.");
        return;
      }
  
      // Create a new blog item
      const blogItem = document.createElement("div");
      blogItem.className = "blog-item";
  
      blogItem.innerHTML = `
        <h3>${blogTitle}</h3>
        <iframe src="${convertToEmbedUrl(videoUrl)}" allowfullscreen></iframe>
        <div class="actions">
          <button class="like-btn">👍 Like (<span class="like-count">0</span>)</button>
          <button class="comment-btn">💬 Comment</button>
        </div>
        <div class="comments">
          <h4>Comments:</h4>
          <ul></ul>
          <input type="text" placeholder="Add a comment" class="comment-input" />
        </div>
      `;
  
      // Like functionality
      const likeButton = blogItem.querySelector(".like-btn");
      const likeCount = blogItem.querySelector(".like-count");
      likeButton.addEventListener("click", () => {
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
      });
  
      // Comment functionality
      const commentInput = blogItem.querySelector(".comment-input");
      const commentList = blogItem.querySelector(".comments ul");
      commentInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          const commentText = commentInput.value.trim();
          if (commentText !== "") {
            const commentItem = document.createElement("li");
            commentItem.textContent = commentText;
            commentList.appendChild(commentItem);
            commentInput.value = "";
          }
        }
      });
  
      // Append to blog section
      blogSection.appendChild(blogItem);
      blogTitleInput.value = "";
      videoUrlInput.value = "";
      checkEmpty();
    };
  
    // Check if the blog section is empty
    const checkEmpty = () => {
      if (blogSection.children.length === 0) {
        blogSection.innerHTML = "<p>No blogs yet. Add your first one!</p>";
      } else {
        const placeholder = blogSection.querySelector("p");
        if (placeholder) placeholder.remove();
      }
    };
  
    // Validate YouTube URL
    const isValidVideoUrl = (url) => {
      const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
      return pattern.test(url);
    };
  
    // Convert YouTube URL to embed URL
    const convertToEmbedUrl = (url) => {
      return url.replace("watch?v=", "embed/");
    };
  
    // Event listener for Add Blog button
    addBlogButton.addEventListener("click", addBlog);
  });
  