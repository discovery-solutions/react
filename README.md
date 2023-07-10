# @dscrv-solutions/react

A lightweight, custom elements-based library for building reactive web components with a similar API to React.

## Features

- Custom elements-based components
- Reactive state management
- Client-side routing
- Basic hooks API (useState, useEffect, useRef)

## Examples

* ```Counter```: A simple counter with component and hooks [here](https://github.com/discovery-solutions/react/tree/master/docs/counter).
* ```Router```: A complete example with component, hooks, router and more, [right here.](https://github.com/discovery-solutions/react/tree/master/docs/counter).

## Usage

Here's a basic example of a component built with @dscrv-solutions/react:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Counter Example</title>
    <script type="module">
      import { register, render, useState } from 'https://cdn.jsdelivr.net/gh/discovery-solutions/react@master/dist/index.es.js';

      const Counter = () => {
        const [count, setCount] = useState(0);

        return render`
          <div>
            <p>${count}<p>
            <button onClick="${() => setCount(count + 1)}">Add more</button>
          </div>
        `;
      }

      register(Counter, "my-counter");
    </script>
  </head>
  <body>
    <my-counter></my-counter>
  </body>
</html>
```

You can then use this component in your HTML like any other custom element:

```html
<my-counter></my-counter>
```

## Routing

@dscrv-solutions/react includes a basic client-side router with two components: ```reactive-router``` and ```reactive-link```. Here's an example of how to use it:

```html
<reactive-router>
  <template data-route="/">
    <h1>Home</h1>
    <reactive-link href="/about">Go To About</reactive-link>
  </template>
  <template data-route="/about">
    <h1>About</h1>
    <reactive-link href="/contact">Go To Contact</reactive-link>
  </template>
  <template data-route="/contact">
    <h1>Contact</h1>
    <reactive-link href="/">Go To Home</reactive-link>
  </template>
</reactive-router>
```

## Hooks

@dscrv-solutions/react includes a basic hooks API. Here's an example of how to use the `useState` and `useEffect` hooks:

```javascript
import { register, render, useState, useEffect, useRef } from 'https://cdn.jsdelivr.net/gh/discovery-solutions/react@master/dist/index.es.js';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current); // Cleanup function
  }, []); // Empty dependencies array means this effect runs once on mount and clean up on unmount

  return render`
    <div>
      <p>Elapsed time: ${seconds} seconds<p>
      <button onClick="${() => clearInterval(intervalRef.current)}">Stop Timer</button>
    </div>
  `;
}

register(Timer, "my-timer");
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

MIT