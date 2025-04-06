import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BlogListItem from "./BlogListItem";
import Comment from "./Comment";
import { PostContext } from "../App";

const StyledMain = styled.main`
  display: flex; 
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
  padding: 12px;
  border-top: 6px inset slategray;
  border-bottom: 6px inset slategray;
  background: linear-gradient(#d1e8fe, #7e95a9);

  & h2 {
    font-size: 2rem;
  }

  & textarea {
    width: 100%;
    font-size: 16px;
    padding: 3px 9px;
    margin-bottom: 6px;
    resize: vertical;
  }

  & .postBannerImage {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 300px;
  }

  & .blog-posts-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  & .blog-posts-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  & .comment-form {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background-color: slategray;
    padding: 12px;
  }

  & .comment-form li {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  & .comment-form input {
    margin-left: 12px;
    margin-bottom: 12px;
    width: 100%;
  }

  & .comments-list {
    display: flex;
    flex-direction: column;
  }

  & .post-menu {
    display: flex;
    padding: 3px;
    background-color: slategray;
    justify-content: space-between;
  }

  & .post-content {
    text-wrap: pretty;
    white-space: pre-wrap;
  }

  & .post-content::first-letter {
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 1px;
  }

  & .main-child-section {
    width: 100%;
    max-width: 70ch;
  }

  & .error {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
  }

  @media (min-width: 850px) {
    & h2 {
      font-size: 2.5rem;
    }

    & .blog-posts-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    }
  }
`;

const BlogPost = () => {
  const { postid } = useParams()
  const { username, posts, comments, getComments, deleteComment } = useContext(PostContext);

  const [post, setPost] = useState({})
  const [content, setContent] = useState("");
  const [viewingPostCommentCount, setViewingPostCommentCount] = useState(0);
  const [error, setError] = useState("");

  async function handleSubmitComment(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3000/posts/${postid}/comments`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      }
    );

    if (response.ok) {
      setContent("");
      setError("");
      getComments();
    } else {
      const errorData = await response.json();
      setError(`Add comment failed: ${errorData.message}`);
      console.error(`Add comment failed: ${errorData.message}`);
    }
  }

  useEffect(() => {
    let postComments = 0;
    comments.forEach((comment) => {
      if (post && comment.postId === post.id) {
        postComments = postComments + 1;
      }
    });
    setError("");
    setViewingPostCommentCount(postComments);
  }, [comments, post]);

  useEffect(() => {
        posts.forEach((post) => {
            if (+post.id === +postid) {
                setPost(post)
            }
        })
  }, [posts, postid])


  return (
    <StyledMain>
        <>
          <section className="main-child-section">
            <h2>{post.title}</h2>
            {post.image ? (<div className="postBannerImage" style={{backgroundImage: `url(${post.image})`}}></div>) : (<div></div>)}
            <span className="post-menu">
              <div>By {post.author}</div>
              <button onClick={() => {navigator.clipboard.writeText(window.location.href).then(alert('Link copied to clipboard'))}} className="linkButton" href="">Share <i className="fa-solid fa-share"></i></button>
            </span>
            <p className="post-content">{post.content}</p>
          </section>
          <hr />
          <section className="main-child-section">
            <h3>{viewingPostCommentCount} Comment/s</h3>
            {username ? (
              <form className="comment-form" onSubmit={handleSubmitComment}>
                <span>Leave a comment on this post</span>
                <ul>
                  <li>
                    <label hidden htmlFor="content">
                      Comment{" "}
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      maxLength={1000}
                      required
                    />
                  </li>
                  <li>
                    <button type="Submit">Submit</button>
                  </li>
                </ul>
                {error ? <p className="error">{error}</p> : <p></p>}
              </form>
            ) : (
              <span>
                Thinking of sharing your thoughts? <a href="#SignIn">Log in</a> to post comments
              </span>
            )}
            <ul className="comments-list">
              {comments.map((comment, index) => {
                if (comment.postId === post.id) {
                  return (
                    <Comment
                      key={comment.id}
                      username={username}
                      comment={comment}
                      getComments={getComments}
                      deleteComment={deleteComment}
                      index={index}
                    />
                  );
                }
              })}
            </ul>
          </section>
        </>
    </StyledMain>
  );
};

export default BlogPost;
