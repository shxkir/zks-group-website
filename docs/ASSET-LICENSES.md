# Asset and licence record

## Shipped assets

### Poly Haven — Hilltop Construction HDRI

- Asset name: Hilltop Construction
- Creator: Poly Haven
- Source: https://polyhaven.com/a/hilltop_construction
- File used: `public/hdr/hilltop-construction-1k.hdr` (1k HDR)
- Downloaded: 6 September 2026
- Licence: CC0 1.0 Universal — https://polyhaven.com/license
- Attribution: not required; recorded here for provenance
- Use: runtime environment lighting and blurred scene backdrop via `@react-three/drei` `Environment`
- Production notes: the compact 1k file is used only on desktop-quality profiles. Low-quality and mobile profiles skip this file and use the library `city` preset instead.

### Original fallback still

- Asset name: Completed pavilion fallback
- Creator: generated for this repository
- File used: `public/fallback/completed-pavilion.png`
- Licence: original work for this project
- Use: project-card still and archive imagery. Not a photograph of a real ZKS project.

### Construction sequence stills

- Asset name: Pavilion construction sequence
- Creator: generated for this repository
- Files used: `public/sequence/00-site.jpg` through `public/sequence/06-complete.jpg`, `public/sequence/build-00.jpg` through `public/sequence/build-06.jpg`
- Licence: original work for this project
- Use: keyframes for the scroll-scrubbed construction hero. Not photographs of a real ZKS project.

### Construction hero film

- Asset name: Pavilion construction hero
- Creator: generated for this repository from the locked-camera build stills
- File used: `public/sequence/hero-build.mp4`
- Licence: original work for this project
- Use: scroll-scrubbed construction sequence (same technique as continuous film heroes). Not footage of a real ZKS project.

### Procedural work

The central building, PBR material maps, landscape, material studies, and CSS treatments are original procedural work authored in this repository. No third-party building models, GLTF/GLB files, or commercial textures are shipped.

Low-quality devices may still use the `city` environment preset supplied by `@react-three/drei` at runtime. It is a library-provided rendering helper and no additional texture file is copied into this project for that path.

## Research record

- Poly Haven was used as the preferred source for the HDRI because its assets are CC0 and commercially usable without required attribution: https://polyhaven.com/license
- Sketchfab assets were deliberately not used. Its model licences are asset-specific and can require attribution or impose restrictions; a model must be individually verified and recorded here before use.

## Future asset intake

Before adding an external asset, record its asset name, creator, source URL, downloaded version/date, licence, attribution text, and all required production obligations in this document. Prefer small, compressed GLB/GLTF models and KTX2 textures. Do not add an unverified "free" asset.

## Design research notes

The experience takes cues from current high-end architecture sites: a strong first viewport, a project archive that remains navigable, and editorially restrained copy. The scroll-driven scene follows GSAP guidance by using one scrubbed parent timeline and a React lifecycle cleanup.

References:

- https://nakadadesign.com/stories/25-best-architecture-firm-websites-2026
- https://whitelam.media/insights/best-architecture-firm-websites-2026
- https://kaev.ai/work/studio-chenille
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
