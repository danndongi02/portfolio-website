"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageSquare, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/ui/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion-wrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const contactLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/yourusername",
    hoverColor: "#6e5494",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/yourusername",
    hoverColor: "#0077b5",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:your.email@example.com",
    hoverColor: "#ef4444",
  },
  {
    name: "WhatsApp",
    icon: MessageSquare,
    href: "https://wa.me/yourphonenumber",
    hoverColor: "#25D366",
  },
];

export function ContactSection() {
  return (
    <TooltipProvider delayDuration={200}>
      <section
        id="contact"
        className="bg-background min-h-screen relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <SectionHeading
            badge="CONTACT"
            title="Get In Touch"
            description="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
            align="center"
          />

          <div className="grid gap-12 md:grid-cols-2 items-start max-w-5xl mx-auto">
            {/* Contact Form */}
            <SlideIn direction="left">
              <div className="mx-auto w-full max-w-md">
                <ContactForm />
              </div>
            </SlideIn>

            {/* Contact Info */}
            <SlideIn direction="right">
              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    Connect With Me
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Feel free to reach out through any of these platforms.
                    I&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                {/* Social links */}
                <StaggerContainer className="flex flex-wrap gap-3">
                  {contactLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <StaggerItem key={link.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.08, y: -3 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Button
                                asChild
                                variant="outline"
                                className="gap-2 border-border bg-card text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                              >
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Icon className="h-4 w-4" />
                                  {link.name}
                                </a>
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="bg-card text-card-foreground border-border"
                          >
                            Open {link.name}
                          </TooltipContent>
                        </Tooltip>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>

                {/* Info cards */}
                <FadeIn>
                  <div className="space-y-4">
                    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            Location
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            Based in Your City, Country
                            <br />
                            Available for remote work worldwide
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Clock className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            Working Hours
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            Monday - Friday
                            <br />
                            9:00 AM - 6:00 PM (Your Timezone)
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </FadeIn>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
