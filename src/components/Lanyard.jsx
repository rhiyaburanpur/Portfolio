import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'

export default function Lanyard({ ...props }) {
    const { nodes, materials } = useGLTF('/src/assets/lanyard/card.glb', true) // Dracosis/fallback handling often complicates, assuming file will exist
    const texture = useTexture('/src/assets/lanyard/lanyard.png')
    const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
    const [dragged, drag] = useState(false)
    const [hovered, hover] = useState(false)

    const fixed = useRef()
    const j1 = useRef()
    const j2 = useRef()
    const j3 = useRef()
    const card = useRef()

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // Adjust anchor for card top

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab'
            return () => void (document.body.style.cursor = 'auto')
        }
    }, [hovered, dragged])

    useFrame((state, delta) => {
        if (dragged) {
            const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
            const dir = vec.clone().sub(card.current.translation())
            card.current.applyImpulse(dir.multiplyScalar(delta * 20), true)
        }

        // Update curve for visual line
        const p1 = fixed.current.translation()
        const p2 = j1.current.translation()
        const p3 = j2.current.translation()
        const p4 = j3.current.translation()
        curve.points[0].copy(p1)
        curve.points[1].copy(p2)
        curve.points[2].copy(p3)
        curve.points[3].copy(p4)
    })

    return (
        <group {...props}>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} linearDamping={2} angularDamping={2} />
                <RigidBody position={[1, 0, 0]} ref={j2} linearDamping={2} angularDamping={2} />
                <RigidBody position={[1.5, 0, 0]} ref={j3} linearDamping={2} angularDamping={2} />

                <RigidBody
                    ref={card}
                    position={[2, 0, 0]}
                    type={dragged ? 'kinematicPosition' : 'dynamic'}
                    colliders="hull"
                    onPointerOver={() => hover(true)}
                    onPointerOut={() => hover(false)}
                    onPointerDown={(e) => {
                        e.target.setPointerCapture(e.pointerId)
                        drag(new THREE.Vector3().copy(e.point).sub(card.current.translation()))
                    }}
                    onPointerUp={(e) => {
                        e.target.releasePointerCapture(e.pointerId)
                        drag(false)
                    }}
                >
                    {/* Card Visuals */}
                    <group scale={10}> {/* Adjust scale based on model import */}
                        {/* If model not loaded, show fallback box */}
                        <mesh>
                            <boxGeometry args={[0.6, 0.9, 0.05]} />
                            <meshStandardMaterial color="#f7f7f7" />
                        </mesh>
                        {/* Use primitive when model is ready: <primitive object={nodes.Scene} /> */}
                    </group>
                </RigidBody>
            </group>

            {/* Rope Visuals */}
            <mesh>
                <tubeGeometry args={[curve, 64, 0.02, 16, false]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    )
}
