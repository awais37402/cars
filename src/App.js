// App.js - Updated with Footer
import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedCars from "./components/FeaturedCars";
import WhyChooseUs from "./components/WhyChooseUs";
import OurProcess from "./components/OurProcess";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <OurProcess />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;