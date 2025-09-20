"use client";

import { FiGithub, FiLinkedin, FiMail, FiCoffee } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub className="w-4 h-4" />,
      href: "https://github.com/celersneha",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin className="w-4 h-4" />,
      href: "https://www.linkedin.com/in/celersneha/",
    },
    {
      name: "Twitter",
      icon: <RiTwitterXLine className="w-4 h-4" />,
      href: "https://twitter.com/celersneha",
    },
    {
      name: "Buy me a coffee",
      icon: <FiCoffee className="w-4 h-4" />,
      href: "https://buymeacoffee.com/celersneha",
    },
    {
      name: "Email",
      icon: <FiMail className="w-4 h-4" />,
      href: "mailto:celersneha@gmail.com",
    },
  ];

  return (
    <footer className="relative bg-[var(--color-background)] py-4 px-4 border-t border-[var(--color-secondary)]/20 z-10 overflow-hidden w-full">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[var(--color-primary)] font-bold text-lg tracking-tight">
              TaskManager
            </span>
            <span className="text-[var(--color-primary)] text-xs mt-1">
              Manage your tasks efficiently with TaskManager
            </span>
          </div>
          {/* Social Links */}
          <div className="flex flex-row items-center space-x-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--color-surface)] hover:bg-[var(--color-accent)] rounded-full transition-all duration-200  text-[var(--color-primary)] hover:text-white"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center text-[var(--color-primary)] text-xs pt-3 border-t border-[var(--color-primary)]/10 mt-4">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-[var(--color-primary)] font-semibold">
              TaskManager
            </span>
            . All rights reserved.
          </p>
          <p className="mt-0.5 text-[var(--color-primary)] font-medium">
            Built for smarter task management.
          </p>
        </div>
      </div>
    </footer>
  );
}
