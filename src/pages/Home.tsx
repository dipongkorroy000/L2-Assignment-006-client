import HeroSection from "@/pages/home/HeroSection";
import Stats from "./home/Stats";
import Service from "./home/Service";
import Slider from "./home/Slider";

const Home = () => {
  return (
    <section className="max-md:mx-5">
      <HeroSection></HeroSection>
      <Slider></Slider>
      <Service></Service>
      <Stats></Stats>
    </section>
  );
};

export default Home;
