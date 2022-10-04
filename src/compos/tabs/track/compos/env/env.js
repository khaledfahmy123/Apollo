import { Stars } from "@react-three/drei";

export const Env = () => {
  return (
    <>
      <pointLight
        color="#f6f3ea"
        position={[1, 0, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      {/* <ambientLight intensity={1.2} /> */}
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
    </>
  );
};
