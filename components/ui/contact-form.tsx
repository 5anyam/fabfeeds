"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ContactFormProps {
  title?: string;
  showServices?: boolean;
  className?: string;
}

const services = [
  "Company Registration",
  "NCLT Matters",
  "Annual Compliance",
  "Trademark Registration",
  "Conversion Services", 
  "Strike Off Services",
  "Other Services"
];

export function ContactForm({ 
  title = "Request a Callback", 
  showServices = true,
  className 
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would send an actual email
      console.log("Contact form submission:", formData);
      
      toast.success("Thank you! We'll contact you soon - हम आपसे जल्द ही संपर्क करेंगे");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <Phone className="mr-2 h-5 w-5 text-[#3AA6FF]" />
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Get expert CS guidance - हम आपको बेहतरीन सलाह देंगे
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="Your full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              placeholder="+91 9876543210"
              required
            />
          </div>
          
          {showServices && (
            <div>
              <Label htmlFor="service">Service Required</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange("message")}
              placeholder="Tell us about your requirements..."
              rows={3}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#3AA6FF] hover:bg-[#2690E6] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Request Callback
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-4 pt-4 border-t text-center">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <Mail className="mr-2 h-4 w-4" />
            <span>contact@cspkindia.in</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}