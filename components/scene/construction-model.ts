export type ConstructionMilestone = {
  key: string;
  label: string;
  start: number;
  end: number;
  description: string;
};

export const constructionMilestones: ConstructionMilestone[] = [
  { key: "foundation", label: "Foundation", start: 0, end: 0.12, description: "The line is set into the ground." },
  { key: "structure", label: "Structure", start: 0.12, end: 0.27, description: "A clear structural rhythm takes hold." },
  { key: "floors", label: "Floors", start: 0.27, end: 0.42, description: "Volume becomes a sequence of inhabitable levels." },
  { key: "envelope", label: "Envelope", start: 0.42, end: 0.56, description: "The building gains protection and proportion." },
  { key: "windows", label: "Windows", start: 0.56, end: 0.68, description: "Light is measured, framed and brought inside." },
  { key: "facade", label: "Facade", start: 0.68, end: 0.79, description: "Texture, shadow and permanence meet." },
  { key: "roof", label: "Roof", start: 0.79, end: 0.87, description: "The silhouette resolves against the sky." },
  { key: "landscape", label: "Landscape", start: 0.87, end: 1, description: "The architecture finds its place." },
];

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function stageProgress(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

export function smoothstep(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}
