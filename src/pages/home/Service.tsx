import deliveryHero from "@/assets/images/deliveryHero.jpg";
import statusUpdate from "@/assets/images/statusUpdate.jpg";
import secureDelivery from "@/assets/images/secureDelivery.jpg";
import flexiblePayment from "@/assets/images/flexiblePayment.jpg";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface Feature166Props {
  heading: string;
  description?: string;
  feature1: Feature;
  feature2: Feature;
  feature3: Feature;
  feature4: Feature;
}

const Service = () => {
  const des: Feature166Props = {
    heading: "Track Your Parcel in Real Time",
    description: "Enter your tracking ID and get instant updates on your parcel’s journey—from pickup to delivery.",
    feature1: {
      title: "Nationwide Coverage",
      description: "From Dhaka to Dinajpur, we deliver everywhere.",
      image: deliveryHero,
    },
    feature2: {
      title: "Live Status Updates",
      description: "Know exactly where your parcel is.",
      image: statusUpdate,
    },
    feature3: {
      title: "Secure Handling",
      description: "Every item is treated with care.",
      image: secureDelivery,
    },
    feature4: {
      title: "Flexible Payment Options",
      description: "Pay online or on delivery.",
      image: flexiblePayment,
    },
  };

  return (
    <section className="2xl:py-20 xl:py-16 lg:py-12 md:py-10 py-8">
      <div className="container mx-auto 2xl:space-y-10 xl:space-y-8 lg:space-y-6 md:space-y-4 space-y-3">
        <div className="lg:space-y-6 md:space-y-4 space-y-3 text-center">
          <h1 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-lg font-bold">{des.heading}</h1>
          <p className="text-muted-foreground text-balance 2xl:text-xl xl:text-lg lg:text-sm text-sm">{des.description}</p>
        </div>
        <div className="relative flex justify-center">
          <div className="border-muted2 relative flex w-full flex-col border md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-3/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold">{des.feature1.title}</h2>
                <p className="text-muted-foreground">{des.feature1.description}</p>
                <img src={des.feature1.image} alt={des.feature1.title} className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]" />
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-2/5">
                <h2 className="text-xl font-semibold">{des.feature2.title}</h2>
                <p className="text-muted-foreground">{des.feature2.description}</p>
                <img src={des.feature2.image} alt={des.feature2.title} className="mt-8 aspect-[1.45] h-full w-full object-cover" />
              </div>
            </div>
            <div className="border-muted2 relative flex flex-col border-t border-solid lg:flex-row">
              <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold">{des.feature3.title}</h2>
                <p className="text-muted-foreground">{des.feature3.description}</p>
                <img src={des.feature3.image} alt={des.feature3.title} className="mt-8 aspect-[1.45] h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-3/5">
                <h2 className="text-xl font-semibold">{des.feature4.title}</h2>
                <p className="text-muted-foreground">{des.feature4.description}</p>
                <img src={des.feature4.image} alt={des.feature4.title} className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
