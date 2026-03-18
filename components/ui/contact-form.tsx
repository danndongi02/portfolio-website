"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // GSAP focus animations on form fields
  useGSAP(
    () => {
      if (!formRef.current) return;

      const fields =
        formRef.current.querySelectorAll<HTMLElement>("input, textarea");

      fields.forEach((field) => {
        field.addEventListener("focus", () => {
          gsap.to(field, {
            borderColor: "hsl(38, 92%, 60%)",
            boxShadow: "0 0 0 3px hsla(38, 92%, 60%, 0.15)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        field.addEventListener("blur", () => {
          gsap.to(field, {
            borderColor: "hsl(222, 20%, 20%)",
            boxShadow: "0 0 0 0px hsla(38, 92%, 60%, 0)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: formRef }
  );

  // Animate success message in/out
  useEffect(() => {
    if (!successRef.current) return;

    if (submitStatus === "success") {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, height: 0, y: -10 },
        {
          opacity: 1,
          height: "auto",
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(successRef.current, {
        opacity: 0,
        height: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [submitStatus]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulated form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitStatus("success");
    setIsSubmitting(false);
    form.reset();
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  return (
    <div ref={formRef}>
      <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm font-medium">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your name"
                        className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/30 focus-visible:border-primary transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="your.email@example.com"
                        className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/30 focus-visible:border-primary transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm font-medium">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Your message..."
                        className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/30 focus-visible:border-primary transition-all duration-300 resize-none"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-xs" />
                  </FormItem>
                )}
              />

              {/* Success message */}
              <div
                ref={successRef}
                className="overflow-hidden"
                style={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-center gap-2 text-accent text-sm bg-accent/10 border border-accent/20 rounded-lg px-4 py-3">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-base font-medium transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
