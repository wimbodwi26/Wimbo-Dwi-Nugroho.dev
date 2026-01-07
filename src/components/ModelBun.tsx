import { memo, useRef, useLayoutEffect } from "react"; // Tambahkan memo di sini
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Center } from "@react-three/drei";
import * as THREE from "three";

const DRACO_PATH = "/draco/";
const MODEL_PATH = "/bumi.glb"; 


const ModelBun = memo(({ scale = 3, ...props }: any) => {
  const { scene } = useGLTF(MODEL_PATH, DRACO_PATH) as any;
  const texture = useTexture("/textures/gltf_embedded_0.webp");
  const groupRef = useRef<THREE.Group>(null!);

  useLayoutEffect(() => {
    if (!texture) return;
    texture.flipY = false; 
    texture.colorSpace = THREE.SRGBColorSpace; 

    scene.traverse((node: any) => {
      if (node.isMesh) {

        node.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 1, 
          metalness: 0,
        });
        node.castShadow = false;
        node.receiveShadow = false;
      }
    });
  }, [scene, texture]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={scale} {...props}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
});


ModelBun.displayName = "ModelBun";

export default ModelBun;

useGLTF.preload(MODEL_PATH, DRACO_PATH);
useTexture.preload("/textures/gltf_embedded_0.webp");