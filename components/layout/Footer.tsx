import React from 'react';
import Github from '@/assets/icons/github.png';
import Linkedin from '@/assets/icons/linkedin.png';
import Image from 'next/image';

const Contacts: { image: any, link: string }[] = [
    {
        image: Github,
        link: 'https://github.com/johnsoatra'
    },
    {
        image: Linkedin,
        link: 'https://www.linkedin.com/in/soatra'
    },
];

const Footer = () => {
    return (
        <div
            className='
                w-full flex justify-center
            '>
            <div
                className='
                    w-full max-w-[78rem] flex flex-col items-center gap-y-1
                '>
                <div
                    className='
                        w-full flex flex-col items-center gap-y-2 px-2.5
                        md:px-5
                        lg:px-10
                    '>
                     <p
                        className='
                            text-[15px] text-center
                        '>
                        Created by <span className='font-medium'>John Soatra</span>.
                    </p>
                    <div
                        className='
                            flex items-center gap-x-2
                            md:gap-x-3
                            lg:gap-x-4
                        '>
                        {
                            Contacts.map((contact, index) =>
                                <a
                                    key={index}
                                    href={contact.link}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='
                                        w-[20px] block opacity-70
                                        hover:opacity-100
                                    '>
                                    <Image
                                        src={contact.image}
                                        alt="contact"
                                        sizes='100%'
                                    />
                                </a>
                            )
                        }
                    </div>
                </div>
                <p
                    className='
                        w-full text-center text-[12px] px-2.5
                        md:px-5 md:py-3
                        lg:px-10 lg:py-4
                    '>
                    Copyright © 2024. All right reserved.
                </p>
            </div>
        </div>
    );
}

export default Footer;