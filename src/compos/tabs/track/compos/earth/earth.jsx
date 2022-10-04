import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import EarthDayMap from "./../../../../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "./../../../../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "./../../../../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "./../../../../../assets/textures/8k_earth_clouds.jpg";
import { TextureLoader } from "three";

export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(() => {

    earthRef.current.rotation.y += 2 * Math.PI/(3600*24);
    cloudsRef.current.rotation.y = 2 * Math.PI/(3600*24);
  });
  let radius = 1;
  return (
    <>
      <mesh ref={cloudsRef} position={[0, 0, 0]} castShadow receiveShadow frustumCulled>
        <sphereGeometry args={[radius + 0.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </>
  );
}
