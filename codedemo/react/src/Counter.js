
import React, { useState } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  //重置方法
  const reset = () => {
    setCount(0);
  };



  return (
    <div className="counter">
      <h1>Simple Counter</h1>
      <p>{count}</p>
      <div className="buttons">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
