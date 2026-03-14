import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

interface CTAButton {
  text: string;
  href: string;
  variant?: "default" | "outline";
}

interface CTAProps {
  title: string;
  description: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  className?: string;
}

export function CTA({ title, description, primaryButton, secondaryButton, className }: CTAProps) {
  return (
    <section className={`bg-gradient-to-r from-[#3AA6FF] to-[#2690E6] text-white py-16 lg:py-24 ${className || ''}`}>
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-[#3AA6FF] hover:bg-gray-100">
              <Link href={primaryButton.href}>{primaryButton.text}</Link>
            </Button>
            {secondaryButton && (
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-white text-white hover:bg-white hover:text-[#3AA6FF]"
              >
                <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}