import React from "react";
import { format } from "date-fns";

const BlogListItem = ({post, updateViewingPost}) => {
    return   <li onClick={() => updateViewingPost(post)}>
                <h2>{post.title}</h2>
                <span><div>By {post.author}</div><div>{format(post.created, 'dd/M/yy')}</div></span>
            </li>
}

export default BlogListItem;