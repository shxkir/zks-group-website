"use client";

import { useMemo } from "react";
import { ConstructionStage } from "./ConstructionStage";
import type { ProgressRef } from "./progress";
import type { ConstructionMaterials } from "./useConstructionMaterials";

type Props = {
  progress: ProgressRef;
  materials: ConstructionMaterials;
};

function Tree({
  position,
  materials,
  scale = 1,
  height = 4.6,
}: {
  position: [number, number, number];
  materials: ConstructionMaterials;
  scale?: number;
  height?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, height * 0.32, 0]} material={materials.timber}>
        <cylinderGeometry args={[0.028, 0.055, height * 0.64, 6]} />
      </mesh>
      <mesh position={[0.08, height * 0.72, 0.04]} scale={[0.85, 1.35, 0.7]} material={materials.foliage}>
        <sphereGeometry args={[0.42, 8, 6]} />
      </mesh>
      <mesh position={[-0.16, height * 0.86, -0.06]} scale={[0.7, 1.1, 0.55]} material={materials.foliage}>
        <sphereGeometry args={[0.28, 7, 5]} />
      </mesh>
      <mesh position={[0.18, height * 0.98, 0.1]} scale={[0.55, 0.85, 0.45]} material={materials.foliage}>
        <sphereGeometry args={[0.22, 7, 5]} />
      </mesh>
    </group>
  );
}

function GlassBay({
  position,
  size,
  materials,
}: {
  position: [number, number, number];
  size: [number, number];
  materials: ConstructionMaterials;
}) {
  const [width, height] = size;
  const frame = 0.055;
  return (
    <group position={position}>
      <mesh position={[0, (height - frame) / 2, 0]} material={materials.frame}>
        <boxGeometry args={[width, frame, 0.07]} />
      </mesh>
      <mesh position={[0, -(height - frame) / 2, 0]} material={materials.frame}>
        <boxGeometry args={[width, frame, 0.07]} />
      </mesh>
      <mesh position={[-(width - frame) / 2, 0, 0]} material={materials.frame}>
        <boxGeometry args={[frame, height, 0.07]} />
      </mesh>
      <mesh position={[(width - frame) / 2, 0, 0]} material={materials.frame}>
        <boxGeometry args={[frame, height, 0.07]} />
      </mesh>
      <mesh position={[0, 0, 0.01]} material={materials.frame}>
        <boxGeometry args={[0.03, height - frame, 0.05]} />
      </mesh>
      <mesh material={materials.glass}>
        <boxGeometry args={[width - frame * 1.4, height - frame * 1.4, 0.02]} />
      </mesh>
    </group>
  );
}

export function ConstructionBuilding({ progress, materials }: Props) {
  const columns = useMemo(
    () =>
      [-4.6, -2.1, 0.3, 2.6].flatMap((x) =>
        [-2.6, 2.85].map((z) => [x, z] as const),
      ),
    [],
  );
  const frontBattens = useMemo(
    () => Array.from({ length: 28 }, (_, index) => -4.85 + index * 0.26),
    [],
  );
  const sideBattens = useMemo(
    () => Array.from({ length: 12 }, (_, index) => 3.55 - index * 0.26),
    [],
  );
  const stoneBlocks = useMemo(() => {
    const blocks: Array<[number, number, number]> = [];
    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 5; col += 1) {
        blocks.push([4.55 + (row % 2) * 0.05, 0.48 + row * 0.58, -2.3 + col * 1.12]);
      }
    }
    return blocks;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} material={materials.grass}>
        <circleGeometry args={[30, 64]} />
      </mesh>

      <ConstructionStage progress={progress} start={-0.04} end={0.12} lift={0.35}>
        <mesh position={[0.2, -0.02, 0.15]} material={materials.earth}>
          <boxGeometry args={[13.2, 0.14, 9.2]} />
        </mesh>
        <mesh position={[0.15, 0.12, 0.2]} material={materials.concrete}>
          <boxGeometry args={[11.6, 0.2, 7.8]} />
        </mesh>
      </ConstructionStage>

      <ConstructionStage progress={progress} start={0.12} end={0.27} lift={3.2}>
        {columns.map(([x, z], index) => (
          <mesh key={index} position={[x, 3.15, z]} material={materials.concrete}>
            <boxGeometry args={[0.28, 5.85, 0.28]} />
          </mesh>
        ))}
      </ConstructionStage>

      <ConstructionStage progress={progress} start={0.27} end={0.42} lift={2.1}>
        <mesh position={[0.1, 3.18, 0.15]} material={materials.concrete}>
          <boxGeometry args={[11.9, 0.18, 8.15]} />
        </mesh>
        <mesh position={[-1.1, 0.26, 0.1]} material={materials.interior}>
          <boxGeometry args={[8.6, 0.04, 6.4]} />
        </mesh>
        <mesh position={[-1.1, 3.1, 0.1]} material={materials.interior}>
          <boxGeometry args={[8.6, 0.04, 6.4]} />
        </mesh>
      </ConstructionStage>

      <ConstructionStage progress={progress} start={0.42} end={0.56} lift={2}>
        <mesh position={[4.55, 3.15, 0.15]} material={materials.stone}>
          <boxGeometry args={[1.7, 6.05, 6.9]} />
        </mesh>
        {stoneBlocks.map((position, index) => (
          <mesh key={index} position={position} material={materials.stone}>
            <boxGeometry args={[0.08, 0.02, 1.02]} />
          </mesh>
        ))}
        <mesh position={[0.1, 3.15, -3.55]} material={materials.concrete}>
          <boxGeometry args={[11.2, 5.9, 0.2]} />
        </mesh>
        <mesh position={[-5.55, 3.15, -1.9]} material={materials.concrete}>
          <boxGeometry args={[0.18, 5.9, 3.2]} />
        </mesh>
      </ConstructionStage>

      <ConstructionStage progress={progress} start={0.56} end={0.68} lift={1.1}>
        {[-3.55, -1.15, 1.25].map((x) => (
          <GlassBay key={`ground-${x}`} position={[x, 1.66, 3.62]} size={[2.28, 2.72]} materials={materials} />
        ))}
        {[-3.55, -1.15, 1.25].map((x) => (
          <GlassBay key={`upper-${x}`} position={[x, 4.68, 3.62]} size={[2.28, 2.48]} materials={materials} />
        ))}
        <group position={[-5.62, 1.66, 1.55]} rotation={[0, Math.PI / 2, 0]}>
          <GlassBay position={[0, 0, 0]} size={[2.6, 2.72]} materials={materials} />
        </group>
        <group position={[-5.62, 4.68, 1.55]} rotation={[0, Math.PI / 2, 0]}>
          <GlassBay position={[0, 0, 0]} size={[2.6, 2.48]} materials={materials} />
        </group>
        <mesh position={[-1.2, 1.7, 2.55]} material={materials.interior}>
          <boxGeometry args={[8.2, 2.5, 0.08]} />
        </mesh>
        <mesh position={[-1.2, 4.7, 2.55]} material={materials.interior}>
          <boxGeometry args={[8.2, 2.3, 0.08]} />
        </mesh>
        <mesh position={[-2.4, 1.05, 1.1]} material={materials.interior}>
          <boxGeometry args={[2.6, 0.42, 1.15]} />
        </mesh>
        <mesh position={[0.4, 1.12, 0.2]} material={materials.interior}>
          <boxGeometry args={[1.7, 0.58, 0.72]} />
        </mesh>
        <mesh position={[-1.2, 2.55, -0.6]} material={materials.interior}>
          <boxGeometry args={[4.8, 0.08, 0.9]} />
        </mesh>
      </ConstructionStage>

      <ConstructionStage progress={progress} start={0.68} end={0.79} lift={1.3}>
        {frontBattens.map((x) => (
          <mesh key={`front-${x}`} position={[x, 4.7, 3.78]} material={materials.timber}>
            <boxGeometry args={[0.055, 2.52, 0.04]} />
          </mesh>
        ))}
        {sideBattens.map((z) => (
          <mesh key={`side-${z}`} position={[-5.68, 4.7, z]} material={materials.timber}>
            <boxGeometry args={[0.04, 2.52, 0.055]} />
          </mesh>
        ))}
        <mesh position={[-4.92, 4.7, 3.78]} material={materials.timber}>
          <boxGeometry args={[0.07, 2.52, 0.07]} />
        </mesh>
        <mesh position={[2.35, 4.7, 3.78]} material={materials.timber}>
          <boxGeometry args={[0.07, 2.52, 0.07]} />
        </mesh>
      </ConstructionStage>

      <ConstructionStage progress={progress} start={0.79} end={0.87} lift={1.15}>
        <mesh position={[0.15, 6.22, 0.18]} material={materials.concrete}>
          <boxGeometry args={[12.2, 0.16, 8.35]} />
        </mesh>
        <mesh position={[0.15, 6.08, 0.18]} material={materials.roof}>
          <boxGeometry args={[12.35, 0.08, 8.5]} />
        </mesh>
        <mesh position={[0.1, 3.28, 0.15]} material={materials.concrete}>
          <boxGeometry args={[12, 0.06, 8.2]} />
        </mesh>
      </ConstructionStage>

      <ConstructionStage progress={progress} start={0.87} end={1} lift={0.4}>
        <mesh position={[0.4, 0.01, 5.15]} material={materials.stone}>
          <boxGeometry args={[7.4, 0.05, 2.4]} />
        </mesh>
        <mesh position={[-1.8, 0.015, 4.55]} rotation={[0, 0.18, 0]} material={materials.stone}>
          <boxGeometry args={[3.2, 0.04, 1.1]} />
        </mesh>
        <Tree position={[6.8, 0, 2.4]} materials={materials} height={5.4} />
        <Tree position={[7.2, 0, -2.6]} materials={materials} scale={0.78} height={3.9} />
        <Tree position={[-7.1, 0, 2.8]} materials={materials} scale={0.92} height={4.8} />
        <Tree position={[-6.6, 0, -2.8]} materials={materials} scale={0.68} height={3.5} />
        <Tree position={[4.2, 0, 5.6]} materials={materials} scale={0.72} height={3.2} />
        {[
          [5.6, 0.22, 4.2],
          [6.1, 0.18, -3.4],
          [-5.8, 0.2, 4.6],
          [-5.2, 0.16, -3.8],
          [2.8, 0.18, 5.4],
          [-2.6, 0.16, 5.2],
          [0.6, 0.14, 5.6],
        ].map((position) => (
          <mesh
            key={position.join("-")}
            position={position as [number, number, number]}
            scale={[1.1, 0.55, 0.9]}
            material={materials.foliage}
          >
            <sphereGeometry args={[0.34, 8, 6]} />
          </mesh>
        ))}
        {[
          [5.9, 0.42, 3.6],
          [-5.4, 0.38, 4.1],
          [3.4, 0.36, 5.1],
        ].map((position) => (
          <mesh key={`grass-${position.join("-")}`} position={position as [number, number, number]} material={materials.foliage}>
            <cylinderGeometry args={[0.04, 0.07, 0.7, 5]} />
          </mesh>
        ))}
      </ConstructionStage>
    </group>
  );
}
