"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { ProgressRef } from "./progress";

const points = [
  { at: 0, position: [14.2, 4.4, 16.4], target: [0.4, 2.1, 0.4] },
  { at: 0.16, position: [13.4, 3.4, 15.6], target: [0.3, 1.3, 0.5] },
  { at: 0.34, position: [13.0, 4.0, 15.0], target: [0.3, 2.4, 0.4] },
  { at: 0.52, position: [12.6, 3.6, 14.6], target: [0.4, 2.6, 0.4] },
  { at: 0.7, position: [13.2, 4.2, 14.8], target: [0.3, 2.7, 0.3] },
  { at: 0.86, position: [13.8, 4.8, 15.4], target: [0.3, 2.8, 0.3] },
  { at: 1, position: [14.6, 4.2, 16.6], target: [0.4, 2.4, 0.4] },
] as const;

const from = new THREE.Vector3();
const to = new THREE.Vector3();

function sample(progress: number, key: "position" | "target", out: THREE.Vector3) {
  const afterIndex = points.findIndex((point) => point.at >= progress);
  const nextIndex = afterIndex === -1 ? points.length - 1 : afterIndex;
  const previousIndex = Math.max(0, nextIndex - 1);
  const next = points[nextIndex];
  const previous = points[previousIndex];
  const span = next.at - previous.at || 1;
  const t = Math.max(0, Math.min(1, (progress - previous.at) / span));
  const previousPoint = previous[key];
  const nextPoint = next[key];
  from.set(previousPoint[0], previousPoint[1], previousPoint[2]);
  to.set(nextPoint[0], nextPoint[1], nextPoint[2]);
  out.copy(from).lerp(to, t);
}

export function ConstructionCamera({ progress }: { progress: ProgressRef }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 1.1, 0));
  const desired = useRef(new THREE.Vector3());
  const desiredLook = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const value = progress.current.value;
    sample(value, "position", desired.current);
    sample(value, "target", desiredLook.current);
    const ease = 1 - Math.exp(-delta * 5.2);
    camera.position.lerp(desired.current, ease);
    look.current.lerp(desiredLook.current, ease);
    camera.lookAt(look.current);
  });

  return null;
}
