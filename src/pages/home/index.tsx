import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Playground from "./sections/Playground";
import Install from "./sections/Install";
import Theme from "./sections/Theme";
import FinalCta from "./sections/FinalCta";

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <Playground />
      <Install />
      <Theme />
      <FinalCta />
    </main>
  );
};

export default Home;
