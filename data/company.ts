export type Project = {
  name: string;
  type: string;
  location: string;
  status: string;
  image: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type MaterialStudy = {
  name: string;
  body: string;
  tone: "concrete" | "metal" | "timber";
};

export const company = {
  companyName: "ZKS Group",
  shortLocation: "Sydney",
  location: "Sydney, Australia",
  navigation: [
    { label: "Story", href: "#story" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    title: "We build",
    emphasis: "with intent.",
    intro: "A construction story in eight precise movements.",
    closingTitle: "A building has a point of view.",
    closingBody: "Architecture, construction and landscape moving as one.",
    cta: "Explore ZKS",
  },
  about: {
    eyebrow: "An integrated construction practice",
    title: "Built with a sharper line of sight.",
    body: "We bring the moving parts of construction into one considered process: design intent, materials, programme and site delivery.",
  },
  story: {
    eyebrow: "Construction story",
    title: "The building is the brief, made visible.",
    body: "This demonstration site shows how a pavilion can be read as a sequence: ground, structure, enclosure, light and landscape. Replace this copy when a live company identity is confirmed.",
  },
  services: [
    "Residential construction",
    "Commercial fit-outs",
    "Design coordination",
    "Construction management",
  ],
  projects: [
    { name: "Harbour House", type: "Private residence", location: "Sydney", status: "Concept study", image: "/fallback/completed-pavilion.png" },
    { name: "The Courtyard", type: "Multi-residential", location: "Inner West", status: "Concept study", image: "/fallback/completed-pavilion.png" },
    { name: "Ridge Pavilion", type: "Hospitality", location: "Northern Beaches", status: "Concept study", image: "/fallback/completed-pavilion.png" },
  ] satisfies Project[],
  materials: [
    { name: "Board-formed concrete", body: "Structure with a precise, tactile finish.", tone: "concrete" },
    { name: "Bronzed metalwork", body: "A robust edge with a measured reflectance.", tone: "metal" },
    { name: "Engineered timber", body: "Warmth balanced with technical performance.", tone: "timber" },
  ] satisfies MaterialStudy[],
  process: [
    { title: "Listen and define", body: "Set a clear brief, budget range and shared measure of success." },
    { title: "Coordinate and prepare", body: "Resolve the information that makes confident construction possible." },
    { title: "Build with discipline", body: "Keep the site calm, safe and decisively managed." },
    { title: "Complete with care", body: "Close out details and hand over a building ready to live in." },
  ] satisfies ProcessStep[],
  statistics: [
    { value: "01", label: "Integrated delivery team" },
    { value: "08", label: "Construction stages" },
    { value: "360", label: "Degrees of project visibility" },
  ],
  credentials: {
    title: "Proper planning is a form of craft.",
    body: "Credentials, licences, project experience and client references will be confirmed for the selected company before this demonstration site is published.",
  },
  contact: {
    email: "hello@zksgroup.example",
    phone: "+61 0 0000 0000",
    address: "Sydney, New South Wales",
  },
  social: {
    instagram: "#",
    linkedin: "#",
  },
  brand: {
    accent: "#d6ff56",
    ink: "#10110e",
    description: "A demonstration identity for a premium Sydney construction website.",
  },
} as const;

export type CompanyConfig = typeof company;
