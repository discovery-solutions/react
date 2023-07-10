This is an example project showcasing the usage of the "React by DSCVR Solutions" library. It demonstrates how to create a simple single-page application with multiple routes using the library.

## Installation

To use the library, you can include it directly in your HTML file using a CDN link. In the example below, we include it from the `cdn.jsdelivr.net` CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/discovery-solutions/react@master/dist/index.es.js" type="module" defer></script>
```

## Usage

To create a single-page application with multiple routes, follow the steps below:

1. Create an `index.html` file and include the necessary script and link tags:

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <title>React by DSCVR Solutions</title>
       <link href="https://placehold.co/40" rel="icon" type="image/png" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
     
       <script src="index.js" type="module" defer></script>
       <link href="styles.css" rel="stylesheet"/>
     </head>
     <body>
       <my-app></my-app>
     </body>
   </html>
   ```

2. Create an `index.js` file to define your main application component:

   ```javascript
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
   
   register(App, "my-app"); // Must have a hyphen (JS Rules, not mine)
   ```

3. Create separate component files for each route. For example, create a `pages/home.js` file for the home page component:

   ```javascript
   import { register, render, useEffect, useState } from "https://cdn.jsdelivr.net/gh/discovery-solutions/react@master/dist/index.es.js";
   
   const POSTS_API = "https://jsonplaceholder.typicode.com/posts";
   
   function Home() {
     const [posts, setPosts] = useState([]);
   
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
           ${posts.slice(0, 10).map(post => render`
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
   ```

4. Create a similar component file for the about page. For example, create a `pages/about.js` file:

   ```javascript
   import { register, render } from "https://cdn.jsdelivr.net/gh/discovery-solutions/react@master/dist/index.es.js";
   
   function About() {
     return render`
       <div>
         <h1>Welcome to our about page!</h1>
         <reactive-link href="/">Go Back to HomePage</reactive-link>
       </div>
     `;
   }
   
   export default register(About, "page-about");
   ```

## Build and Run

To build and run the project, follow these steps:

1. Open the terminal and navigate to the project directory.

2. Serve the project directory using a local server of your choice. For example, you can use the `http-server` package:

   ```bash
   npx http-server
   ```

3. Open your browser and access the provided local server URL. The application should be running, and you can navigate between the home and about pages using the provided links.

## Additional Information

- The `index.html` file serves as the entry point for your application. It includes the necessary script and link tags for the library, as well as your main application component `<my-app>`.

- The `index.js` file imports the necessary functions from the "React by DSCVR Solutions" library and registers the main application component using the `register` function.

- The `pages/home.js` file and `pages/about.js` file demonstrate how to create page components using the library. These components can be registered using the `register` function and

imported in the `index.js` file to define the routes of the application.

- The `Home` component in `pages/home.js` demonstrates the usage of hooks like `useEffect` and `useState`. It fetches data from the JSONPlaceholder API and renders a list of posts.

- The `About` component in `pages/about.js` is a simple component that displays a welcome message and a link to go back to the home page.

- The example uses the `reactive-router` component provided by the library to handle routing. The `<template>` elements within the `reactive-router` define the routes and their corresponding components.

- The example also includes a simple CSS file `styles.css` that can be used to style the components.

Please note that this example assumes you have a basic understanding of HTML, JavaScript, and the concepts of single-page applications and component-based development using React-like libraries.

Feel free to modify and enhance the example code to suit your specific needs and project requirements. Happy coding with "React by DSCVR Solutions"!