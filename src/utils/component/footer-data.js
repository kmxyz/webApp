import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

// Social Media Links
export const socialLinks = [
  {
    id: 1,
    icon: FaTwitter,
    url: "https://x.com/covecode?s=21",
    ariaLabel: "Twitter",
  },
  {
    id: 2,
    icon: FaFacebook,
    url: "https://www.facebook.com/profile.php?id=61573752639434",
    ariaLabel: "Facebook",
  },
  {
    id: 3,
    icon: FaInstagram,
    url: "https://www.instagram.com/codecove88/",
    ariaLabel: "Instagram",
  },
];

// Quick Links Navigation
export const quickLinks = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About us", url: "/about" },
  { id: 3, name: "Services", url: "/services" },
  //{ id: 4, name: "Case Studies", url: "/case-studies" },
  { id: 4, name: "Contact", url: "/contact" },
];

// Services Links
export const serviceLinks = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Mobile Apps" },
  { id: 3, name: "UI/UX Design" },
  { id: 4, name: "E-Commerce Solutions" },
  { id: 5, name: "IT Consulting" },
];

// Contact Information
export const contactInfo = [
  {
    id: 1,
    icon: MdEmail,
    text: "codecove88@gmail.com",
    type: "email",
  },
];

// Company Information
export const companyInfo = {
  name: "CodeCove Developers",
  description:
    "We create stunning web and mobile applications tailored to your business needs.",
};
