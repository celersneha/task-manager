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
    <footer className="relative bg-[var(--color-background)] py-2 px-4 border-t border-[var(--color-secondary)]/20 z-10 overflow-hidden max-h-[120px] w-full">
      {/* Footer Content */}
      <div className="relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            {/* Social Links */}
            <div className="flex flex-col items-center order-2 md:order-1 md:mt-0">
              <div className="flex space-x-3 mb-2">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[var(--color-surface)] hover:bg-[var(--color-accent)] rounded-full transition-all duration-200 hover:scale-110 text-[var(--color-primary)] hover:text-white"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            {/* Logo and tagline */}
            <div className="order-1 md:order-2">
              <div className="flex flex-col items-center space-y-2 mb-0">
                <span className="text-[var(--color-secondary)] text-xs">
                  Manage your tasks efficiently with TaskManager
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center text-[var(--color-secondary)] text-xs pt-1">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-[var(--color-primary)] font-semibold">
              TaskManager
            </span>
            . All rights reserved.
          </p>
          <p className="mt-0.5 text-[var(--color-accent)] font-medium">
            Built for smarter task management.
          </p>
        </div>
      </div>
    </footer>
  );
}
