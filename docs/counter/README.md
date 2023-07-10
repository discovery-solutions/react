This is an example project showcasing the usage of the "React by DSCVR Solutions" library. It demonstrates how to create a simple counter component with state management, effects, and a ref.

## Installation

To use the library, you can include it directly in your HTML file using a CDN link. In the example below, we include the library from the `cdn.jsdelivr.net` CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/discovery-solutions/react@master/dist/index.es.js" type="module" charset="utf-8"></script>
```

## Usage

To create the counter component with state management, effects, and a ref, follow the steps below:

1. Create an `index.html` file and include the necessary script tags:

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8">
       <title>DSCRV React</title>
   
       <script src="/docs/counter.js" charset="utf-8" type="module"></script>
     </head>
     <body>
       <x-counter></x-counter>
     </body>
   </html>
   ```

2. Create a `counter.js` file to define your counter component:

   ```javascript
   import { register, render, useState, useEffect, useRef } from "https://cdn.jsdelivr.net/gh/discovery-solutions/react@master/dist/index.es.js";
   
   function Counter() {
     const [count, setCount] = useState(0);
     const ref = useRef();
   
     useEffect(() => {
       console.log("Should only run once");
     }, []);
   
     useEffect(() => {
       setTimeout(() => {
         console.log("Logging the counter after 1 second: " + count);
       }, 1000);
   
       return () => {
         console.log("I'm on the cleanup function");
       }
     }, [count]);
   
     useEffect(() => {
       console.log(ref); // Should render a dom element
     }, [ref]);
   
     return render`
       <div ref=${ref}>
         <p>You clicked ${count} times</p>
         <button onclick="${() => setCount(count + 1)}">
           Click me
         </button>
       </div>
     `;
   }
   
   register(Counter);
   ```

3. Include the `<x-counter>` custom element in your HTML file. The `register` function is used to register the `Counter` component.

4. Open the HTML file in your browser. You should see the counter component rendered with a counter value and a button to increment the count.

5. The counter component demonstrates the usage of hooks such as `useState`, `useEffect`, and `useRef`. The state `count` keeps track of the counter value, and the `setCount` function is used to update it.

6. The first `useEffect` is called only once when the component is mounted. It logs a message to the console.

7. The second `useEffect` is called whenever the `count` value changes. It logs the counter value to the console after a delay of 1 second. It also returns a cleanup function that logs a message when the component is unmounted or when the `count` value changes.

8. The third `useEffect` is called whenever the `ref` value changes. It logs the `ref` object to the console. The `ref` is assigned to the `div` element using the `ref` attribute.

## Additional Information

- The example demonstrates the basic usage of the "DSCRV React" library for creating components, managing state with hooks, and performing side effects using `useEffect`.

- The example also showcases the usage of the `ref` object to reference a DOM element within the component.

- Feel free to modify and enhance the example code to suit your specific needs and project requirements.

- Make sure to refer to the documentation of the "DSCRV React" library for more details on its features and APIs.

Happy coding with "DSCRV React"!