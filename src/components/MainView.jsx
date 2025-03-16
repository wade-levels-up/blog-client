import React from "react";
import BlogListItem from "./blogListItem";
import Comment from "./Comment";
import { format } from "date-fns";

const MainView = ({ posts, comments, viewingPost, updateViewingPost}) => {
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
                    <span><button>Add Comment</button></span>
                    <ul>
                        {comments.map((comment) => {
                            return <Comment comment={comment} />
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