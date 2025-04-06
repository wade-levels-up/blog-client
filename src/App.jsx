import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";
import styled from "styled-components";
import SignIn from "./components/SignIn";
import MainView from "./components/MainView";
import BlogPost from "./components/BlogPost";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />
  },
  {
    path: "/posts/:postid",
    element: <BlogPost />
  }
]);

// Styled Components

const StyledLoader = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding-top: 32px;
  width: 100%;
`;

const StyledHeader = styled.header`
  padding: 20px;

  & h1 {
    font-family: "Big Shoulders Stencil";
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: 25px;
    width: 100%;
  }

  & i {
    display: none;
  }

  @media (min-width: 450px) {
    & i {
      display: inline-block;
    }
  }
`;

const StyledFooter = styled.footer`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 12px;
`;

export const PostContext = createContext({
  username: "",
  posts: [],
  comments: [],
  getComments: () => {},
  deleteComment: () => {},
  viewingPost: {},
  updateViewingPost: () => {}
})

// Component

function App() {
  const [username, setUsername] = useState("");
  const [signInStatus, setSignInStatus] = useState("logged out");
  const [viewingPost, setViewingPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  function updateViewingPost(post) {
    setViewingPost(post);
  }

  function setLocalStorage(key, value) {
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsername("");
    setSignInStatus("logged out");
  }

  function logIn(usernameData) {
    setUsername(usernameData);
    setSignInStatus("logged in");
  }

  function viewSignUp() {
    setSignInStatus("signing up");
  }

  async function deleteComment(commentId) {
    const token = localStorage.getItem("token");
    await fetch(
      `https://blog-proxy-production.up.railway.app/app/users/${username}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch((error) => console.error(error));
    getComments();
  }

  async function getComments() {
    fetch(`https://blog-proxy-production.up.railway.app/app/comments`, { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          const error = new Error("Server Error");
          error.status = response.status;
          throw error;
        }
        return response.json();
      })
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => {
        console.error(error.message);
        setComments([]);
      });
  }

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error(error);
      return true;
    }
  }

  useEffect(() => {
    const usernameData = localStorage.getItem("user");
    const tokenData = localStorage.getItem("token");

    if (tokenData && isTokenExpired(tokenData)) {
      logOut();
    } else {
      if (tokenData) {
        setSignInStatus("logged in");
      }
      if (usernameData) {
        const parsedUsernameData = JSON.parse(usernameData);
        setUsername(parsedUsernameData.username);
      }
    }

    fetch(`https://blog-proxy-production.up.railway.app/app/posts`, { mode: "cors" })
      .then((response) => {
        setLoading(true);
        if (response.status >= 400) {
          const error = new Error("Server Error");
          error.status = response.status;
          throw error;
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });

    fetch(`https://blog-proxy-production.up.railway.app/app/comments`, { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          const error = new Error("Server Error");
          error.status = response.status;
          throw error;
        }
        return response.json();
      })
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => {
        console.error(error.message);
        setComments([]);
      });
  }, []);

  
  return (
      <PostContext.Provider value={{username, posts, comments, getComments, deleteComment, viewingPost, updateViewingPost}}>
        <StyledHeader>
          <h1>
            Co.Blog<i className="fa-solid fa-pencil"></i>
          </h1>
        </StyledHeader>
        <hr />
        <SignIn
          usernameData={username}
          setLocalStorage={setLocalStorage}
          viewSignUp={viewSignUp}
          signInStatus={signInStatus}
          logOut={logOut}
          logIn={logIn}
          updateViewingPost={updateViewingPost}
        />
        {loading ? (
          <StyledLoader id="loading">
            <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
            <p>Loading Posts...</p>
          </StyledLoader>
        ) : (
          <RouterProvider router={router}/>
        )}
        <StyledFooter><a style={{textDecoration: "none", color: "black"}} href="https://github.com/wade-levels-up" target="blank"><i class="fa-brands fa-square-github fa-2xl"></i> Made by Wade</a></StyledFooter>
      </PostContext.Provider>
  );
}

export default App;
