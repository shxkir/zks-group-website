"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { company } from "@/data/company";

export function Header() {
  const [open, setOpen] = useState(false);
  const [primary, ...rest] = company.companyName.split(" ");

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={`${company.companyName} home`}>
        <span>{primary}</span>
        {rest.length > 0 ? <i>{rest.join(" ")}</i> : null}
      </a>
      <nav className={open ? "nav-open" : ""} aria-label="Main navigation">
        {company.navigation.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="header-contact" href="#contact">Start a conversation <span>↗</span></a>
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}
