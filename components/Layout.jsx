import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
    <>
        <Navbar />
        <div className="pt-14 pb-14 px-1 phone:px-2 sm:px-10 bg-gray-100 min-h-screen overflow-hidden">
            <main className="mx-auto max-w-screen-xl overflow-hidden">
                {children}
            </main>
            <Footer />
        </div>
    </>
);

export default Layout;
