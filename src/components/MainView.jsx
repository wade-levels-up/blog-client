import React from "react";
import { useState } from "react";
import styled from "styled-components";
import BlogListItem from "./blogListItem";
import Comment from "./Comment";

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    align-items: center;
    padding: 12px;
    border-top: 2px ridge slategray;
    border-bottom: 2px ridge slategray;

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

    & section {}

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

    & .post-menu {
        display: flex;
        padding: 3px;
        background-color: slategray;
        justify-content: space-between;
    }

    & .post-content {
        max-width: 65ch;
        text-wrap: pretty;
    }

    & .post-content::first-letter {
        font-size: 1.5rem;
        font-weight: 300;
        letter-spacing: 1px;
    }

    & .comments-list {
        display: flex;
        flex-direction: column;
    }

    & .main-child-section {
        width: 80%;
        max-width: 1000px;
    }
`

const MainView = ({ username, posts, comments, getComments, deleteComment, viewingPost, updateViewingPost}) => {
    const [content, setContent] = useState("");

    async function handleSubmitComment(event) {
        event.preventDefault();
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/posts/${viewingPost.id}/comments`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {
            getComments();
        } else {
            console.error("Add comment failed");
        }
    }

    return (
        <StyledMain>
            {viewingPost ? (
                <>
                 <section className="main-child-section">
                    <h2>{viewingPost.title}</h2>
                    <span className="post-menu" ><div>By {viewingPost.author}</div><button onClick={() => updateViewingPost(null)}>Close Article</button></span>
                    <p className="post-content">{viewingPost.content}</p>
                </section>
                <hr />
                <section className="main-child-section">
                    <h3>Comments</h3>
                    {username ? (
                        <form className="comment-form" onSubmit={handleSubmitComment}>
                            <span>Leave a comment on this post</span>
                            <ul>
                                <li>
                                    <label htmlFor="content">Comment </label>
                                    <input type="text" id="content" name="content" onChange={(e) => setContent(e.target.value)}/>
                                </li>
                                <li>
                                    <button type="Submit">Submit</button>
                                </li>
                            </ul>
                        </form>
                    ) : (
                        <span>Thinking of sharing your thoughts? Log in to post comments</span>              
                    ) }
                    <ul className="comments-list">
                        {comments.map((comment) => {
                            if (comment.postId === viewingPost.id) {
                                return <Comment key={comment.id} username={username} comment={comment} getComments={getComments} deleteComment={deleteComment} />
                            } 
                        })}
                    </ul>
                </section>
                </>
            ) : (
                <section className="blog-posts-section">
                    <ul className="blog-posts-list">
                        {posts.map((post) => (
                            <BlogListItem key={post.id} post={post} updateViewingPost={updateViewingPost}/>
                        ))}
                    </ul>
                </section>
            )}
        </StyledMain>
    );
}

export default MainView;