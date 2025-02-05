"use client"

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/danndongi02',
    color: 'hover:text-[#2ea043]'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com',
    color: 'hover:text-[#0a66c2]'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com',
    color: 'hover:text-[#1da1f2]'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:your.email@example.com',
    color: 'hover:text-[#ea4335]'
  }
];

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href}
    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
  >
    {children}
  </Link>
);

export function Footer() {
  return (
    <footer className="relative w-full bg-gray-950">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(29,78,216,0.03),transparent)]" />
        <div className="absolute w-full h-full">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.05, 0.1, 0.05],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ian
            </motion.h3>
            <p className="text-gray-300">
              Crafting elegant solutions to complex problems
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><FooterLink href="#about">About</FooterLink></li>
              <li><FooterLink href="#skills">Skills</FooterLink></li>
              <li><FooterLink href="#projects">Projects</FooterLink></li>
              <li><FooterLink href="#contact">Contact</FooterLink></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 ${social.color} transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {new Date().getFullYear()} Ian. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex gap-4 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
