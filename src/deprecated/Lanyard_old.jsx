import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Card dimensions - VERTICAL
const CARD_WIDTH = 2.1;
const CARD_HEIGHT = 3.2;

// Age Calculation
const useAge = () => {
    return useMemo(() => {
        const birthDate = new Date('2006-12-05');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }, []);
};

function Card({ isDragging, dragOffset }) {
    const cardRef = useRef();
    const [hovered, setHovered] = useState(false);
    const age = useAge();

    // Swinging animation (reduced when dragging)
    useFrame((state) => {
        if (cardRef.current) {
            if (!isDragging) {
                cardRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
                cardRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
                cardRef.current.position.x = 0;
            } else {
                // Follow drag with MORE responsiveness
                cardRef.current.position.x = THREE.MathUtils.lerp(cardRef.current.position.x, dragOffset.x * 4, 0.1);
                cardRef.current.position.y = THREE.MathUtils.lerp(cardRef.current.position.y, dragOffset.y * 4, 0.1);
                cardRef.current.rotation.z = THREE.MathUtils.lerp(cardRef.current.rotation.z, -dragOffset.x * 0.6, 0.1);
            }
        }
    });

    return (
        <group ref={cardRef} position={[0, -0.3, 0]}>
            {/* Rope - shifted up because card is taller */}
            <mesh position={[0, 2.1, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Card Body */}
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[CARD_WIDTH, CARD_HEIGHT, 0.08]} />
                <meshStandardMaterial
                    color={hovered ? "#6e6e6e" : "#535353"}
                    roughness={0.3}
                    metalness={0.7}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* White Insert - Vertical */}
            <mesh position={[0, -0.2, 0.05]}>
                <planeGeometry args={[CARD_WIDTH * 0.85, CARD_HEIGHT * 0.65]} />
                <meshBasicMaterial color="#f7f7f7" />
            </mesh>

            {/* PFP Placeholder - Top Center */}
            <mesh position={[0, 0.8, 0.06]}>
                <planeGeometry args={[0.9, 0.9]} />
                <meshBasicMaterial color="#333" />
            </mesh>

            {/* Info Text - Using HTML for better font support and crispness */}
            <Html
                transform
                position={[0, -0.4, 0.07]} // Lower half of the card
                className="pointer-events-none"
                occlude
            >
                <div className="w-[180px] flex flex-col items-center justify-center select-none bg-transparent overflow-hidden">
                    <h1 className="font-['Press_Start_2P'] text-[#333] text-[11px] leading-tight mb-2 text-center whitespace-nowrap">
                        RHIYA BURANPUR
                    </h1>
                    <p className="font-['VT323'] text-[#444] text-xl leading-none">
                        AI & DS
                    </p>
                    <p className="font-['VT323'] text-[#444] text-lg leading-none mt-1">
                        AGE: {age}
                    </p>
                    <div className="w-full h-[1px] bg-black/10 my-2"></div>
                    <p className="font-['VT323'] text-[#666] text-sm leading-none tracking-widest uppercase text-center">
                        Systems / Cloud
                    </p>
                </div>
            </Html>
        </group>
    );
}

// Drag handler component
function DragHandler({ onDragChange }) {
    const { viewport, camera } = useThree();
    const isDraggingRef = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    const handlePointerDown = useCallback((e) => {
        isDraggingRef.current = true;
        startPos.current = { x: e.clientX, y: e.clientY };
        onDragChange(true, { x: 0, y: 0 });
        e.target.setPointerCapture(e.pointerId);
    }, [onDragChange]);

    const handlePointerMove = useCallback((e) => {
        if (!isDraggingRef.current) return;
        const dx = (e.clientX - startPos.current.x) / 200;
        const dy = -(e.clientY - startPos.current.y) / 200;
        onDragChange(true, { x: dx, y: dy });
    }, [onDragChange]);

    const handlePointerUp = useCallback((e) => {
        isDraggingRef.current = false;
        onDragChange(false, { x: 0, y: 0 });
    }, [onDragChange]);

    return (
        <mesh
            position={[0, 0, -1]}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial transparent opacity={0} />
        </mesh>
    );
}

const Lanyard = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleDragChange = useCallback((dragging, offset) => {
        setIsDragging(dragging);
        setDragOffset(offset);
    }, []);

    return (
        <div className="h-full w-full cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[5, 5, 5]} intensity={0.9} />
                <DragHandler onDragChange={handleDragChange} />
                <Card isDragging={isDragging} dragOffset={dragOffset} />
            </Canvas>
        </div>
    );
};

export default Lanyard;
