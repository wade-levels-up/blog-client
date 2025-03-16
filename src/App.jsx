import { useState, useEffect } from 'react'
import SignIn from './components/SignIn';
import MainView from './components/MainView';

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
    setSignInStatus('logged out')
  }

  function logIn(usernameData) {
    setUsername(usernameData);
    setSignInStatus('logged in')
  }

  function viewSignUp() {
    setSignInStatus('signing up')
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
    .catch(error => console.error(error.message))
  }, []);

  return (
    <>
      <header>
        <h1>Biggus Blogus</h1>
      </header>
      <SignIn usernameData={username} setLocalStorage={setLocalStorage} viewSignUp={viewSignUp} signInStatus={signInStatus} logOut={logOut} logIn={logIn}/>
      <MainView posts={posts} comments={comments} viewingPost={viewingPost} updateViewingPost={updateViewingPost} />
      <footer>
        Made by Wade
      </footer>
    </>
  )
}

export default App
