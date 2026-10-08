import { galleryItems } from "../../data/galleryItems";
import PhotonButton from "../ui/buttons/PhotonButton";
import MagneticLink from "../ui/buttons/MagneticLink";
import SignalToggle from "../ui/buttons/SignalToggle";
import OrbitMenu from "../ui/navigation/OrbitMenu";
import LiquidButton from "../ui/buttons/LiquidButton";
import IsoButton from "../ui/buttons/IsoButton";

import TelemetryCard from "../ui/cards/TelemetryCard";
import WaveformChart from "../ui/data/WaveformChart";
import CommandPalette from "../ui/navigation/CommandPalette";
import SystemStatus from "../ui/feedback/SystemStatus";

import HologramPanel from "../ui/layout/HologramPanel";
import AuroraInput from "../ui/inputs/AuroraInput";
import OrbitGallery from "../ui/layout/OrbitGallery";

import FlipText from "../ui/text/FlipText";
import FlipFadeText from "../ui/text/FlipFadeText";
import LiquidText from "../ui/text/LiquidText";
import KineticText from "../ui/text/KineticText";
import Text3DReveal from "../ui/text/Text3DReveal";

import AvatarGroup from "../ui/interactive/AvatarGroup";
import Cursor from "../ui/interactive/Cursor";
import Tooltip from "../ui/interactive/Tooltip";
import MaskedAvatars from "../ui/interactive/MaskedAvatars";
import RingGallery from "../ui/interactive/RingGallery";
import BookShelf from "../ui/interactive/BookShelf";
import TeamRevealGrid from "../ui/cards/TeamRevealGrid";
import TestimonialsCard from "../ui/cards/TestimonialsCard";

import SpotlightNavbar from "../ui/navigation/SpotlightNavbar";

import WaveGrid from "../ui/backgrounds/WaveGrid";
import AuroraHero from "../ui/backgrounds/AuroraHero";
import StarsBackground from "../ui/backgrounds/StarsBackground";

/** Docs preview: renders the gallery with your own images from src/data/galleryItems.ts */
function OrbitGalleryPreview() {
  return <OrbitGallery items={galleryItems} />;
}

export const componentRegistry = {
  "Photon Button": PhotonButton,
  "Magnetic Link": MagneticLink,
  "Signal Toggle": SignalToggle,
  "Orbit Menu": OrbitMenu,
  "Liquid Button": LiquidButton,
  "Iso Button": IsoButton,

  "Telemetry Card": TelemetryCard,
  "Waveform Chart": WaveformChart,
  "Command Palette": CommandPalette,
  "System Status": SystemStatus,

  "Hologram Panel": HologramPanel,
  "Aurora Input": AuroraInput,
  "Orbit Gallery": OrbitGalleryPreview,

  "Flip Text": FlipText,
  "Flip Fade Text": FlipFadeText,
  "Liquid Text": LiquidText,
  "Kinetic Typography": KineticText,
  "3D Text Reveal": Text3DReveal,

  "Avatar Group": AvatarGroup,
  "Cursor": Cursor,
  "Tooltip": Tooltip,
  "Masked Avatars": MaskedAvatars,
  "Ring Gallery": RingGallery,
  "Book Shelf": BookShelf,

  "Team Reveal Grid": TeamRevealGrid,
  "Testimonials Card": TestimonialsCard,

  "Spotlight Navbar": SpotlightNavbar,

  "Wave Grid": WaveGrid,
  "Aurora Hero": AuroraHero,
  "Stars Background": StarsBackground,
};