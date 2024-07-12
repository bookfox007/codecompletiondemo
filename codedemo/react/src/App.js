
import React from 'react';
import Counter from './Counter';
import './App.css';
import './themed.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (

    <div className={theme}>
          <button onClick={toggleTheme}>Toggle theme</button>
        <div className="App">
          <Counter />
        </div>
    </div>
  );
}

export default App;
