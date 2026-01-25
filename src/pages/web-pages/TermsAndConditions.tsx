import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";

const TermsAndConditions = () => {
  return (
    <section className="container mx-auto py-10 px-4 min-h-screen">
      <Card className="max-w-3xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                By accessing and using our services, you agree to comply with the following terms and conditions. These terms govern your use of our platform
                and any transactions made through it.
              </p>

              <h4 className="text-base font-semibold">1. Service Usage</h4>
              <p>You must be at least 18 years old to use our services. You agree not to misuse the platform or engage in fraudulent activities.</p>

              <h4 className="text-base font-semibold">2. Payment & Refunds</h4>
              <p>All payments are processed securely. Refunds are subject to our refund policy and may take up to 7 business days.</p>

              <h4 className="text-base font-semibold">3. Privacy Policy</h4>
              <p>We respect your privacy. All personal data is handled according to our privacy policy, which you can review on our website.</p>

              <h4 className="text-base font-semibold">4. Changes to Terms</h4>
              <p>We reserve the right to update these terms at any time. Continued use of the service implies acceptance of the updated terms.</p>

              <p>If you have any questions or concerns, please contact our support team at support@example.com.</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  );
};

export default TermsAndConditions;
