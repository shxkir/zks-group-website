import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { company } from "@/data/company";
import { SectionHeading } from "./SectionHeading";

export function ContentSections() {
  return (
    <>
      <section id="about" className="about section-wrap">
        <p className="eyebrow"><span />{company.about.eyebrow}</p>
        <div className="about-grid">
          <h2>{company.about.title}</h2>
          <div>
            <p>{company.about.body}</p>
            <a className="text-link" href="#process">Our approach <ArrowUpRight size={17} /></a>
          </div>
        </div>
        <div className="stat-row">
          {company.statistics.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="story" className="story section-wrap">
        <SectionHeading eyebrow={company.story.eyebrow} title={company.story.title}>
          <p>{company.story.body}</p>
        </SectionHeading>
      </section>

      <section id="services" className="services section-wrap">
        <SectionHeading eyebrow="Capabilities" title="One team. Every detail in view.">
          <p>From early technical review through to handover, our scope flexes around the project while accountability stays clear.</p>
        </SectionHeading>
        <div className="service-list">
          {company.services.map((service, index) => (
            <article key={service}>
              <span>0{index + 1}</span>
              <h3>{service}</h3>
              <ArrowUpRight size={22} />
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="projects section-wrap">
        <SectionHeading eyebrow="Selected studies" title="Architecture shaped for its setting.">
          <p>Representative concept studies, presented as placeholders for the next portfolio.</p>
        </SectionHeading>
        <div className="project-grid">
          {company.projects.map((project, index) => (
            <article className={`project-card card-${index + 1}`} key={project.name}>
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={`${project.name} concept study`}
                  fill
                  sizes="(max-width: 760px) 100vw, 46vw"
                  className="project-photo"
                />
                <span className="project-index">0{index + 1}</span>
              </div>
              <div className="project-meta">
                <p>{project.type} · {project.location}</p>
                <h3>{project.name}</h3>
                <span>{project.status}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="materials" className="materials section-wrap">
        <SectionHeading eyebrow="Material intelligence" title="The detail carries the whole.">
          <p>Every surface is selected for how it weathers, catches light and works hard over time.</p>
        </SectionHeading>
        <div className="material-grid">
          {company.materials.map((material, index) => (
            <article className={`material ${material.tone}`} key={material.name}>
              <span>0{index + 1}</span>
              <h3>{material.name}</h3>
              <p>{material.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="process section-wrap">
        <SectionHeading eyebrow="Project delivery" title="A process made visible." />
        <ol>
          {company.process.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="credentials section-wrap">
        <p className="eyebrow"><span />Project fundamentals</p>
        <div>
          <h2>{company.credentials.title}</h2>
          <p>{company.credentials.body}</p>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-inner">
          <p className="eyebrow"><span />{company.location}</p>
          <h2>Make space for what&apos;s next.</h2>
          <a href={`mailto:${company.contact.email}`}>
            {company.contact.email} <ArrowUpRight size={24} />
          </a>
          <div className="contact-footer">
            <p>{company.brand.description}</p>
            <div>
              <a href={company.social.instagram}>Instagram</a>
              <a href={company.social.linkedin}>LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
