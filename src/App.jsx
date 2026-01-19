import React, { useState } from 'react';
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
import SplashScreen from './components/ui/SplashScreen';
import MobileHero from './components/hero/MobileHero';

const Section = ({ id, title, height = "min-h-screen", children, className = "" }) => (
  <section id={id} className={`w-full ${height} flex flex-col items-center justify-center relative border-b-2 border-dashed border-[#535353]/20 dark:border-[#f7f7f7]/20 ${className}`}>
    {title && <h1 className="font-['Press_Start_2P'] text-lg sm:text-xl md:text-2xl text-[#535353] dark:text-[#f7f7f7] text-center mb-8 md:mb-12 z-10 px-4">{title}</h1>}
    {children}
  </section>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Layout>
        <ClickSpark />
        <GooeyNav />

        {/* Mobile Hero - Lightweight alternative for small screens */}
        <MobileHero />

        {/* Desktop Hero Section - Layered Layout (hidden on mobile) */}
        <section id="hero" className="w-full h-screen hidden lg:flex relative overflow-hidden border-b-2 border-dashed border-[#535353]/20 dark:border-[#f7f7f7]/20">

          {/* Layer 0: Lanyard Background - Full Screen */}
          <div className="absolute inset-0 z-0">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} fov={15} paused={showSplash} />
          </div>

          {/* Layer 1: Text Content - Bottom Right on Desktop */}
          <div className="hidden lg:block absolute bottom-24 right-0 z-30 pointer-events-none p-8 xl:p-16 max-w-[45%]">
            <div className="pointer-events-auto text-right pr-4 xl:pr-12">
              <h1 className="font-['Press_Start_2P'] text-sm lg:text-base xl:text-xl 2xl:text-2xl text-[#535353] dark:text-[#f7f7f7] mb-4 leading-tight break-words">
                &gt; RHIYA_BURANPUR<span className="animate-[cursor-blink_1s_ease-out_infinite]">_</span>
              </h1>
              <div className="font-['VT323'] text-lg xl:text-xl text-[#535353] dark:text-[#f7f7f7]">
                <p>Systems | Cloud | AI</p>
              </div>
            </div>
          </div>

          {/* Layer 1 Mobile: Text Content - Bottom Left on Mobile */}
          <div className="lg:hidden absolute bottom-24 left-0 z-10 pointer-events-none p-8">
            <div className="pointer-events-auto pl-4">
              <h1 className="font-['Press_Start_2P'] text-base sm:text-lg text-[#535353] dark:text-[#f7f7f7] mb-4 leading-tight break-words">
                &gt; RHIYA_BURANPUR<span className="animate-[cursor-blink_1s_ease-out_infinite]">_</span>
              </h1>
              <div className="font-['VT323'] text-lg text-[#535353] dark:text-[#f7f7f7]">
                <p>Systems | Cloud | AI</p>
              </div>
            </div>
          </div>

          {/* Layer 2: Dino Game - Centered Right - Hidden on mobile */}
          <div className="hidden lg:flex absolute top-[35%] right-4 -translate-y-1/2 w-[45%] h-[50%] z-20 pointer-events-auto items-center justify-center">
            <ChromeDinoGame />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1">
            <p className="font-['VT323'] text-[#535353] dark:text-[#f7f7f7] text-xs md:text-sm opacity-60">SCROLL_DOWN()</p>
            <span className="font-['VT323'] text-[#535353] dark:text-[#f7f7f7] text-2xl opacity-60 animate-[v-blink_1s_step-end_infinite]">⌄</span>
          </div>

        </section>

        <Section id="projects" title="Featured_Projects" height="min-h-auto" className="pt-16 md:pt-24">
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
