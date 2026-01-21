import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Dock Container - macOS-style dock with magnification physics
 */
export const Dock = ({ children, className = '' }) => {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={`flex items-center justify-center gap-4 px-4 py-2 bg-[#535353]/90 border border-[#f7f7f7]/20 rounded-2xl backdrop-blur-sm ${className}`}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(child, { mouseX })
                    : child
            )}
        </motion.div>
    );
};

/**
 * DockIcon - Individual dock item with magnification effect
 */
export const DockIcon = ({
    children,
    mouseX,
    isActive = false,
    onClick,
    title = '',
}) => {
    const ref = useRef(null);

    // Calculate distance from cursor to this icon
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Map distance to icon width: closer = larger
    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    // Apply spring physics for smooth animation
    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.button
            ref={ref}
            style={{ width, height: width }}
            onClick={onClick}
            title={title}
            className={`
        aspect-square rounded-full flex items-center justify-center
        transition-colors duration-200 cursor-pointer
        ${isActive
                    ? 'bg-[#00ff00] text-[#535353]'
                    : 'bg-[#f7f7f7]/10 text-[#f7f7f7] hover:bg-[#f7f7f7]/20'
                }
      `}
            whileTap={{ scale: 0.95 }}
        >
            <div className={`w-1/2 h-1/2 flex items-center justify-center ${isActive ? 'text-[#535353]' : ''}`}>
                {children}
            </div>
        </motion.button>
    );
};

export default Dock;
