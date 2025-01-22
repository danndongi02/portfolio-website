import { motion } from "framer-motion";
import { AnimatedSection } from "../ui/section-container";
import { ContactForm } from "../ui/contact-form";
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

const contactLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/yourusername",
    color: "bg-gray-800 hover:bg-gray-700 text-white border-gray-700",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/yourusername",
    color: "bg-[#0077b5] hover:bg-[#006399] text-white border-[#006399]",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:your.email@example.com",
    color: "bg-red-600 hover:bg-red-700 text-white border-red-700",
  },
  {
    name: "WhatsApp",
    icon: MessageSquare,
    href: "https://wa.me/yourphonenumber",
    color: "bg-[#25D366] hover:bg-[#20bd5a] text-white border-[#20bd5a]",
  },
];

export function ContactSection() {
  return (
    <AnimatedSection id="contact" className="bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-[600px] mx-auto"
          >
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mx-auto w-full max-w-md"
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Connect With Me</h3>
              <p className="text-gray-300">
                Feel free to reach out through any of these platforms. I'll get back to you as soon as possible.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {contactLinks.map((link) => (
                <Button
                  key={link.name}
                  size="lg"
                  className={`gap-2 border ${link.color}`}
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </a>
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Location</h3>
              <p className="text-gray-300">
                Based in Your City, Country
                <br />
                Available for remote work worldwide
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Working Hours</h3>
              <p className="text-gray-300">
                Monday - Friday
                <br />
                9:00 AM - 6:00 PM (Your Timezone)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
