import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import BlogListItem from "./BlogListItem";
import Comment from "./Comment";
import { PostContext } from "../App";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
  padding: 12px;
  border-top: 6px inset slategray;
  border-bottom: 6px inset slategray;
  background: linear-gradient(#d1e8fe, #7e95a9);

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

  & .main-child-section {
    width: 100%;
    max-width: 70ch;
  }

  & .error {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
  }

  @media (min-width: 850px) {
    & h2 {
      font-size: 2.5rem;
    }

    & .blog-posts-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    }
  }
`;

const MainView = () => {
  const { posts, comments, updateViewingPost } = useContext(PostContext);

  return (
    <StyledMain>
        <section className="blog-posts-section">
          <ul className="blog-posts-list">
            {posts.map((post) => (
              <BlogListItem
                key={post.id}
                post={post}
                updateViewingPost={updateViewingPost}
                comments={comments}
              />
            ))}
          </ul>
        </section>
    </StyledMain>
  );
};

export default MainView;
