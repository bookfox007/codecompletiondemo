import React from 'react';
import Link from 'next/link';
import axios from 'axios';

const Home: React.FC = () => {
 
  

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Next.js app!</p>
      

      <Link href="/about">Go to About Page</Link>
    </div>
  );
};

export default Home;