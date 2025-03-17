import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

const StyledBlogListItem = styled.li`
   display: flex;
   flex-direction: column;
   border-radius: 16px;
   width: 80%;
   max-width: 650px;
   cursor: pointer;
   transition: filter ease 600ms;

   &:hover {
    filter: drop-shadow(5px 3px 2px black);
   }

   & h2 {
    padding: 12px 8px;
    background-color: slategray;
    border-radius: 16px 16px 0px 0px;
    display: flex;
    align-items: center;
    gap: 18px;
    border-bottom: 1px solid black;
   }

   & span {
    display: flex;
    justify-content: space-between;
    background-color: slategray;
    border-radius: 0px 0px 16px 16px;
    padding: 8px;
   }
`

const BlogListItem = ({post, updateViewingPost}) => {
    return   <StyledBlogListItem onClick={() => updateViewingPost(post)}>
                <h2>{post.title}</h2>
                <span><div>By {post.author}</div><div>/ {format(post.created, 'dd.M.yy')}</div></span>
            </StyledBlogListItem>
}

export default BlogListItem;