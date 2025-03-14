import { useState, useEffect } from 'react'

function App() {
  const [posts, setPosts] = useState([])

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
    .catch(error => console.log(error.message))
  }, []);

  return (
    <>
      <header>
        <h1>Blog Site</h1>
      </header>
      <main>
        <ul>
          {posts.map((post) => {
            return <li key={post.id}>
                      <h2>{post.title}</h2>
                      <p>{post.content}</p>
                   </li>
          })}
        </ul>
      </main>
      <footer>
        Made by Wade
      </footer>
    </>
  )
}

export default App
