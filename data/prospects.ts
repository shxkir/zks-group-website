import { company, type CompanyConfig } from "./company";

export type ProspectDemo = {
  id: string;
  label: string;
  location: string;
  note: string;
  active: boolean;
};

export const prospectDemos: ProspectDemo[] = [
  {
    id: "zks",
    label: "ZKS Group",
    location: "Sydney, Australia",
    note: "Current demonstration identity. Not a claim of trading history.",
    active: true,
  },
  {
    id: "fjc-bankstown",
    label: "F.J.C Design and Construction",
    location: "Bankstown, NSW",
    note: "Prospective demo target identified from public web listings only. No endorsement, employment, or client relationship is implied.",
    active: false,
  },
  {
    id: "kj-cronulla",
    label: "KJ Building Services Pty Ltd",
    location: "Cronulla, NSW",
    note: "Prospective demo target identified from public web listings only. No endorsement, employment, or client relationship is implied.",
    active: false,
  },
];

export function createProspectCompany(overrides: Partial<CompanyConfig>): CompanyConfig {
  return {
    ...company,
    ...overrides,
    hero: { ...company.hero, ...overrides.hero },
    about: { ...company.about, ...overrides.about },
    story: { ...company.story, ...overrides.story },
    contact: { ...company.contact, ...overrides.contact },
    social: { ...company.social, ...overrides.social },
    brand: { ...company.brand, ...overrides.brand },
    credentials: { ...company.credentials, ...overrides.credentials },
  };
}
