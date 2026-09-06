"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

function noiseMap(size: number, paint: (x: number, y: number) => [number, number, number]) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const image = context.createImageData(size, size);
  const { data } = image;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const [r, g, b] = paint(x, y);
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

export function useConstructionMaterials(lowQuality: boolean) {
  const materials = useMemo(() => {
    const size = lowQuality ? 96 : 256;
    const concreteMap = noiseMap(size, (x, y) => {
      const grain = ((x * 13 + y * 29) % 17) + Math.sin(x * 0.37 + y * 0.11) * 8;
      const value = 168 + grain;
      return [value, value - 5, value - 12];
    });
    concreteMap.repeat.set(2.4, 2.4);

    const timberMap = noiseMap(size, (x, y) => {
      const ring = Math.sin(x * 0.18) * 14;
      const grain = (y * 3 + x) % 9;
      return [126 + ring, 88 + grain, 52 + grain * 0.4];
    });
    timberMap.repeat.set(1.2, 4);

    const stoneMap = noiseMap(size, (x, y) => {
      const speck = ((x * 7 + y * 11) % 21) - 8;
      const value = 186 + speck;
      return [value, value - 3, value - 9];
    });
    stoneMap.repeat.set(3, 3);

    const grassMap = noiseMap(size, (x, y) => {
      const tuft = ((x * 5 + y * 17) % 13) + Math.sin(y * 0.4) * 6;
      return [78 + tuft, 92 + tuft, 58 + tuft * 0.35];
    });
    grassMap.repeat.set(8, 8);

    const concrete = new THREE.MeshStandardMaterial({
      map: concreteMap,
      color: "#e6e0d4",
      roughness: 0.86,
      metalness: 0.03,
    });
    const steel = new THREE.MeshStandardMaterial({
      color: "#6f7472",
      roughness: 0.28,
      metalness: 0.78,
    });
    const bronze = new THREE.MeshStandardMaterial({
      color: "#8a6a4d",
      roughness: 0.38,
      metalness: 0.72,
    });
    const glass = new THREE.MeshStandardMaterial({
      color: "#8aa0a6",
      roughness: 0.04,
      metalness: 0.12,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    });
    const timber = new THREE.MeshStandardMaterial({
      map: timberMap,
      color: "#8a6844",
      roughness: 0.68,
      metalness: 0.04,
    });
    const stone = new THREE.MeshStandardMaterial({
      map: stoneMap,
      color: "#ddd6c8",
      roughness: 0.88,
      metalness: 0.02,
    });
    const earth = new THREE.MeshStandardMaterial({
      color: "#4f4c43",
      roughness: 1,
      metalness: 0,
    });
    const grass = new THREE.MeshStandardMaterial({
      map: grassMap,
      color: "#6d754c",
      roughness: 0.98,
      metalness: 0,
    });
    const foliage = new THREE.MeshStandardMaterial({
      color: "#5b6744",
      roughness: 0.94,
      metalness: 0,
    });
    const roof = new THREE.MeshStandardMaterial({
      color: "#2f332f",
      roughness: 0.42,
      metalness: 0.48,
    });
    const frame = new THREE.MeshStandardMaterial({
      color: "#2c2f2d",
      roughness: 0.35,
      metalness: 0.4,
    });
    const interior = new THREE.MeshStandardMaterial({
      color: "#e4d3b4",
      roughness: 0.7,
      metalness: 0.02,
      emissive: "#6a5436",
      emissiveIntensity: 0.42,
    });

    return {
      concrete,
      steel,
      bronze,
      glass,
      timber,
      stone,
      earth,
      grass,
      foliage,
      roof,
      frame,
      interior,
      maps: [concreteMap, timberMap, stoneMap, grassMap],
    };
  }, [lowQuality]);

  useEffect(() => {
    return () => {
      materials.maps.forEach((map) => map.dispose());
      Object.values(materials).forEach((value) => {
        if (value instanceof THREE.Material) {
          value.dispose();
        }
      });
    };
  }, [materials]);

  return materials;
}

export type ConstructionMaterials = ReturnType<typeof useConstructionMaterials>;
