import React from "react";
import { useState } from "react";
import BlogListItem from "./blogListItem";
import Comment from "./Comment";
import { format } from "date-fns";

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
        <main>
            {viewingPost ? (
                <>
                 <section>
                    <h2>{viewingPost.title}</h2>
                    <span><div>Written by {viewingPost.author}</div><div>{format(viewingPost.created, 'dd/M/yy')}</div><button onClick={() => updateViewingPost(null)}>Close</button></span>
                    <p>{viewingPost.content}</p>
                </section>
                <section>
                    <h3>Comments</h3>
                    {username ? (
                        <form onSubmit={handleSubmitComment}>
                            <span>Leave a comment on this post</span>
                            <ul>
                                <li>
                                    <label htmlFor="content">Comment:</label>
                                    <input type="text" id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
                                </li>
                                <li>
                                    <button type="Submit">Submit</button>
                                </li>
                            </ul>
                        </form>
                    ) : (
                        <span>Thinking of sharing your thoughts? Log in to post comments</span>              
                    ) }
                    <ul>
                        {comments.map((comment) => {
                            if (comment.postId === viewingPost.id) {
                                return <Comment key={comment.id} username={username} comment={comment} deleteComment={deleteComment} />
                            } 
                        })}
                    </ul>
                </section>
                </>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <BlogListItem key={post.id} post={post} updateViewingPost={updateViewingPost}/>
                    ))}
                </ul>
            )}
        </main>
    );
}

export default MainView;