import React from "react";
import { useState, useEffect } from "react";
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

    & .post-menu {
        display: flex;
        padding: 3px;
        background-color: slategray;
        justify-content: space-between;
    }

    & .post-content {
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
        width: 100%;
        max-width: 55ch;
    }

    @media (min-width: 850px) {
        & h2 {
            font-size: 2.5rem;
        }

        & .blog-posts-list {
            display: grid;
            grid-template-columns: repeat( auto-fit, minmax(450px, 1fr));
        }
    }
`

const MainView = ({ username, posts, comments, getComments, deleteComment, viewingPost, updateViewingPost}) => {
    const [content, setContent] = useState('');
    const [viewingPostCommentCount, setViewingPostCommentCount] = useState(0);

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

        setContent('');

        if (response.ok) {
            getComments();
        } else {
            console.error("Add comment failed");
        }
    }

    useEffect(() => {
        let postComments = 0;
        comments.forEach((comment) => {
            if (viewingPost && (comment.postId === viewingPost.id)) {
                postComments = postComments + 1;
            }
        })
        setViewingPostCommentCount(postComments)
    }, [comments, viewingPost])

    return (
        <StyledMain>
            {viewingPost ? (
                <>
                 <section className="main-child-section">
                    <h2>{viewingPost.title}</h2>
                    <span className="post-menu" ><div>By {viewingPost.author}</div></span>
                    <p className="post-content">{viewingPost.content}</p>
                </section>
                <hr />
                <section className="main-child-section">
                    <h3>{viewingPostCommentCount} Comment/s</h3>
                    {username ? (
                        <form className="comment-form" onSubmit={handleSubmitComment}>
                            <span>Leave a comment on this post</span>
                            <ul>
                                <li>
                                    <label hidden htmlFor="content">Comment </label>
                                    <textarea id="content" name="content" rows={3} value={content} onChange={(e) => setContent(e.target.value)} maxLength={300}/>
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
                            <BlogListItem key={post.id} post={post} updateViewingPost={updateViewingPost} comments={comments}/>
                        ))}
                    </ul>
                </section>
            )}
        </StyledMain>
    );
}

export default MainView;