"use client";

import Counter from "@/utils/Counter";
import {useEffect, useRef, useState} from "react";

const Stats: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold: 0.3});

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="2xl:py-28 xl:py-20 lg:py-16 md:py-10 py-8 bg-accent max-md:py-10 2xl:space-y-10 xl:space-y-8 lg:space-y-6 md:space-y-4 space-y-3"
    >
      <h2 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-lg font-bold text-center">Platform Performance Insights</h2>

      <div className="flex justify-center max-md:mx-5">
        <div className="grid grid-cols-4 2xl:gap-26 xl:gap-20 lg:gap-16 md:gap-10">
          <div className="flex flex-col justify-center items-center">
            <div className="mb-2 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-semibold">
              {visible && <Counter target={90} suffix="%" />}
            </div>
            <h3 className="leading-6 text-muted-foreground lg:text-lg text-sm">Reviews</h3>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="mb-2 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-semibold">
              {visible && <Counter target={200} suffix="+" />}
            </div>
            <h3 className="leading-6 text-muted-foreground lg:text-lg text-sm">Companies</h3>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="mb-2 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-semibold">
              {visible && <Counter target={99} suffix="%" />}
            </div>
            <h3 className="leading-6 text-muted-foreground lg:text-lg text-sm">Comfortable</h3>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="mb-2 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-semibold">
              {visible && <Counter target={150} suffix="+" />}
            </div>
            <h3 className="leading-6 text-muted-foreground lg:text-lg text-sm">Delivery</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
