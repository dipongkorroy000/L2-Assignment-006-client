import Logo from "@/assets/icons/Logo";
import React from "react";
import {FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";
import {Link} from "react-router";

interface Footer7Props {
  logo?: {url: string; src: string; alt: string; title: string};
  sections?: Array<{title: string; links: Array<{name: string; href: string}>}>;
  description?: string;
  socialLinks?: Array<{icon: React.ReactElement; href: string; label: string}>;
  copyright?: string;
  legalLinks?: Array<{name: string; href: string}>;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      {name: "Overview", href: "/"},
      {name: "Frequently asked questions", href: "/faq"},
    ],
  },
  {
    title: "Company",
    links: [
      {name: "About", href: "/about-us"},
      {name: "Team", href: "/"},
    ],
  },
];

const defaultSocialLinks = [
  {icon: <FaInstagram className="size-5" />, href: "https://www.instagram.com/dipongkorroy000", label: "Instagram"},
  {icon: <FaTwitter className="size-5" />, href: "https://x.com/dipongkorroy000", label: "Twitter"},
  {icon: <FaLinkedin className="size-5" />, href: "https://www.linkedin.com/in/dipongkor", label: "LinkedIn"},
];

const defaultLegalLinks = [
  {name: "Terms and Conditions", href: "/"},
  {name: "Privacy Policy", href: "/privacy"},
];

const Footer = ({
  sections = defaultSections,
  description = "A collection of components for your startup business or side project.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 ParcelDelivery.com. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section>
      <div className="w-full mx-auto container space-y-8 py-16 max-md:px-6 max-md:py-5 border px-10 rounded mb-10 max-md:mb-5">
        <div className="flex w-full flex-col justify-between gap-10 max-md:gap-5 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 max-md:gap-3 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <Logo></Logo>
              <h2 className="text-xl font-semibold"></h2>
            </div>
            <p className="text-muted-foreground max-w-[70%] text-sm">{description}</p>
            <ul className="text-muted-foreground flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary font-medium">
                  <a target="_blank" href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold max-md:mb-2">Product</h3>
                <ul className="text-muted-foreground space-y-3 text-sm max-md:space-y-1">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="hover:text-primary font-medium">
                      <Link to={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t py-8 max-md:py-4 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <Link to={link.href}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
