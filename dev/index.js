import { register, render, useState } from './dist/index.mjs';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [a, b] = useState(10);
  const onClick = () => {
    console.log('count', count);
    setCount(count + 1);
    console.log('a', a);
    b(a + 1);
  }

  return render`
    <div>
      <p>${count}</p>
      <button onclick="${onClick}">Add</button>
    </div>
  `;
};

register(Counter, 'my-counter');
