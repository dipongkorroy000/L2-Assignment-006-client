"use client";

import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Mail, Phone, MapPin} from "lucide-react";

export function Contact() {
  return (
    <section className="container max-w-xl mx-auto my-10">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-secondary" />
            <span>project@example.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-secondary" />
            <span>+880 1234-567890</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-secondary" />
            <span>123, Project Road, Dhaka, Bangladesh</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
