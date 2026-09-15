import Navbar from "../components/navigation/Navbar";
import HeroSection from "../components/hero/HeroSection";
import Stats from "../components/sections/Stats";

function Home({ onOpenLibrary }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#08090c] text-[#eef4f8]">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_52%_at_50%_7%,rgba(77,216,255,0.11),transparent_63%)]" />

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          -z-10
          bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
          bg-[size:48px_48px]
          [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_10%,transparent_75%)]
        "
      />

      <Navbar onOpenLibrary={onOpenLibrary} />

      <HeroSection onOpenLibrary={onOpenLibrary} />

      <Stats />

      <footer className="px-7 py-7 text-center font-mono text-xs text-slate-600">
        /* design direction preview — not final markup */
      </footer>
    </div>
  );
}

export default Home;