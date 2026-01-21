import React, { useState, useEffect } from 'react';

// Custom navbar icon imports for mobile
import homeIcon from '../../assets/Navbar/home.svg';
import projectsIcon from '../../assets/Navbar/projects.svg';
import skillsIcon from '../../assets/Navbar/skills.svg';
import contactIcon from '../../assets/Navbar/contact.svg';

// Navigation items
const navItems = [
    { icon: homeIcon, href: '#hero', label: 'Home', id: 'hero' },
    { icon: projectsIcon, href: '#projects', label: 'Projects', id: 'projects' },
    { icon: skillsIcon, href: '#skills', label: 'Skills', id: 'skills' },
    { icon: contactIcon, href: '#contact', label: 'Contact', id: 'contact' },
];

// Mobile nav item with icon only
const MobileNavItem = ({ icon, label, href, active }) => (
    <a
        href={href}
        className="group flex items-center justify-center"
    >
        {/* Icon box */}
        <div className={`
            w-10 h-10 flex items-center justify-center
            border-2 border-[#535353] dark:border-[#f7f7f7]
            ${active ? 'bg-[#535353]/10 dark:bg-[#f7f7f7]/10' : 'bg-transparent'}
            hover:bg-[#535353]/5 dark:hover:bg-[#f7f7f7]/5
            transition-colors duration-200
        `}>
            <img
                src={icon}
                alt={label}
                className={`
                    w-5 h-5 object-contain
                    brightness-0 dark:invert
                    ${active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}
                    transition-opacity duration-200
                `}
            />
        </div>
    </a>
);

// Desktop nav item with text (original style)
const DesktopNavItem = ({ label, href, active }) => (
    <a
        href={href}
        className={`
            relative px-4 py-2 uppercase font-['Press_Start_2P'] text-xs tracking-tighter
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
        // Always scroll to top on initial page load
        if (window.location.hash === '' || window.location.hash === '#' || window.location.hash === '#hero') {
            if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname);
            }
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, []);

    return (
        <>
            {/* Mobile navbar - compact icon boxes */}
            <nav className="lg:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#f7f7f7]/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm border-2 border-[#535353] dark:border-[#f7f7f7] px-2 py-1 shadow-[4px_4px_0px_#535353] dark:shadow-[4px_4px_0px_rgba(247,247,247,0.3)]">
                <div className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <MobileNavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            active={activeSection === item.id}
                        />
                    ))}
                </div>
            </nav>

            {/* Desktop navbar - text labels, at top */}
            <nav className="hidden lg:block fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#f7f7f7]/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm border-2 border-[#535353] dark:border-[#f7f7f7] p-1 shadow-[4px_4px_0px_#535353] dark:shadow-[4px_4px_0px_rgba(247,247,247,0.3)]">
                <ul className="flex items-center gap-2">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <DesktopNavItem
                                label={item.label}
                                href={item.href}
                                active={activeSection === item.id}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default GooeyNav;
