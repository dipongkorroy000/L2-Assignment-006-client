import Logo from "@/assets/icons/Logo";
import {Button} from "@/components/ui/button";
import Counter from "@/utils/Counter";
import {useEffect, useRef, useState} from "react";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {src: string; alt: string};
  secondaryImage?: {src: string; alt: string};
  breakout?: {
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{src: string; alt: string}>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{label: string; value: string}>;
}

const defaultAchievements = [
  {label: "Parcels Delivered", value: "50,000+"},
  {label: "Cities Covered", value: "120+"},
  {label: "Customer Satisfaction", value: "98%"},
  {label: "Trusted Partners", value: "200+"},
];

const AboutUs = ({
  title = "About Our Delivery Service",
  description = "We are committed to making parcel delivery fast, secure, and reliable across Bangladesh. With real-time tracking, nationwide coverage, and flexible payment options, we ensure every package reaches safely and on time.",
  mainImage = {
    src: "https://iili.io/fwBLTKu.jpg",
    alt: "Delivery team",
  },
  secondaryImage = {
    src: "https://iili.io/fwBNTF9.jpg",
    alt: "Courier service",
  },
  breakout = {
    alt: "logo",
    title: "Reliable Delivery Solutions",
    description: "From doorstep pickup to secure handling, we provide services that businesses and individuals can trust.",
    buttonText: "Learn More",
    buttonUrl: "/services",
  },
  achievementsTitle = "Our Achievements in Numbers",
  achievementsDescription = "We take pride in delivering excellence. Here’s what we’ve accomplished so far:",
  achievements = defaultAchievements,
}: About3Props = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold: 0.3});
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section>
      <div className="w-full mx-auto container space-y-12 py-16 max-md:px-6 max-md:py-8 rounded-2xl">
        {/* Title + description */}
        <div className="grid gap-6 md:grid-cols-2 md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-base md:text-lg">{description}</p>
        </div>

        {/* Images + breakout */}
        <div className="grid gap-7 lg:grid-cols-3">
          <img src={mainImage.src} alt={mainImage.alt} className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2" />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              <Logo></Logo>
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl}>{breakout.buttonText}</a>
              </Button>
            </div>
            <img src={secondaryImage.src} alt={secondaryImage.alt} className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto" />
          </div>
        </div>

        {/* Achievements with Counter */}
        <div ref={ref} className="relative overflow-hidden rounded-xl bg-muted my-10 py-12 px-10 md:py-16">
          <div className="flex flex-col gap-4 md:text-left text-center">
            <h2 className="text-xl md:text-4xl font-bold">{achievementsTitle}</h2>
            <p className="max-w-xl max-md:text-sm mx-auto md:mx-0 text-muted-foreground">{achievementsDescription}</p>
          </div>

          <div className="mt-10 flex flex-wrap justify-around gap-10 text-center">
            {achievements.map((item, idx) => {
              const match = item.value.match(/^(\d+)([%+])?$/);
              const num = match ? parseInt(match[1], 10) : 0;
              const suffix = match && match[2] ? match[2] : "";

              return (
                <div className="flex flex-col gap-2 items-center md:items-start" key={item.label + idx}>
                  {visible && (
                    <span className="text-3xl md:text-4xl font-semibold text-primary">
                      <Counter target={num} suffix={suffix} />
                    </span>
                  )}
                  <p className="text-muted-foreground text-sm md:text-base">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
