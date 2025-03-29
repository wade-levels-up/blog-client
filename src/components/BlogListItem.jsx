import React, { useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { useState } from "react";

const StyledBlogListItem = styled.li`
   display: flex;
   flex-direction: column;
   border-radius: 16px;
   width: 100%;
   height: 100%;
   max-width: 650px;
   cursor: pointer;
   animation-name: fade-in;
   animation-duration: 1s;
   animation-timing-function: ease-in;
   animation-iteration-count: 1;

   @keyframes fade-in {
    from {
      opacity: 0%;
    }
    to {
      opacity: 100%;
    }
  }

   &:hover {
    box-shadow: 5px 3px 2px black;
   }

   & h2 {
    flex: 1;
    padding: 12px 8px;
    background-color: slategray;
    border-radius: 16px 16px 0px 0px;
    display: flex;
    align-items: center;
    gap: 18px;
   }

   & .imageDiv {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: slategray;
    height: 200px;
   }

   & .summary {
    background-color: slategray;
    padding: 8px;
    text-wrap: pretty;
    hyphens: auto;
    border-top: 1px dotted black;
    border-bottom: 1px dotted black;
   }

   & .date {
    display: flex;
    justify-content: flex-end;
    background-color: slategray;
    padding: 0px 8px;
   }

   & span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #7f91a3;
    border-radius: 0px 0px 16px 16px;
    padding: 2px 8px;
   }

   & .blog-li-details {
    display: flex;
    gap: 4px;
   }
`

const BlogListItem = ({post, updateViewingPost, comments}) => {
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        let postComments = 0;
        comments.forEach((comment) => {
            if (comment.postId === post.id) {
                postComments = postComments + 1;
            }
        })
        setCommentCount(postComments)
    }, [comments, post.id])

    return   <StyledBlogListItem onClick={() => updateViewingPost(post)}>
                <h2>{post.title}</h2>
                <p className="date">{format(post.created, 'PPPP')}</p>
                {post.image ? ( <div className="imageDiv" style={{backgroundImage: `url(${post.image})`}}></div> ) : ( <div></div> )}
                <p className="summary">{post.summary}</p>
                <span>
                    <div>By {post.author}</div>
                    <div className="blog-li-details">
                        <p>{commentCount} <i className="fa-solid fa-comment"></i></p>
                    </div>
                </span>
            </StyledBlogListItem>
}

export default BlogListItem;