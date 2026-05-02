"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap } from "@/lib/gsap-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TerminalWindow } from "@/components/ui/terminal-window";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!successRef.current || !errorRef.current) return;

    if (submitStatus === "success") {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, height: 0 },
        { opacity: 1, height: "auto", duration: 0.4, ease: "power2.out" }
      );
      gsap.to(errorRef.current, { opacity: 0, height: 0, duration: 0 });
    } else if (submitStatus === "error") {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, height: 0 },
        { opacity: 1, height: "auto", duration: 0.4, ease: "power2.out" }
      );
      gsap.to(successRef.current, { opacity: 0, height: 0, duration: 0 });
    } else {
      gsap.to(successRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(errorRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [submitStatus]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitStatus("success");
      form.reset();
      setTimeout(() => setSubmitStatus("idle"), 6000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TerminalWindow title="new_project.init">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#888]">
                  NAME
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your name" />
                </FormControl>
                <FormMessage className="text-destructive text-xs font-mono" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#888]">
                  EMAIL
                </FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="your@email.com" />
                </FormControl>
                <FormMessage className="text-destructive text-xs font-mono" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#888]">
                  PHONE{" "}
                  <span className="text-[#555] normal-case tracking-normal">
                    (optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="tel" placeholder="+254 712 345 678" />
                </FormControl>
                <FormMessage className="text-destructive text-xs font-mono" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#888]">
                  MESSAGE
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    placeholder="Tell me about your project..."
                  />
                </FormControl>
                <FormMessage className="text-destructive text-xs font-mono" />
              </FormItem>
            )}
          />

          {/* Success message */}
          <div
            ref={successRef}
            className="overflow-hidden"
            style={{ opacity: 0, height: 0 }}
          >
            <div className="text-xs font-mono text-[#22c55e] border border-[#22c55e]/20 px-4 py-3">
              // message sent — check your inbox for a confirmation
            </div>
          </div>

          {/* Error message */}
          <div
            ref={errorRef}
            className="overflow-hidden"
            style={{ opacity: 0, height: 0 }}
          >
            <div className="text-xs font-mono text-[#ff4f33] border border-[#ff4f33]/20 px-4 py-3">
              // something went wrong — please try again or reach out directly
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Initialize Project →"
            )}
          </Button>

          <p className="text-[11px] font-mono text-[#666]">
            // typically responds within 24 hours
          </p>
        </form>
      </Form>
    </TerminalWindow>
  );
}
