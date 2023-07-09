import { register, render } from "/dist/index.es.js";

function About() {
  return render`
    <div>
      <h1>Welcome to our about page!</h1>
      <reactive-link href="/">Go Back to HomePage</reactive-link>
    </div>
  `;
}

export default register(About, "page-about");