import { useState, useEffect } from 'react'
import SignIn from './components/SignIn';
import MainView from './components/MainView';

function App() {
  const [viewingPost, setViewingPost] = useState(null)
  const [posts, setPosts] = useState([])

  function updateViewingPost(post) {
    setViewingPost(post)
  }

  function setLocalStorage(key, value) {
    localStorage.setItem(key, value)
  }

  console.table(viewingPost);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <header>
        <h1>Blog Site</h1>
      </header>
      <SignIn setLocalStorage={setLocalStorage} />
      <MainView posts={posts} viewingPost={viewingPost} updateViewingPost={updateViewingPost} />
      <footer>
        Made by Wade
      </footer>
    </>
  )
}

export default App
