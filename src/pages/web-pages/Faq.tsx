import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Mail, Phone, MapPin} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router";

const faqItems = [
  {
    id: "faq-1",
    question: "How do I track my parcel?",
    answer:
      "You can track your parcel by entering the tracking ID on our tracking page. You'll see real-time updates including pickup, transit, and delivery status.",
  },
  {
    id: "faq-2",
    question: "What types of items can I send?",
    answer: "We support documents, books, electronics, and small packages. Please avoid sending fragile or restricted items without prior approval.",
  },
  {
    id: "faq-3",
    question: "How long does delivery take?",
    answer: "Delivery time depends on the destination. Local deliveries usually take 1–2 days, while inter-division parcels may take 2–4 business days.",
  },
  {
    id: "faq-4",
    question: "Can I cancel or modify a parcel after booking?",
    answer: "Yes, you can cancel or update parcel details before it's picked up. Once dispatched, changes may not be possible.",
  },
  {
    id: "faq-5",
    question: "What payment methods are supported?",
    answer: "We accept online payments via SSLCommerz, as well as cash on delivery (COD) for eligible parcels.",
  },
  {
    id: "faq-6",
    question: "What happens if my parcel is delayed or lost?",
    answer: "We take delivery seriously. If your parcel is delayed or lost, our support team will investigate and assist you with resolution or compensation.",
  },
];

const ContactAndFaq = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Panel */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5" />
              <span>project@example.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5" />
              <span>+880 1234-567890</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5" />
              <span>123, Project Road, Dhaka, Bangladesh</span>
            </div>
            <Button variant="secondary" onClick={() => navigate("/contact")}>
              Go to Contact Page
            </Button>
          </CardContent>
        </Card>

        {/* FAQ Panel */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="hover:no-underline hover:opacity-70">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactAndFaq;
