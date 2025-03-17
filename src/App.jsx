import { useState, useEffect } from 'react'
import styled from "styled-components";
import SignIn from './components/SignIn';
import MainView from './components/MainView';

// Styled Components

const StyledHeader = styled.header`
  padding: 20px;

  & h1 {
    font-family: 'Big Shoulders Stencil';
    font-size: 2.6rem;
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
`

const StyledFooter = styled.footer`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 12px;
`

// Component

function App() {
  const [username, setUsername] = useState("");
  const [signInStatus, setSignInStatus] = useState('logged out');
  const [viewingPost, setViewingPost] = useState(null)
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([]);

  function updateViewingPost(post) {
    setViewingPost(post)
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
    localStorage.removeItem("username");
    setUsername("");
    setSignInStatus('logged out')
  }

  function logIn(usernameData) {
    setUsername(usernameData);
    setSignInStatus('logged in')
  }

  function viewSignUp() {
    setSignInStatus('signing up')
  }

  async function deleteComment(commentId) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/users/${username}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
      }
    }).catch(error => console.error(error));
    getComments();
  }

  async function getComments() {
    fetch('http://localhost:3000/comments', {mode: 'cors'})
    .then((response) => {
      if (response.status >= 400) {
        const error = new Error("Server Error");
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
    .then((data) => {
      setComments(data.comments)
    })
    .catch((error) => {
      console.error(error.message)
      setComments([])
    })
  }

  useEffect(() => {
    const usernameData = localStorage.getItem("user");
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      setSignInStatus('logged in')
    }    
    if (usernameData) {
      const parsedUsernameData = JSON.parse(usernameData);
      setUsername(parsedUsernameData.username);
    }

    fetch('http://localhost:3000/posts', {mode: 'cors'})
    .then((response) => {
      if (response.status >= 400) {
        const error = new Error("Server Error");
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
    .then((data) => {
      setPosts(data.posts)
    })
    .catch(error => console.error(error.message))


    fetch('http://localhost:3000/comments', {mode: 'cors'})
    .then((response) => {
      if (response.status >= 400) {
        const error = new Error("Server Error");
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
    .then((data) => {
      setComments(data.comments)
    })
    .catch((error) => {
      console.error(error.message)
      setComments([])
    })
  }, []);

  return (
    <>
      <StyledHeader>
        <h1>Co.Blog<i className="fa-solid fa-pencil"></i></h1>
      </StyledHeader>
      <hr />
      <SignIn usernameData={username} setLocalStorage={setLocalStorage} viewSignUp={viewSignUp} signInStatus={signInStatus} logOut={logOut} logIn={logIn}/>
      <MainView username={username} posts={posts} getComments={getComments} deleteComment={deleteComment} comments={comments} viewingPost={viewingPost} updateViewingPost={updateViewingPost} />
      <StyledFooter>
        Made by Wade
      </StyledFooter>
    </>
  )
}

export default App
