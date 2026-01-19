import React, { useState, useEffect } from 'react';

const NavItem = ({ label, href, active }) => (
    <a
        href={href}
        className={`
      relative px-2 py-1 sm:px-4 sm:py-2 uppercase font-['Press_Start_2P'] text-[8px] sm:text-xs tracking-tighter
      hover:bg-[#535353] hover:text-[#f7f7f7] dark:hover:bg-[#f7f7f7] dark:hover:text-[#535353]
      ${active ? 'bg-[#535353] text-[#f7f7f7] dark:bg-[#f7f7f7] dark:text-[#535353]' : 'text-[#535353] dark:text-[#f7f7f7]'}
      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
      before:border-2 before:border-[#535353] dark:before:border-[#f7f7f7] before:opacity-0 hover:before:opacity-100
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
            const sections = ['hero', 'hero-mobile', 'projects', 'skills', 'contact'];
            const scrollPosition = window.scrollY + 150;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        // Treat hero-mobile as hero for active state
                        setActiveSection(sectionId === 'hero-mobile' ? 'hero' : sectionId);
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
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-6 z-40 bg-[#f7f7f7]/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-[#535353] dark:border-[#f7f7f7] p-1 shadow-[4px_4px_0px_#535353] dark:shadow-[4px_4px_0px_rgba(247,247,247,0.3)]">
            <ul className="flex items-center gap-1 sm:gap-2">
                <li><NavItem label="Home" href="#hero" active={activeSection === 'hero'} /></li>
                <li><NavItem label="Projects" href="#projects" active={activeSection === 'projects'} /></li>
                <li><NavItem label="Skills" href="#skills" active={activeSection === 'skills'} /></li>
                <li><NavItem label="Contact" href="#contact" active={activeSection === 'contact'} /></li>
            </ul>
        </nav>
    );
};

export default GooeyNav;
