import { Github, Linkedin, PhoneCall } from "lucide-react";
import { contactData } from "./contactData";
export const socialLinks = [
  {
    href: contactData.github,
    label: "GitHub",
    icon: <Github className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    href: contactData.linkedin,
    label: "LinkedIn",
    icon: <Linkedin className="w-4 h-4" strokeWidth={1.5} />,
  },
  {
    href: `https://wa.me/${contactData.phone.replace(/\D/g, "")}`,
    label: "WhatsApp",
    icon: <PhoneCall className="w-4 h-4" strokeWidth={1.5} />,
  },
];
