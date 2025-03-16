import React from "react";

const BlogListItem = ({post, updateViewingPost}) => {
    return   <li onClick={() => updateViewingPost(post)}>
                <h2>{post.title}</h2>
                <span><div>By {post.author}</div><div>{post.created}</div></span>
            </li>
}

export default BlogListItem;