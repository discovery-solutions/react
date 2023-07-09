import { register, render } from "/dist/index.es.js";

function Home() {
  return render`
    <div>
      <h1>This is the home page</h1>
      <reactive-link href="/about">Go To About</reactive-link>
    </div>
  `;
}

export default register(Home, "page-home");