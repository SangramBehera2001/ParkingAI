import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import ProductDemo from "../components/ProductDemo";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <Features />
        <HowItWorks />
      </section>

      <section id="product">
        <ProductDemo />
      </section>

      <section id="contact">
        <CTA />
        <Footer />
      </section>
    </>
  );
};

export default Home;
