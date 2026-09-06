"use client";

import { useEffect, useRef } from "react";
import { clamp } from "@/components/scene/construction-model";
import type { ProgressRef } from "@/components/scene/progress";

const VIDEO_SRC = "/sequence/hero-build.mp4";
const POSTER_SRC = "/sequence/build-00.jpg";

const hits = [
  { at: 0.12, label: "Foundation set" },
  { at: 0.28, label: "Structure set" },
  { at: 0.44, label: "Envelope set" },
  { at: 0.6, label: "Windows set" },
  { at: 0.76, label: "Facade set" },
  { at: 0.92, label: "Landscape set" },
] as const;

function strike() {
  try {
    navigator.vibrate?.([14, 22, 26, 16, 10]);
  } catch {
    // Some browsers expose vibrate but reject it.
  }
}

function createImpactAudio() {
  const Context = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Context) return null;
  const context = new Context();

  const play = (intensity: number) => {
    if (context.state === "suspended") {
      void context.resume();
    }
    const now = context.currentTime;
    const osc = context.createOscillator();
    const tone = context.createGain();
    const filter = context.createBiquadFilter();
    osc.type = "sine";
    osc.frequency.setValueAtTime(82, now);
    osc.frequency.exponentialRampToValueAtTime(34, now + 0.24);
    filter.type = "lowpass";
    filter.frequency.value = 220;
    tone.gain.setValueAtTime(0.0001, now);
    tone.gain.exponentialRampToValueAtTime(0.08 * intensity, now + 0.01);
    tone.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
    osc.connect(filter);
    filter.connect(tone);
    tone.connect(context.destination);
    osc.start(now);
    osc.stop(now + 0.36);

    const noise = context.createBufferSource();
    const buffer = context.createBuffer(1, context.sampleRate * 0.16, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    noise.buffer = buffer;
    const grit = context.createGain();
    const gritFilter = context.createBiquadFilter();
    gritFilter.type = "highpass";
    gritFilter.frequency.value = 380;
    grit.gain.setValueAtTime(0.03 * intensity, now);
    grit.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    noise.connect(gritFilter);
    gritFilter.connect(grit);
    grit.connect(context.destination);
    noise.start(now);
  };

  return { context, play };
}

export function ConstructionSequence({
  progress,
  freezeAtEnd = false,
}: {
  progress: ProgressRef;
  freezeAtEnd?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dust = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const stamp = useRef<HTMLSpanElement>(null);
  const smooth = useRef(0);
  const lastHit = useRef(-1);
  const shake = useRef(0);
  const duration = useRef(0);

  useEffect(() => {
    const node = video.current;
    if (!node) return undefined;

    const onMeta = () => {
      duration.current = node.duration || 0;
      if (duration.current && node.currentTime < 0.02) {
        try {
          node.currentTime = 0.04;
        } catch {
          // Ignore early seek failures while metadata is settling.
        }
      }
    };

    node.addEventListener("loadedmetadata", onMeta);
    if (node.readyState >= 1) onMeta();
    return () => node.removeEventListener("loadedmetadata", onMeta);
  }, []);

  useEffect(() => {
    if (freezeAtEnd) {
      const node = video.current;
      if (node && duration.current) {
        node.currentTime = duration.current;
      }
      return undefined;
    }

    const audio = createImpactAudio();
    const unlock = () => {
      void audio?.context.resume();
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
    window.addEventListener("scroll", unlock, { once: true, passive: true });

    let frame = 0;
    const tick = () => {
      const value = clamp(progress.current.value);
      // Same easing feel as C&E: chase the scroll target instead of snapping.
      smooth.current += (value - smooth.current) * 0.18;
      const eased = smooth.current;

      const node = video.current;
      const total = duration.current;
      if (node && total > 0 && node.readyState >= 1) {
        const target = Math.min(Math.max(eased, 0), 1) * Math.max(total - 0.05, 0);
        if (Math.abs(node.currentTime - target) > 0.02) {
          try {
            node.currentTime = target;
          } catch {
            // Ignore transient seek errors.
          }
        }
      }

      const hitIndex = hits.findIndex((hit, index) => {
        const next = hits[index + 1];
        return eased >= hit.at && (!next || eased < next.at);
      });
      if (hitIndex !== -1 && hitIndex !== lastHit.current && eased >= hits[hitIndex].at) {
        // Fire only when crossing a milestone forward.
        if (hitIndex > lastHit.current) {
          shake.current = 8;
          strike();
          audio?.play(0.8 + hitIndex * 0.05);
          if (stamp.current) {
            stamp.current.textContent = hits[hitIndex].label;
            stamp.current.classList.remove("is-hot");
            void stamp.current.offsetWidth;
            stamp.current.classList.add("is-hot");
          }
        }
        lastHit.current = hitIndex;
      }
      if (eased < 0.08) {
        lastHit.current = -1;
      }

      shake.current *= 0.84;
      const punch = shake.current;
      if (stage.current) {
        const x = Math.sin(eased * 36 + punch) * punch * 0.32;
        const y = Math.cos(eased * 24 + punch) * punch * 0.2;
        stage.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${1.045 - eased * 0.035})`;
      }
      if (dust.current) {
        dust.current.style.opacity = String(Math.min(0.4, punch * 0.05));
      }
      if (flash.current) {
        flash.current.style.opacity = String(Math.min(0.18, punch * 0.025));
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock);
      void audio?.context.close();
    };
  }, [freezeAtEnd, progress]);

  return (
    <div className="construction-film" aria-hidden="true">
      <div className="construction-film__stage" ref={stage}>
        <video
          ref={video}
          className="construction-film__video"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />
      </div>
      <div className="construction-film__dust" ref={dust} />
      <div className="construction-film__flash" ref={flash} />
      <span className="construction-film__stamp" ref={stamp} />
    </div>
  );
}
