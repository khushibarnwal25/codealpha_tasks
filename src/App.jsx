import { useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");

  const addPost = () => {
    if (text.trim() === "") return;

    const newPost = {
      id: Date.now(),
      content: text,
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setText("");
  };

  const likePost = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? { ...post, likes: post.likes + 1 }
        : post
    );

    setPosts(updatedPosts);
  };

  const addComment = (id) => {
    if (comment.trim() === "") return;

    const updatedPosts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            comments: [...post.comments, comment],
          }
        : post
    );

    setPosts(updatedPosts);
    setComment("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        padding: "30px",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#00ffd5",
          marginBottom: "30px",
        }}
      >
        Social Media Platform 🌐
      </h1>

      {/* CREATE POST */}
      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          backgroundColor: "#1f2937",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            height: "100px",
            borderRadius: "10px",
            padding: "10px",
            border: "none",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={addPost}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "12px",
            backgroundColor: "#00ffd5",
            color: "black",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Create Post
        </button>
      </div>

      {/* POSTS */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              width: "500px",
              backgroundColor: "#1f2937",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <h3>{post.content}</h3>

            <button
              onClick={() => likePost(post.id)}
              style={{
                marginTop: "10px",
                backgroundColor: "orange",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ❤️ Like ({post.likes})
            </button>

            {/* COMMENTS */}
            <div style={{ marginTop: "20px" }}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                }}
              />

              <button
                onClick={() => addComment(post.id)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#00ffd5",
                  color: "black",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add Comment
              </button>

              <div style={{ marginTop: "15px" }}>
                {post.comments.map((c, index) => (
                  <p
                    key={index}
                    style={{
                      backgroundColor: "#374151",
                      padding: "8px",
                      borderRadius: "8px",
                    }}
                  >
                    💬 {c}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;