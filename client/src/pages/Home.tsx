import HeroSection from "@/components/ui/Home/HeroSection";
import { useState } from "react";

function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  return (
    <>
      <HeroSection onAuthOpen={() => setIsAuthOpen(true)} />
    </>
  );
}

export default Home;
