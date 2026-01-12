import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import GooeyNav from './components/ui/GooeyNav';
import Lanyard from './components/hero/Lanyard';
import Ribbons from './components/background/Ribbons';
import ScrollStack from './components/projects/ScrollStack';
import InfiniteMenu from './components/skills/InfiniteMenu';
import TerminalContact from './components/contact/TerminalContact';
import ClickSpark from './components/ui/ClickSpark';
import FooterBlur from './components/layout/FooterBlur';
import ChromeDinoGame from './components/hero/ChromeDinoGame';

// Placeholder sections
const Section = ({ id, title, height = "min-h-screen", children, className = "" }) => (
  <section id={id} className={`w-full ${height} flex flex-col items-center justify-center relative border-b-2 border-dashed border-[#535353]/20 dark:border-[#f7f7f7]/20 ${className}`}>
    {title && <h1 className="font-['Press_Start_2P'] text-lg sm:text-xl md:text-2xl text-[#535353] dark:text-[#f7f7f7] text-center mb-8 md:mb-12 z-10 px-4">{title}</h1>}
    {children}
  </section>
);

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ClickSpark />
        <GooeyNav />

        {/* Hero Section - Split Screen (Stacked on Mobile) */}
        <section id="hero" className="w-full min-h-screen flex flex-col lg:flex-row border-b-2 border-dashed border-[#535353]/20 dark:border-[#f7f7f7]/20 relative pt-16 md:pt-20">

          {/* Left: Lanyard / Info - Takes full width on mobile, 40% on desktop */}
          <div className="relative w-full lg:w-[40%] min-h-[50vh] lg:min-h-full flex flex-col items-center justify-center p-4 md:p-8 lg:border-r-2 border-[#535353]/10 dark:border-[#f7f7f7]/10 overflow-hidden">
            <h1 className="font-['Press_Start_2P'] text-base sm:text-lg md:text-xl lg:text-2xl text-[#535353] dark:text-[#f7f7f7] text-center mb-4 z-10 leading-tight break-words max-w-full px-2">
              &gt; RHIYA_BURANPUR<span className="animate-pulse">_</span>
            </h1>
            <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-transparent relative z-10 cursor-grab active:cursor-grabbing">
              <Lanyard />
            </div>
            <div className="mt-4 md:mt-8 font-['VT323'] text-lg md:text-xl text-[#535353] dark:text-[#f7f7f7] text-center">
              <p>Systems | Cloud | AI</p>
              <p className="text-xs md:text-sm opacity-60 mt-2">SCROLL_DOWN()</p>
            </div>
          </div>

          {/* Right: Dino Game - Takes full width on mobile, 60% on desktop */}
          <div className="relative w-full lg:w-[60%] h-[50vh] lg:h-auto lg:min-h-full bg-[#f7f7f7] dark:bg-[#1a1a1a]">
            <ChromeDinoGame />
          </div>
        </section>

        <Section id="projects" title="Featured_Projects" height="min-h-auto">
          <ScrollStack />
        </Section>

        <Section id="skills" title="" height="min-h-[40vh] md:min-h-[50vh]" className="bg-[#535353] border-none">
          <div className="w-full h-full flex items-center bg-[#535353]">
            <InfiniteMenu />
          </div>
        </Section>

        <Section id="contact" title="Connect_Signal">
          <TerminalContact />
        </Section>

        <FooterBlur />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
