interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const HeroSection = ({
  heading = "Fast. Reliable. Delivered.",
  description = "Your parcels, documents, and essentials—picked up and delivered with care across Bangladesh.",
}: Hero7Props) => {
  return (
    <section className="py-20">
      <div className="container text-center mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">{heading}</h1>
          <p className="text-muted-foreground text-balance lg:text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
