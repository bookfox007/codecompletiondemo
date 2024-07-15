import React from 'react';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <Link href="/">Go back to home</Link>
    </div>
  );
};

export default About;