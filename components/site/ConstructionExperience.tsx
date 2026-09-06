"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { constructionMilestones } from "@/components/scene/construction-model";
import { company } from "@/data/company";
import { ConstructionSequence } from "./ConstructionSequence";
import { Header } from "./Header";

function FallbackBuilding() {
  return (
    <div className="fallback-building" aria-hidden="true">
      <Image
        src="/sequence/build-00.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="fallback-image"
      />
      <div className="fallback-wash" />
    </div>
  );
}

export function ConstructionExperience() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef({ value: 0 });
  const percent = useRef<HTMLSpanElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReduced = media.matches;
    setReducedMotion(prefersReduced);
    if (prefersReduced) {
      progress.current.value = 1;
      if (percent.current) percent.current.textContent = "100";
    }

    const onMotionChange = () => {
      const next = media.matches;
      setReducedMotion(next);
      if (next) {
        progress.current.value = 1;
        if (percent.current) percent.current.textContent = "100";
      }
    };
    media.addEventListener("change", onMotionChange);
    return () => media.removeEventListener("change", onMotionChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || !root.current) return;
    const track = root.current.querySelector<HTMLElement>(".construction-scroll");
    if (!track) return;

    const update = () => {
      const total = Math.max(1, track.offsetHeight - window.innerHeight);
      const value = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / total));
      progress.current.value = value;
      if (percent.current) {
        percent.current.textContent = String(Math.round(value * 100)).padStart(2, "0");
      }
      root.current?.setAttribute("data-progress", value.toFixed(3));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reducedMotion]);

  return (
    <section ref={root} className="construction-experience" id="top">
      <Header />
      <div className="construction-scroll">
        <div className="scene-shell">
          <FallbackBuilding />
          <ConstructionSequence progress={progress} freezeAtEnd={reducedMotion} />
          <div className="scene-grain" />
          <div className="scene-vignette" />
          <div className="scene-status">
            <span ref={percent}>00</span>
            <i />
            <small>Construction sequence</small>
          </div>
        </div>
        <div className="construction-copy">
          <div className="hero-copy stage-copy">
            <p className="eyebrow"><span />{company.companyName} · {company.shortLocation}</p>
            <h1>{company.hero.title}<br /><em>{company.hero.emphasis}</em></h1>
            <p className="hero-intro">{company.hero.intro}</p>
            <div className="scroll-cue"><i /> Scroll to construct</div>
          </div>
          {constructionMilestones.map((milestone, index) => (
            <article className="stage-copy narrative-stage" key={milestone.key} style={{ "--stage-index": index } as CSSProperties}>
              <p className="stage-number">0{index + 1} / 08</p>
              <h2>{milestone.label}</h2>
              <p>{milestone.description}</p>
            </article>
          ))}
          <article className="stage-copy final-copy">
            <p className="eyebrow"><span />Complete</p>
            <h2>{company.hero.closingTitle}</h2>
            <p>{company.hero.closingBody}</p>
            <a href="#about" className="button-link">{company.hero.cta} <b>↓</b></a>
          </article>
        </div>
      </div>
    </section>
  );
}
