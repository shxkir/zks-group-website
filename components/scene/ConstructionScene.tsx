"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { ConstructionBuilding } from "./ConstructionBuilding";
import { ConstructionCamera } from "./ConstructionCamera";
import { ConstructionLighting } from "./ConstructionLighting";
import type { ProgressRef } from "./progress";
import { useConstructionMaterials } from "./useConstructionMaterials";

export type RenderProfile = {
  dpr: [number, number];
  lowQuality: boolean;
};

function ImmediateScene({
  progress,
  lowQuality,
}: {
  progress: ProgressRef;
  lowQuality: boolean;
}) {
  const materials = useConstructionMaterials(lowQuality);

  return (
    <>
      <color attach="background" args={["#b9c2c4"]} />
      <fog attach="fog" args={["#b9c2c4", 22, 48]} />
      <ConstructionLighting lowQuality={lowQuality} />
      <ConstructionCamera progress={progress} />
      <ConstructionBuilding progress={progress} materials={materials} />
    </>
  );
}

export function ConstructionScene({
  progress,
  profile,
  onContextLost,
}: {
  progress: ProgressRef;
  profile: RenderProfile;
  onContextLost?: () => void;
}) {
  return (
    <Canvas
      aria-label="A three-dimensional building construction visualisation"
      camera={{ position: [14.2, 4.4, 16.4], fov: 36, near: 0.1, far: 90 }}
      dpr={profile.dpr}
      gl={{ antialias: !profile.lowQuality, alpha: false, powerPreference: "high-performance" }}
      shadows={false}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.35;
        gl.domElement.addEventListener("webglcontextlost", () => onContextLost?.(), { once: true });
      }}
    >
      <ImmediateScene progress={progress} lowQuality={profile.lowQuality} />
    </Canvas>
  );
}
