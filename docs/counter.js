import { register, render, useState, useEffect, useRef } from "https://cdn.jsdelivr.net/gh/discovery-solutions/react@master/dist/index.es.js";

function Counter() {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    // console.log("Should only run once");
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    //   console.log("Logging the counter after 1 second: " + count);
    // }, 1000);

    // return () => {
    //   console.log("I'm on the cleanup function");
    // }
  }, [count]);

  useEffect(() => {
    // console.log(ref);
  }, [ref]);

  return render`
    <div ref=${ref}>
      <p>You clicked ${count} times<p>
      <button onclick="${() => setCount(count + 1)}">
        Click me
      </button>
    </div>
  `;
}

register(Counter);
