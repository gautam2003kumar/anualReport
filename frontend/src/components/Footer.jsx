import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = ({ description, socials }) => {
  return (
    <footer className="bg-green-900 text-white text-center p-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-lg font-bold">🌿 Our NGO – Making a Difference</p>
        <p className="mt-2 text-sm">{description}</p>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mt-4">
          {socials.map((social, index) => {
            const Icon =
              social.name === "Facebook"
                ? Facebook
                : social.name === "Twitter"
                ? Twitter
                : social.name === "Instagram"
                ? Instagram
                : Linkedin; // Default to Linkedin if unknown

            return (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300"
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="mt-4 text-xs">&copy; 2025 Our NGO. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
