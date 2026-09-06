"use client";

import { ContactShadows, Environment } from "@react-three/drei";

const HDRI_PATH = "/hdr/hilltop-construction-1k.hdr";

export function ConstructionEnvironment({ lowQuality }: { lowQuality: boolean }) {
  return (
    <>
      {lowQuality ? (
        <Environment preset="city" environmentIntensity={0.55} />
      ) : (
        <Environment files={HDRI_PATH} environmentIntensity={1.05} />
      )}
      <ContactShadows position={[0, -0.5, 0]} opacity={lowQuality ? 0.28 : 0.42} scale={22} blur={2.6} far={6} />
    </>
  );
}
