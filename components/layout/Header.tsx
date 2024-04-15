import React from 'react';
import Routes from '@/constants/routes';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/logo.webp';

const Header = () => {
    return (
        <div
            className='
                w-full flex justify-center fixed top-0 left-0 bg-gray-100/80 backdrop-blur-sm z-10
            '>
            <div
                className='
                    w-full relative max-w-[78rem] h-[70px] flex items-center gap-x-2.5 px-2.5 py-1.5
                    md:gap-x-5 md:py-2 md:px-5
                    lg:gap-x-10 lg:px-10
                '>
                <Link
                    href={Routes.Home}
                    rel='home'
                    className='
                        group flex items-center gap-x-2
                        md:gap-x-2.5
                        lg:gap-x-3
                    '>
                    <div
                        className='
                            w-[30px]
                            lg:w-[35px]
                        '>
                        <Image
                            src={Logo}
                            alt="logo"
                            sizes='100%'
                        />
                    </div>
                    <p
                        className='
                            text-[20px] font-medium
                            md:text-[22px]
                            lg:text-[24px]
                        '>
                        Todo
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default Header;