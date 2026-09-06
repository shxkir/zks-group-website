"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import * as THREE from "three";
import { smoothstep, stageProgress } from "./construction-model";
import type { ProgressRef } from "./progress";

type ConstructionStageProps = {
  progress: ProgressRef;
  start: number;
  end: number;
  lift?: number;
  children: ReactNode;
};

export function ConstructionStage({ progress, start, end, lift = 1.6, children }: ConstructionStageProps) {
  const group = useRef<THREE.Group>(null);
  const restY = useRef<number | null>(null);

  useFrame(() => {
    const node = group.current;
    if (!node) return;
    if (restY.current === null) {
      restY.current = node.position.y;
    }

    const reveal = smoothstep(stageProgress(progress.current.value, start, end));
    node.visible = reveal > 0.001;
    node.scale.setScalar(1);
    node.position.y = restY.current + (1 - reveal) * lift;
  });

  return <group ref={group} visible={false}>{children}</group>;
}
