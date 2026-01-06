import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Center } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ModelBun({ scale = 3, ...props }) {
  const gltf: any = useGLTF("/source/bumi.glb");
  const texture = useTexture("/textures/gltf_embedded_0.png"); // contoh nama file tekstur
  const groupRef = useRef<THREE.Group>(null!);

  // Apply texture sekali saja
  useEffect(() => {
    gltf.scene.traverse((node: any) => {
      if (node.isMesh && node.material) {
        node.material.map = texture;
        node.material.needsUpdate = true;
      }
    });
  }, [gltf.scene, texture]);

  // Fix orbit -> center pivot

  // Rotate model
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={scale} {...props}>
      <Center>
      <primitive object={gltf.scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/bumi.glb");

