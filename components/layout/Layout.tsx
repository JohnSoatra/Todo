import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

type Props = {
    fromTop?: boolean,
    children: React.ReactNode
}

const Layout = ({ fromTop, children }: Props) => {
    return (
        <div
            className='
                min-w-screen min-h-screen flex flex-col items-center
            '>
            <Toaster />
            <Header />
            {
                fromTop !== true && <div className='h-[70px]'></div>
            }
            { children }
            <div className='flex-1'></div>
            <Footer />
        </div>
    )
}

export default Layout;