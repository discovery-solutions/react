import { register, render, useEffect, useState } from "https://cdn.jsdelivr.net/gh/discovery-solutions/react@master/dist/index.es.js";

const POSTS_API = "https://jsonplaceholder.typicode.com/posts";

function Home() {
  const [ posts, setPosts ] = useState([]);

  const fetchPosts = async () => {
    try {
      const raw = await fetch(POSTS_API);
      const res = await raw.json();

      setPosts(res);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return render`
    <div class="flex flex-col gap-4 p-4">
      <div>
        <h1>This is the home page</h1>
        <reactive-link href="/about">Go To About</reactive-link>
      </div>

      <div class="grid grid-cols-4 gap-4">
        ${ posts.slice(0, 10).map(post => render`
          <div class="bg-slate-300 p-2 rounded">
            <h3 class="text-lg font-bold">${post.title}</h3>
            <p>${post.body.slice(0, 100)}</p>
          </div>
        `)}
      </div>
    </div>
  `;
}

export default register(Home, "page-home");