"use client";

export function ConstructionLighting({ lowQuality }: { lowQuality: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} color="#e7e4dc" />
      <hemisphereLight args={["#d7dde0", "#6b6a60", 1.35]} />
      <directionalLight
        position={[8, 16, 10]}
        intensity={lowQuality ? 1.6 : 1.9}
        color="#f2efe6"
      />
      <directionalLight position={[-6, 5, -3]} intensity={0.55} color="#9aa7b0" />
    </>
  );
}
