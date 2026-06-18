/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, TimelineItem, SkillItem, ServiceItem, EducationItem, ContactMethod, NavItem } from "./types";
import { image } from "./image";

const tygraphProductImage = image("product");
const tygraphGalleryImages = [image("ui4"), image("ui5"), image("ui6")];
const shareblogImage = image("shareblog");

export const PROJECTS: Project[] = [
  {
    id: "tygraph",
    title: "TyGraph Product",
    description: "A business metrics analytics dashboard environment displaying tenant license usage, OneDrive logs, and SharePoint adoption details.",
    longDescription: "TyGraph Product is an enterprise-scale governance and adoption platform designed to help organizations monitor, analyze, and optimize their collaboration workspaces. Built with heavy emphasis on state-management speed and smooth transitions, it tracks tenant seats across Sales, IT, and Customer success departments, reporting detailed real-time trends on licensed users, unique readers, active OneDrive users, and SharePoint metrics.",
    image: tygraphProductImage,
    gallery: tygraphGalleryImages,
    tags: ["React", "TypeScript", "Redux", "SCSS", "D3.js", "REST API"],
    demoUrl: "#demo-tygraph",
    sourceUrl: "#src-tygraph",
    techDetails: {
      language: "React, TypeScript, ES6+",
      architecture: "Client-side dashboard powered by aggregated REST API endpoints",
      performance: "Optimized state tracking using Redux to process complex licensing telemetry datasets under sub-second latency"
    }
  },
  {
    id: "shareblog",
    title: "Share Blog Website",
    description: "Multi-column responsive blogging and article publication system with real-time categorizations and reader discussions.",
    longDescription: "Share Blog Website is a full-featured content hub optimized for technical documentation and tech articles. Built utilizing ASP.NET Core alongside SQL Server and Entity Framework, it provides active article sorting, real-time query searching, popular article rankings, follow widgets, and interactive social discussion boards.",
    image: shareblogImage,
    gallery: [shareblogImage],
    tags: ["ASP.NET Core", "Entity Framework", "SQL Server", "SCSS", "JavaScript"],
    demoUrl: "#demo-shareblog",
    sourceUrl: "#src-shareblog",
    techDetails: {
      language: "C#, JavaScript, SQL",
      architecture: "Robust Model-View-Controller backend with Entity Framework Core database mapping",
      performance: "Strict indexing of text columns inside MSSQL database, resulting in millisecond response times for client searches"
    }
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "avepoint-se",
    yearKey: "portfolio.page.experience.junior.duration",
    roleKey: "portfolio.page.experience.junior.title",
    companyKey: "portfolio.page.experience.junior.company",
    descKey: "portfolio.page.experience.junior.description",
    skills: ["React", "TypeScript", "Redux", "REST API", "SCSS"]
  },
  {
    id: "avepoint-intern",
    yearKey: "portfolio.page.experience.intern.duration",
    roleKey: "portfolio.page.experience.intern.title",
    companyKey: "portfolio.page.experience.intern.company",
    descKey: "portfolio.page.experience.intern.description",
    skills: ["React", "SCSS", "Redux", "JavaScript", "Git"]
  },
  // {
  //   id: "grocery-staff",
  //   yearKey: "portfolio.page.experience.grocery.duration",
  //   roleKey: "portfolio.page.experience.grocery.title",
  //   companyKey: "portfolio.page.experience.grocery.company",
  //   descKey: "portfolio.page.experience.grocery.description",
  //   skills: ["Communication", "Soft Skills"]
  // }
];

export const SKILLS: SkillItem[] = [
  {
    name: "HTML 5",
    icon: "html5",
    colorClass: "text-[#E34F26]",
    description: "Semantic standards, responsive structuring, and optimized web DOM models."
  },
  {
    name: "SCSS",
    icon: "scss",
    colorClass: "text-[#CF649A]",
    description: "Modular styling, nested configurations, variables, mixins, and advanced layout processors."
  },
  {
    name: "JavaScript (ES6+)",
    icon: "javascript",
    colorClass: "text-[#F7DF1E]",
    description: "Dynamic scripting, asynchronous requests, functional paradigms, and direct DOM manipulation."
  },
  {
    name: "TypeScript",
    icon: "typescript",
    colorClass: "text-[#3178C6]",
    description: "Strict typing systems, generics, interface declaration, and compile-time validation."
  },
  {
    name: "React",
    icon: "react",
    colorClass: "text-[#61DAFB]",
    description: "Declarative component styling, state management, complex hooks optimization, and functional lifecycle loops."
  },
  {
    name: "Git",
    icon: "git",
    colorClass: "text-[#F05032]",
    description: "Version control systems, branching flow, commit structures, and collaborative repository management."
  },
  {
    name: "C# .NET",
    icon: "csharp",
    colorClass: "text-[#5C2D91]",
    description: "Backend architecture design, type-safe OOP pipelines, ASP.NET Web API integration."
  },
  {
    name: "MSSQL",
    icon: "mssql",
    colorClass: "text-[#CC292B]",
    description: "Relational database structures, high-performance query indexing, stored procedures, and triggers."
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    colorClass: "text-[#47A248]",
    description: "Document/NoSQL structures, high-scalability JSON storage, and flexible collection mapping."
  },
  {
    name: "REST API",
    icon: "restapi",
    colorClass: "text-[#00A86B]",
    description: "Secure endpoint patterns, payload serialization, clean status response structures, and authorization filters."
  },
  {
    name: "Entity Framework Core",
    icon: "efcore",
    colorClass: "text-[#68217A]",
    description: "Database-first and code-first ORM mapping, query optimized data fetching, and automated schema migrations."
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "software",
    titleKey: "portfolio.page.card.service.software.title",
    descKey: "portfolio.page.card.service.software.desc",
    icon: "terminal",
    borderColorClass: "border-b-blue-400",
    bgColorClass: "bg-blue-50",
    textColorClass: "text-blue-600",
    borderHoverClass: "hover:border-blue-400"
  },
  {
    id: "webdesign",
    titleKey: "portfolio.page.card.service.webdesign.title",
    descKey: "portfolio.page.card.service.webdesign.desc",
    icon: "globe",
    borderColorClass: "border-b-teal-400",
    bgColorClass: "bg-teal-50",
    textColorClass: "text-teal-600",
    borderHoverClass: "hover:border-teal-400"
  },
  {
    id: "application",
    titleKey: "portfolio.page.card.service.application.title",
    descKey: "portfolio.page.card.service.application.desc",
    icon: "smartphone",
    borderColorClass: "border-b-violet-500",
    bgColorClass: "bg-violet-50",
    textColorClass: "text-violet-600",
    borderHoverClass: "hover:border-violet-500"
  }
];

export const EDUCATIONS: EducationItem[] = [
  {
    id: "ud-use",
    titleKey: "portfolio.page.education.label",
    metaKey: "portfolio.page.education.duration",
    metaLabelKey: "portfolio.page.education.major",
    descriptionKeys: [
      "portfolio.page.education.description",
      "portfolio.page.education.projects",
      "portfolio.page.education.extracurricular",
      "portfolio.page.education.conclusion"
    ],
    icon: "gradCap"
  },
  {
    id: "eng-b2",
    titleKey: "portfolio.page.certification.b1.label",
    metaKey: "portfolio.page.certification.b1.description",
    metaLabelKey: "portfolio.page.certification.b1.level",
    descriptionKeys: [
      "portfolio.page.certification.b1.title",
      "portfolio.page.certification.b1.details"
    ],
    icon: "certificate"
  }
];

export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: "mail",
    icon: "mail",
    labelKey: "Email",
    value: "nguyennamnvl267@gmail.com",
    href: "mailto:nguyennamnvl267@gmail.com"
  },
  {
    id: "phone",
    icon: "phone",
    labelKey: "Phone",
    value: "+84372928669",
    href: "tel:+84372928669"
  },
  {
    id: "location",
    icon: "mapPin",
    labelKey: "Location",
    value: "",
    valueKey: "portfolio.page.contact.address"
  }
];

export const NAV_ITEMS: NavItem[] = [
  { id: "home", labelKey: "portfolio.page.nav.home" },
  { id: "about", labelKey: "portfolio.page.about" },
  { id: "services", labelKey: "portfolio.page.service" },
  { id: "skills", labelKey: "portfolio.page.skills" },
  { id: "educations", labelKey: "portfolio.page.education" },
  { id: "experiences", labelKey: "portfolio.page.experience" },
  { id: "projects", labelKey: "portfolio.page.project" },
  { id: "contacts", labelKey: "portfolio.page.contact" }
];
