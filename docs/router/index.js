import { register, render } from "https://cdn.jsdelivr.net/gh/discovery-solutions/react@master/dist/index.es.js";
import "pages/about.js";
import "pages/home.js";

const App = () => {
  return render`
    <reactive-router root="true">
      <template data-route="/">
        <page-home></page-home>
      </template>
      <template data-route="/about">
        <page-about></page-about>
      </template>
    </reactive-router>
  `;
}

register(App, "my-app"); // Must have an hypen (JS Rules, not mine)