import React, { useEffect, useRef } from 'react';

const ClickSpark = () => {
    const canvasRef = useRef(null);
    const sparks = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const createSpark = (x, y) => {
            const count = 8; // 8 bits? :)
            for (let i = 0; i < count; i++) {
                sparks.current.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 1.0,
                    color: Math.random() > 0.5 ? '#535353' : '#000000',
                    size: Math.random() * 4 + 2
                });
            }
        };

        const handleClick = (e) => {
            createSpark(e.clientX, e.clientY);
        };

        window.addEventListener('click', handleClick);

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sparks.current.forEach((spark, index) => {
                spark.x += spark.vx;
                spark.y += spark.vy;
                spark.life -= 0.05;

                // Pixelated squares
                ctx.fillStyle = spark.color;
                ctx.globalAlpha = spark.life;
                ctx.fillRect(Math.floor(spark.x), Math.floor(spark.y), spark.size, spark.size);

                if (spark.life <= 0) {
                    sparks.current.splice(index, 1);
                }
            });

            requestAnimationFrame(loop);
        };

        const raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(raf);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" />;
};

export default ClickSpark;
