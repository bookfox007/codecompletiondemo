import React from 'react';
import Link from 'next/link';
import axios from 'axios';

const Home: React.FC = () => {

  const [helloData,setHelloData] = React.useState<string>('');

  //我需要一个方法可以获取接口返回值
  const getHelloData = async () => {
    const res = await axios.get('/api/hello');
    console.log(res.data);
    return res.data;
  };
  React.useEffect(() => {
    getHelloData().then((res) => {
      setHelloData(res.helloData);
    });
  }, []);



  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Next.js app!</p>
      <p>{helloData}</p>

      <Link href="/about">Go to About Page</Link>
    </div>
  );
};

export default Home;