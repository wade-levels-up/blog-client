import React from "react";
import BlogListItem from "./blogListItem";

const MainView = ({ posts, viewingPost, updateViewingPost}) => {
    return (
        <main>
            {viewingPost ? (
                <section>
                    <h2>{viewingPost.title}</h2>
                    <p>{viewingPost.content}</p>
                    <button onClick={() => updateViewingPost(null)}>Close</button>
                </section>
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