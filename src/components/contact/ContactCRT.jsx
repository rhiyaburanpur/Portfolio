import React from 'react';

const ContactCRT = () => {
    return (
        <div className="relative w-full max-w-2xl mx-auto p-1 bg-[#1a1a1a] rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* CRT Screen Container */}
            <div className="relative bg-[#f7f7f7] p-8 rounded min-h-[400px] flex flex-col items-center justify-center text-center overflow-hidden">

                {/* Dirty Glass Texture Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/40 to-black/10 mix-blend-overlay" />

                <h2 className="font-['Press_Start_2P'] text-2xl text-[#535353] mb-8 relative z-10">
                    INIT_CONNECTION()
                </h2>

                <div className="flex gap-6 relative z-10">
                    <a href="#" className="px-6 py-3 border-2 border-[#535353] font-['VT323'] text-xl text-[#535353] hover:bg-[#535353] hover:text-[#f7f7f7] transition-none shadow-[4px_4px_0px_#535353] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                        LinkedIn
                    </a>
                    <a href="#" className="px-6 py-3 border-2 border-[#535353] font-['VT323'] text-xl text-[#535353] hover:bg-[#535353] hover:text-[#f7f7f7] transition-none shadow-[4px_4px_0px_#535353] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                        GitHub
                    </a>
                    <a href="#" className="px-6 py-3 border-2 border-[#535353] font-['VT323'] text-xl text-[#535353] hover:bg-[#535353] hover:text-[#f7f7f7] transition-none shadow-[4px_4px_0px_#535353] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                        Email
                    </a>
                </div>

                <p className="mt-12 font-['VT323'] text-lg text-[#535353]/70 max-w-md">
                    "Building performance-critical tools and scalable platforms."
                </p>

                {/* Scanline Animation */}
                <div className="absolute top-0 left-0 w-full h-[5px] bg-[#535353]/10 animate-[scan_3s_linear_infinite] pointer-events-none" />
            </div>
        </div>
    );
};

export default ContactCRT;
