import Header from "../component/Header";
import NavBar from "../component/NavBar";
import HeroSection from "../component/HeroSection";
import WelcomeSection from "../component/WelcomeSection";
import AppPromotionSection from "../component/AppPromotionSection";
import Footer from "../component/Footer";
import React from "react";

const Home = () => {
  return (
    <div className="color-body">
      <Header />
      <NavBar />
      <HeroSection />
      <WelcomeSection />
      {/* <AppPromotionSection /> */}
      <Footer />
    </div>
  );
};

export default Home;
