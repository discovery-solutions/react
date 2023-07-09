import { register, render } from "/dist/index.es.js";
import "/src/dev/pages/home.js";
import "/src/dev/pages/about.js";

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