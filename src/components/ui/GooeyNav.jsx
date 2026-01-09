import React from 'react';

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
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-[#f7f7f7]/90 backdrop-blur-sm border-2 border-[#535353] p-1 shadow-[4px_4px_0px_#535353]">
            <ul className="flex items-center gap-2">
                <li><NavItem label="Home" href="#hero" active /></li>
                <li><NavItem label="Projects" href="#projects" /></li>
                <li><NavItem label="Skills" href="#skills" /></li>
                <li><NavItem label="Contact" href="#contact" /></li>
            </ul>
        </nav>
    );
};

export default GooeyNav;
