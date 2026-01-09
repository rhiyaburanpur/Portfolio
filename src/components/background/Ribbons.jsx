import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial })

const Ribbon = ({ radius = 10, ...props }) => {
    const mesh = useRef()
    // Generate random points for a curved line
    const points = useMemo(() => {
        const pts = []
        for (let i = 0; i < 20; i++) {
            pts.push(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 5
                )
            )
        }
        const curve = new THREE.CatmullRomCurve3(pts)
        return curve.getPoints(50).flatMap(p => [p.x, p.y, p.z])
    }, [])

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.material.dashOffset -= 0.002
        }
    })

    return (
        <mesh ref={mesh} {...props}>
            <meshLineGeometry points={points} />
            <meshLineMaterial
                transparent
                lineWidth={0.1}
                color="#333"
                dashArray={0.2}
                dashRatio={0.4}
                opacity={0.3}
                depthTest={false}
            />
        </mesh>
    )
}

const Ribbons = () => {
    // Generate a few ribbons
    const ribbons = Array.from({ length: 5 }).map((_, i) => <Ribbon key={i} />)

    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
            <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                <group position={[0, 0, -5]}>
                    {ribbons}
                </group>
            </Canvas>
        </div>
    );
};

export default Ribbons;
