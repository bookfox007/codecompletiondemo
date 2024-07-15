
import React from 'react';
import Counter from './Counter';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  

  return (

    <div className={theme}>
          
        <div className="App">
          <Counter />
        </div>
    </div>
  );
}

export default App;
