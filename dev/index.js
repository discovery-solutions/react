import { register, render, useState, useEffect } from './dist/index.mjs';

register('my-counter', () => {
  const [var1, setVar1] = useState(0);
  const [var2, setVar2] = useState(10);

  const onClick = () => {
    setVar1(var1 + 1);
    
    // setTimeout(() => {
    //   console.log('var2', var2);
    //   setVar2(var2 + 1);
    // }, 5000);
  }

  useEffect(() => {
    // console.log({var1})
    if (var1 === 5) setVar2(20);
  }, [var1]);

  useEffect(() => {
    // console.log({var2})
    if (var2 === 20) setVar1(0);
  }, [var2]);

  // useEffect(() => {
  //   console.log('effect for var2', var2);
  // }, [var2]);

  // useEffect(() => {
  //   console.log('effect for var1', var1)
  // }, [var1]);

  // useEffect(() => {
  //   console.log('effect for none')
  // }, []);

  const post = {"title":"AI Revolution in 2024","content":"Artificial Intelligence is transforming industries across the globe. Here's what you need to know.","author":"673a5694b47d0231408ce670","category":"673d29429b1b1181ee87b97d","tags":["AI","Machine Learning","Innovation"],"createdAt":"2024-11-20T00:53:18.179Z","updatedAt":"2024-11-20T00:53:18.179Z","deletedAt":null,"id":"673d2c7c6064c470ba9d574b"};

  return render`
    <div>
      <my-post data-post="${post}"></my-post>
      <p>var1: ${var1}</p>
      <p>var2: ${var2}</p>
      <button onclick="${onClick}">Add</button>
    </div>
  `;
});


register('my-post', ({ post }) => {
  console.log(post)
  return render`
    <h1>${post.title}</h1>
  `;
});