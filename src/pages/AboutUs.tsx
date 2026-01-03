import {Button} from "@/components/ui/button";
import Counter from "@/utils/Counter";
import {useEffect, useRef, useState} from "react";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {src: string; alt: string};
  secondaryImage?: {src: string; alt: string};
  breakout?: {
    src: string;
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
  {label: "Companies Supported", value: "300+"},
  {label: "Projects Finalized", value: "800+"},
  {label: "Happy Customers", value: "99%"},
  {label: "Recognized Awards", value: "10+"},
];

const AboutUs = ({
  title = "About Us",
  description = "Shadcnblocks is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.",
  mainImage = {src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg", alt: "placeholder"},
  secondaryImage = {src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg", alt: "placeholder"},
  breakout = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "logo",
    title: "Hundreds of blocks at Shadcnblocks.com",
    description: "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
    buttonText: "Discover more",
    buttonUrl: "https://shadcnblocks.com",
  },
  achievementsTitle = "Our Achievements in Numbers",
  achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
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
      <div className="w-full mx-auto container space-y-8 py-16 max-md:px-6 max-md:py-5 rounded-2xl max-md:mb-5">
        <div className="mb-10 max-md:mb-5 grid gap-5 max-md:gap-2 md:grid-cols-2 md:text-left">
          <h1 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-lg font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          <img src={mainImage.src} alt={mainImage.alt} className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2" />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              <img src={breakout.src} alt={breakout.alt} className="mr-auto h-12" />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl} target="_blank">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <img src={secondaryImage.src} alt={secondaryImage.alt} className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto" />
          </div>
        </div>

        {/* Achievements with Counter */}
        <div ref={ref} className="relative overflow-hidden rounded-xl bg-muted 2xl:my-10 xl:my-8 my-5 xl:py-20 lg:py-16 md:py-10 py-8 max-md:py-10 px-10 max-md:px-5">
          <div className="flex flex-col gap-4 max-md:gap-2 md:text-left">
            <h2 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-lg font-bold">{achievementsTitle}</h2>
            <p className="max-w-xl text-muted-foreground max-md:text-sm">{achievementsDescription}</p>
          </div>

          <div className="mt-10 max-md:mt-5 flex max-md:flex-col justify-between text-center">
            {achievements.map((item, idx) => {
              // Extract numeric part + suffix
              const match = item.value.match(/^(\d+)([%+])?$/);
              const num = match ? parseInt(match[1], 10) : 0;
              const suffix = match && match[2] ? match[2] : "";

              return (
                <div className="flex flex-col gap-4 max-md:gap-2 max-md:items-start" key={item.label + idx}>
                  <p>{item.label}</p>
                  {visible && (
                    <span className="mb-2 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-semibold">
                      <Counter target={num} suffix={suffix} />
                    </span>
                  )}
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
