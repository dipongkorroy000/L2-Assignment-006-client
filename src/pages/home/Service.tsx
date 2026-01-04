import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import deliveryHero from "@/assets/images/deliveryHero.jpg";
import statusUpdate from "@/assets/images/statusUpdate.jpg";
import secureDelivery from "@/assets/images/secureDelivery.jpg";
import flexiblePayment from "@/assets/images/flexiblePayment.jpg";

interface Feature {
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    title: "Nationwide Coverage",
    description: "From Dhaka to Dinajpur, we deliver everywhere.",
    image: deliveryHero,
  },
  {
    title: "Live Status Updates",
    description: "Know exactly where your parcel is.",
    image: statusUpdate,
  },
  {
    title: "Secure Handling",
    description: "Every item is treated with care.",
    image: secureDelivery,
  },
  {
    title: "Flexible Payment Options",
    description: "Pay online or on delivery.",
    image: flexiblePayment,
  },
];

const Service = () => {
  return (
    <section className="py-16 lg:py-24 bg-background px-5">
      <div className="container mx-auto text-center space-y-6">
        {/* Heading */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-xl md:text-4xl font-bold">Track Your Parcel in Real Time</h1>
          <p className="text-muted-foreground text-sm md:text-lg">
            Enter your tracking ID and get instant updates on your parcel’s journey—from pickup to delivery.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:gap-8 gap-3 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {features.map((feature, idx) => (
            <Card key={idx} className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-md:space-y-2">
                <p className="text-muted-foreground text-sm">{feature.description}</p>
                <div className="relative w-full h-40 md:h-48 lg:h-56 rounded-md overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
