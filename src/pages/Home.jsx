import Navbar from "../components/navigation/Navbar";
import HeroSection from "../components/hero/HeroSection";

function Home({ onOpenLibrary }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Deep black background */}
      <div className="pointer-events-none absolute inset-0 bg-black" />

      {/* Very subtle ambient light */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[80vh]
          w-[80vw]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.025]
          blur-[140px]
        "
      />

      {/* Subtle background grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
          [background-size:64px_64px]
          [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000,transparent_90%)]
        "
      />

      {/* Navigation */}
      <div className="relative z-30">
        <Navbar onOpenLibrary={onOpenLibrary} />
      </div>

      {/* Full-screen glass hero */}
      <main className="relative z-10 min-h-[calc(100vh-77px)]">
        <HeroSection onOpenLibrary={onOpenLibrary} />
      </main>
    </div>
  );
}

export default Home;