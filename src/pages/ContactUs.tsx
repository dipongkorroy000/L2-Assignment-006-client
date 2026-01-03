import {Mail, MapPin, MessageCircle, Phone} from "lucide-react";

interface Contact7Props {
  title?: string;
  description?: string;
  emailLabel?: string;
  emailDescription?: string;
  email?: string;
  officeLabel?: string;
  officeDescription?: string;
  officeAddress?: string;
  phoneLabel?: string;
  phoneDescription?: string;
  phone?: string;
  chatLabel?: string;
  chatDescription?: string;
  chatLink?: string;
}

const ContactUs = ({
  title = "Contact Us",
  description = "Contact the support team at ShadcnBlocks.",
  emailLabel = "Email",
  emailDescription = "We respond to all emails within 24 hours.",
  email = "example@shadcnblocks.com",
  officeLabel = "Office",
  officeDescription = "Drop by our office for a chat.",
  officeAddress = "1 Eagle St, Brisbane, QLD, 4000",
  phoneLabel = "Phone",
  phoneDescription = "We're available Mon-Fri, 9am-5pm.",
  phone = "+123 456 7890",
  chatLabel = "Live Chat",
  chatDescription = "Get instant help from our support team.",
  chatLink = "Start Chat",
}: Contact7Props) => {
  return (
    <section className="bg-background py-10 max-md:py-5 max-md:px-5">
      <div className="container mx-auto lg:space-y-6 md:space-y-4 space-y-3">
        <div className="lg:space-y-6 md:space-y-4 space-y-3">
          <h1 className="2xl:text-4xl xl:text-3xl lg:text-3xl md:text-2xl text-xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-balance 2xl:text-lg xl:text-base lg:text-sm text-sm">{description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-md:gap-3">
          <div className="bg-muted rounded-lg p-6 max-md:p-5">
            <span className="bg-accent mb-3 max-md:mb-0 flex size-12 flex-col items-center justify-center rounded-full">
              <Mail className="h-6 w-auto" />
            </span>
            <p className="mb-2 max-md:mb-1 text-lg font-semibold">{emailLabel}</p>
            <p className="text-muted-foreground mb-3 max-md:mb-1">{emailDescription}</p>
            <a href={`mailto:${email}`} className="font-semibold hover:underline">
              {email}
            </a>
          </div>

          <div className="bg-muted rounded-lg p-6 max-md:p-5">
            <span className="bg-accent mb-3 max-md:mb-0 flex size-12 flex-col items-center justify-center rounded-full">
              <MapPin className="h-6 w-auto" />
            </span>
            <p className="mb-2 max-md:mb-1 text-lg font-semibold">{officeLabel}</p>
            <p className="text-muted-foreground mb-3 max-md:mb-1">{officeDescription}</p>
            <a href="#" className="font-semibold hover:underline">
              {officeAddress}
            </a>
          </div>

          <div className="bg-muted rounded-lg p-6 max-md:p-5">
            <span className="bg-accent mb-3 max-md:mb-0 flex size-12 flex-col items-center justify-center rounded-full">
              <Phone className="h-6 w-auto" />
            </span>
            <p className="mb-2 max-md:mb-1 text-lg font-semibold">{phoneLabel}</p>
            <p className="text-muted-foreground mb-3 max-md:mb-1">{phoneDescription}</p>
            <a href={`tel:${phone}`} className="font-semibold hover:underline">
              {phone}
            </a>
          </div>

          <div className="bg-muted rounded-lg p-6 max-md:p-5">
            <span className="bg-accent mb-3 max-md:mb-0 flex size-12 flex-col items-center justify-center rounded-full">
              <MessageCircle className="h-6 w-auto" />
            </span>
            <p className="mb-2 max-md:mb-1 text-lg font-semibold">{chatLabel}</p>
            <p className="text-muted-foreground mb-3 max-md:mb-1">{chatDescription}</p>
            <a href="#" className="font-semibold hover:underline">
              {chatLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
