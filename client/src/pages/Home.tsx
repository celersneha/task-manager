import HeroSection from "@/components/ui/Home/HeroSection";
import { useState } from "react";

function Home() {
  const [_isAuthOpen, setIsAuthOpen] = useState(false);
  return (
    <>
      <HeroSection onAuthOpen={() => setIsAuthOpen(true)} />
    </>
  );
}

export default Home;
