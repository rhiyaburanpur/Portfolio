import React, { useState, useEffect } from 'react';

const NavItem = ({ label, href, active }) => (
    <a
        href={href}
        className={`
      relative px-4 py-2 uppercase font-['Press_Start_2P'] text-xs tracking-tighter
      hover:bg-[#535353] hover:text-[#f7f7f7]
      ${active ? 'bg-[#535353] text-[#f7f7f7]' : 'text-[#535353]'}
      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
      before:border-2 before:border-[#535353] before:opacity-0 hover:before:opacity-100
      cursor-pointer
      active:translate-x-[2px] active:translate-y-[2px]
    `}
    >
        {label}
    </a>
);

const GooeyNav = () => {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'projects', 'skills', 'contact'];
            const scrollPosition = window.scrollY + 150;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (window.location.hash === '' || window.location.hash === '#') {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 100);
        }
    }, []);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-[#f7f7f7]/90 backdrop-blur-sm border-2 border-[#535353] p-1 shadow-[4px_4px_0px_#535353]">
            <ul className="flex items-center gap-2">
                <li><NavItem label="Home" href="#hero" active={activeSection === 'hero'} /></li>
                <li><NavItem label="Projects" href="#projects" active={activeSection === 'projects'} /></li>
                <li><NavItem label="Skills" href="#skills" active={activeSection === 'skills'} /></li>
                <li><NavItem label="Contact" href="#contact" active={activeSection === 'contact'} /></li>
            </ul>
        </nav>
    );
};

export default GooeyNav;
