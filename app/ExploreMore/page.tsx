"use client";

import Container from "../components/Container";
import FAQS from "../components/HomePage/FAQS";
import Benefits from "./Benefits";
import ExploreHeroSection from "./HeroSection";
import TextBanner from "./TextBanner";

const ExploreMore = () => {
  return (
    <div>
      <ExploreHeroSection />
      <Container>
        <div>
          <TextBanner />
        </div>
      </Container>
      <Benefits />
      <Container>
        <FAQS />
      </Container>
    </div>
  );
};

export default ExploreMore;
