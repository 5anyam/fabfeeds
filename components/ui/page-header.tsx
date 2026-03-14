import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  className?: string;
}

export function PageHeader({ title, description, breadcrumb, className }: PageHeaderProps) {
  return (
    <section className={cn("bg-gradient-to-r from-[#3AA6FF] to-[#2690E6] text-white py-16", className)}>
      <Container>
        {breadcrumb && (
          <nav className="flex items-center space-x-2 text-blue-100 mb-6">
            <Link href="/" className="flex items-center hover:text-white transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumb.map((item, index) => (
              <div key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2" />
                {item.href ? (
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </div>
            ))}
          </nav>
        )}
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">{title}</h1>
        {description && (
          <p className="text-xl text-blue-100 max-w-3xl">{description}</p>
        )}
      </Container>
    </section>
  );
}