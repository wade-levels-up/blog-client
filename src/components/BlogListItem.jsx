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
   transition: transform ease 200ms;
   transition: filter ease 150ms;

   &:hover {
    transform: scale(1.02);
    filter: drop-shadow(0px 5px 2px black);
   }

   & h2 {
    padding: 12px;
    background-color: aliceblue;
    border-radius: 16px 16px 0px 0px;
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
                <h2><i class="fa-solid fa-newspaper"></i> {post.title}</h2>
                <span><div>By {post.author}</div><div>Published | {format(post.created, 'dd.M.yy')}</div></span>
            </StyledBlogListItem>
}

export default BlogListItem;