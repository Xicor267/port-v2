/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  tags: string[];
  demoUrl: string;
  sourceUrl: string;
  techDetails: {
    language: string;
    architecture: string;
    performance: string;
  };
}

export interface TimelineItem {
  id: string;
  yearKey: string;
  roleKey: string;
  companyKey: string;
  descKey: string;
  skills: string[];
}

export interface SkillItem {
  name: string;
  icon: string;
  colorClass: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  titleKey: string;
  descKey: string;
  icon: "terminal" | "globe" | "smartphone";
  borderColorClass: string;
  bgColorClass: string;
  textColorClass: string;
  borderHoverClass: string;
}

export interface EducationItem {
  id: string;
  titleKey: string;
  metaKey?: string;
  metaLabelKey?: string;
  descriptionKeys: string[];
  icon: "gradCap" | "certificate";
}

export interface ContactMethod {
  id: string;
  icon: "mail" | "phone" | "mapPin";
  labelKey: string;
  value: string;
  href?: string;
  valueKey?: string;
}

export interface NavItem {
  id: string;
  labelKey: string;
}

declare global {
  interface Window {
    image: (name: string) => string;
  }
  function image(name: string): string;
}

