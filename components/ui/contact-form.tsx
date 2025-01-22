import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./button";
import { motion } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulated form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitStatus("success");
    setIsSubmitting(false);
    reset();
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
          Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
          placeholder="Your message..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <motion.div
        initial={false}
        animate={
          submitStatus === "success"
            ? { opacity: 1, height: "auto" }
            : { opacity: 0, height: 0 }
        }
        className="overflow-hidden"
      >
        <p className="text-green-400 text-sm">
          Thank you! Your message has been sent successfully.
        </p>
      </motion.div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white hover:bg-blue-500"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
