import React from 'react';

import Header from '../components/header/header';
import Navbar from '../components/navbar/navbar';
import Feed from '../components/feed/feed';
const Home: React.FC = () => {
    return (
        <>
            <Header />
            {/* <Navbar /> */}
            <Feed />
        </>
    );
};

export default Home;