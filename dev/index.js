import { register, render, useState, useEffect } from './dist/index.mjs';

register('my-counter', () => {
  const [var1, setVar1] = useState(0);
  const [var2, setVar2] = useState(10);

  const onClick = () => {
    // console.log('var1', var1);
    setVar1(var1 + 1);
    
    // setTimeout(() => {
    //   console.log('var2', var2);
    //   setVar2(var2 + 1);
    // }, 5000);
  }

  // useEffect(() => {
  //   console.log('effect for var2', var2);
  // }, [var2]);

  // useEffect(() => {
  //   console.log('effect for var1', var1)
  // }, [var1]);

  // useEffect(() => {
  //   console.log('effect for none')
  // }, []);

  return render`
    <div>
      <my-title data-title="${{ value: 'Testando title'}}"></my-title>
      <p>var1: ${var1}</p>
      <p>var2: ${var2}</p>
      <button onclick="${onClick}">Add</button>
    </div>
  `;
});


register('my-title', ({ title }) => {
  return render`
    <h1>${title.value}</h1>
  `;
});