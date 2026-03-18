"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-text";
import { useMagnetic } from "@/hooks/use-magnetic";
import { fadeUp } from "@/lib/motion-variants";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-primary/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  const shapeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(shapeRef.current, {
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
        duration: 2.4,
        delay,
        ease: "power3.out",
      });

      gsap.to(innerRef.current, {
        y: 15,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: shapeRef }
  );

  return (
    <div
      ref={shapeRef}
      className={cn("absolute", className)}
      style={{ opacity: 0 }}
    >
      <div ref={innerRef} style={{ width, height }} className="relative">
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/[0.08]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"
          )}
        />
      </div>
    </div>
  );
}

function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
  description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
  subDescription,
  showButtons = true,
  onViewWorkClick,
  onContactClick,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  subDescription?: string;
  showButtons?: boolean;
  onViewWorkClick?: () => void;
  onContactClick?: () => void;
}) {
  const viewWorkRef = useRef<HTMLButtonElement>(null);
  const contactRef = useRef<HTMLButtonElement>(null);

  useMagnetic(viewWorkRef, 0.25);
  useMagnetic(contactRef, 0.25);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_92%_60%/0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(172_66%_50%/0.04),transparent_50%)]" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/[0.12]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-accent/[0.12]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-secondary/[0.12]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-primary/[0.10]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-accent/[0.10]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/[0.05] border-primary/20 mb-8 md:mb-12 cursor-default"
            >
              <Circle className="h-2 w-2 fill-primary/80" />
              <span className="text-sm text-muted-foreground tracking-wide">
                {badge}
              </span>
            </Badge>
          </motion.div>

          {/* Titles — React-safe character reveal */}
          <div className="mb-4 md:mb-6">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              <AnimatedText
                text={title1}
                delay={0.6}
                charClassName="text-foreground"
              />
              {title2 && (
                <>
                  <br />
                  <AnimatedText
                    text={title2}
                    delay={1.0}
                    charClassName="text-primary"
                  />
                </>
              )}
            </h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4"
          >
            {description}
          </motion.p>

          {/* Sub-description */}
          {subDescription && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.2, ease: "easeOut" }}
              className="text-lg sm:text-xl mb-10 font-medium tracking-wide max-w-xl mx-auto px-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground/90 to-accent"
            >
              {subDescription}
            </motion.p>
          )}

          {/* CTA Buttons */}
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                ref={viewWorkRef}
                onClick={onViewWorkClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-base font-medium shadow-lg shadow-primary/20"
              >
                View My Work
              </Button>
              <Button
                ref={contactRef}
                variant="outline"
                onClick={onContactClick}
                className="border-2 border-foreground/20 hover:bg-foreground/5 text-foreground px-8 py-3 rounded-lg text-base"
              >
                Contact Me
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60 pointer-events-none" />
    </div>
  );
}

export { HeroGeometric };
