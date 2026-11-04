export interface ComponentProp {
  name: string;
  type: string;
  default: string;
  /** One line on what the prop does. */
  description?: string;
}

/**
 * Usage snippets and prop tables for every public component, keyed by display name.
 *
 * `npm run verify:docs` checks this file against the real component source:
 *   - every documented prop exists in the component's signature (and vice versa),
 *   - documented defaults match the source,
 *   - every `usage` snippet type-checks in strict mode and renders,
 *   - changing a documented prop changes what the component renders.
 * Keep it in sync when a component's props change.
 */
export interface ComponentDoc {
  usage: string;
  props: ComponentProp[];
}

const importFrom = (name: string) => `./components/quantum-ui/${name}`;

export const componentDocs: Record<string, ComponentDoc> = {
  /* ---------------------------------------------------- BUTTONS */
  "Photon Button": {
    usage: `import PhotonButton from "${importFrom("PhotonButton")}";

export default function Example() {
  return (
    <PhotonButton onClick={() => console.log("launched")}>
      Initialize sequence →
    </PhotonButton>
  );
}`,
    props: [
      { name: "children", type: "ReactNode", default: '"Initialize sequence →"', description: "Button label." },
      { name: "onClick", type: "() => void", default: "undefined", description: "Called when the button is pressed." },
      { name: "className", type: "string", default: '""', description: "Extra classes for the button element." },
    ],
  },

  "Magnetic Link": {
    usage: `import MagneticLink from "${importFrom("MagneticLink")}";

export default function Example() {
  return <MagneticLink strength={0.25}>Follow trajectory ↗</MagneticLink>;
}`,
    props: [
      { name: "children", type: "ReactNode", default: '"Follow trajectory ↗"', description: "Link text." },
      { name: "strength", type: "number", default: "0.18", description: "How far the link bends toward the cursor. 0 disables the pull." },
    ],
  },

  "Signal Toggle": {
    usage: `import SignalToggle from "${importFrom("SignalToggle")}";

export default function Example() {
  return (
    <SignalToggle
      label="WIFI"
      defaultChecked
      onChange={(checked) => console.log("signal", checked)}
    />
  );
}`,
    props: [
      { name: "defaultChecked", type: "boolean", default: "true", description: "Initial on/off state. The component keeps its own state after that." },
      { name: "onChange", type: "(checked: boolean) => void", default: "undefined", description: "Called with the new state each time it is toggled." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction the switch slides." },
      { name: "disabled", type: "boolean", default: "false", description: "Blocks interaction and dims the control." },
      { name: "label", type: "string", default: '"SIGNAL"', description: "Accessible name; the on/off state is appended to it." },
    ],
  },

  "Orbit Menu": {
    usage: `import OrbitMenu from "${importFrom("OrbitMenu")}";

export default function Example() {
  return <OrbitMenu />;
}`,
    props: [],
  },

  "Liquid Button": {
    usage: `import LiquidButton from "${importFrom("LiquidButton")}";

export default function Example() {
  return (
    <LiquidButton onClick={() => console.log("activated")}>
      Activate liquid sequence →
    </LiquidButton>
  );
}`,
    props: [
      { name: "children", type: "ReactNode", default: '"Activate liquid sequence →"', description: "Button label." },
      { name: "onClick", type: "() => void", default: "undefined", description: "Called when the button is pressed." },
    ],
  },

  "Iso Button": {
    usage: `import IsoButton from "${importFrom("IsoButton")}";

export default function Example() {
  return (
    <IsoButton size={120} onClick={() => console.log("stacked")}>
      Stack layers
    </IsoButton>
  );
}`,
    props: [
      { name: "icon", type: "ReactNode", default: "built-in mark", description: "Icon or logo shown in the circular badge on the top face." },
      { name: "children", type: "ReactNode", default: "undefined", description: "Caption under the tile." },
      { name: "label", type: "string", default: "undefined", description: "Accessible name. Falls back to the caption when omitted." },
      { name: "size", type: "number", default: "150", description: "Side length of the square tile, in px." },
      { name: "onClick", type: "() => void", default: "undefined", description: "Called when the tile is pressed." },
      { name: "className", type: "string", default: '""', description: "Extra classes for the button element." },
    ],
  },

  /* ------------------------------------------------ TEXT & MOTION */
  "Flip Text": {
    usage: `import FlipText from "${importFrom("FlipText")}";

export default function Example() {
  return <FlipText words={["fast", "precise", "quantum"]} interval={2000} />;
}`,
    props: [
      { name: "words", type: "string[]", default: '["beautiful", "precise", "quantum"]', description: "Words to cycle through." },
      { name: "interval", type: "number", default: "1800", description: "Milliseconds between flips." },
    ],
  },

  "Flip Fade Text": {
    usage: `import FlipFadeText from "${importFrom("FlipFadeText")}";

export default function Example() {
  return <FlipFadeText words={["DESIGN", "BUILD", "SHIP"]} interval={2000} />;
}`,
    props: [
      { name: "words", type: "string[]", default: '["BUILDING", "PROTOTYPING", "SHIPPING"]', description: "Words to cycle through." },
      { name: "interval", type: "number", default: "2200", description: "Milliseconds between changes." },
    ],
  },

  "Liquid Text": {
    usage: `import LiquidText from "${importFrom("LiquidText")}";

export default function Example() {
  return <LiquidText>Hover Me</LiquidText>;
}`,
    props: [
      { name: "children", type: "ReactNode", default: '"Hover Me"', description: "Text that skews and stretches on hover." },
    ],
  },

  "Kinetic Typography": {
    usage: `import KineticText from "${importFrom("KineticText")}";

export default function Example() {
  return <KineticText lines={["BUILD", "SHIP", "REPEAT"]} />;
}`,
    props: [
      { name: "lines", type: "string[]", default: '["WORDS", "IN", "MOTION"]', description: "One entry per stacked line of type." },
    ],
  },

  "3D Text Reveal": {
    usage: `import Text3DReveal from "${importFrom("Text3DReveal")}";

export default function Example() {
  return <Text3DReveal text="LAUNCH" subtitle="Ready when you are" />;
}`,
    props: [
      { name: "text", type: "string", default: '"QUANTUM"', description: "Large extruded headline." },
      { name: "subtitle", type: "string", default: '"Built beyond the surface"', description: "Line of text under the headline." },
    ],
  },

  /* --------------------------------------------------- INTERACTIVE */
  Cursor: {
    usage: `import Cursor from "${importFrom("Cursor")}";

export default function Example() {
  return <Cursor label="Designer">Move your mouse over the div</Cursor>;
}`,
    props: [
      { name: "children", type: "ReactNode", default: '"Move your mouse over the div"', description: "Text shown inside the surface the cursor is confined to." },
      { name: "label", type: "string", default: '"Designer"', description: "Name tag that trails the cursor." },
    ],
  },

  Tooltip: {
    usage: `import Tooltip from "${importFrom("Tooltip")}";

export default function Example() {
  return <Tooltip label="Documentation" items={["Docs", "Guides", "API"]} />;
}`,
    props: [
      { name: "label", type: "string", default: '"Documentation"', description: "Text of the element that triggers the tooltip on hover." },
      { name: "items", type: "string[]", default: '["Docs", "Lorem", "Guide"]', description: "Entries listed inside the tooltip." },
    ],
  },

  "Ring Gallery": {
    usage: `import RingGallery from "${importFrom("RingGallery")}";

const card = (id: string, text: string, background: string) => ({
  id,
  background,
  content: <span className="text-3xl font-semibold text-white">{text}</span>,
});

export default function Example() {
  return (
    <RingGallery
      label="Push"
      speed={24}
      items={[
        card("one", "One", "#134e4a"),
        card("two", "Two", "#1e3a8a"),
        card("three", "Three", "#7c2d12"),
        card("four", "Four", "#581c87"),
        card("five", "Five", "#14532d"),
        card("six", "Six", "#831843"),
      ]}
    />
  );
}

// For photos, use { id, src: "/images/one.jpg", alt: "One" } instead of \`content\`.`,
    props: [
      { name: "items", type: "RingGalleryItem[]", default: "built-in demo cards", description: "Cards on the ring: { id, src?, alt?, content?, background?, aspect? }. Use `src` for an image or `content` for any element." },
      { name: "label", type: "ReactNode", default: '"Push"', description: "Centre button label. Pressing it pushes the ring forward one card." },
      { name: "speed", type: "number", default: "24", description: "Auto-rotation in degrees per second. 0 turns it off." },
      { name: "radius", type: "number", default: "0.34", description: "Ring radius as a fraction of the container's smaller side." },
      { name: "cardSize", type: "number", default: "0.2", description: "Size of the front card as a fraction of the smaller side." },
      { name: "pauseOnHover", type: "boolean", default: "true", description: "Stop rotating while the pointer is over the gallery." },
      { name: "onActiveChange", type: "(item: RingGalleryItem, index: number) => void", default: "undefined", description: "Fires when a different card reaches the front slot." },
      { name: "className", type: "string", default: '""', description: "Extra classes for the root element." },
    ],
  },

  "Book Shelf": {
    usage: `import BookShelf from "${importFrom("BookShelf")}";

export default function Example() {
  return (
    <BookShelf
      heading="Reading list"
      trigger="hover"
      items={[
        { title: "Grid Systems", author: "Josef Müller-Brockmann", color: "#b5493a", textColor: "#ffffff" },
        { title: "Shapes", fullTitle: "Shapes of Design", author: "Frank Chimero", color: "#1f4e5f", textColor: "#ffffff" },
        { title: "Thinking", fullTitle: "Thinking in Systems", author: "Donella Meadows", color: "#e0c25a", textColor: "#1a1a1a" },
      ]}
    />
  );
}`,
    props: [
      { name: "items", type: "BookShelfItem[]", default: "6 sample books", description: "Books: { title, fullTitle?, author?, cover?, color?, textColor? }. Without `cover`, a cover is generated from `color`." },
      { name: "heading", type: "string", default: '"Favorite books"', description: 'Small serif heading above the shelf. Pass "" to hide it.' },
      { name: "interval", type: "number", default: "3000", description: "Milliseconds each book stays open." },
      { name: "autoPlay", type: "boolean", default: "true", description: "Open the books one after another. Always off for reduced-motion users." },
      { name: "trigger", type: '"click" | "hover"', default: '"click"', description: "Open a book on click, or as soon as the pointer enters it." },
      { name: "className", type: "string", default: '""', description: "Extra classes for the root element." },
    ],
  },

  "Stack Orbit": {
    usage: `import StackOrbit from "${importFrom("StackOrbit")}";

const Mark = ({ letter }: { letter: string }) => (
  <span className="grid size-full place-items-center text-2xl font-bold text-white">{letter}</span>
);

export default function Example() {
  return (
    <StackOrbit
      interval={2000}
      items={[
        { name: "Alpha", logo: <Mark letter="A" />, accent: "#22d3ee" },
        { name: "Beta", logo: <Mark letter="B" />, accent: "#a78bfa" },
        { name: "Gamma", logo: <Mark letter="G" />, accent: "#f472b6" },
        { name: "Delta", logo: <Mark letter="D" />, accent: "#facc15" },
      ]}
    />
  );
}`,
    props: [
      { name: "items", type: "StackOrbitItem[]", default: "7 sample logos", description: "Entries: { name, logo, accent? }. `logo` is any element and fills the tile; `accent` is the glow colour." },
      { name: "interval", type: "number", default: "2600", description: "Milliseconds between automatic steps." },
      { name: "autoPlay", type: "boolean", default: "true", description: "Rotate on its own. Always off for reduced-motion users." },
      { name: "className", type: "string", default: '""', description: "Extra classes for the root element." },
    ],
  },

  /* ------------------------------------------------ LAYOUT & CARDS */
  "Team Reveal Grid": {
    usage: `import TeamRevealGrid from "${importFrom("TeamRevealGrid")}";

export default function Example() {
  return <TeamRevealGrid />;
}`,
    props: [],
  },

  "Testimonials Card": {
    usage: `import TestimonialsCard from "${importFrom("TestimonialsCard")}";

export default function Example() {
  return <TestimonialsCard />;
}`,
    props: [],
  },

  "Avatar Group": {
    usage: `import AvatarGroup from "${importFrom("AvatarGroup")}";

export default function Example() {
  return (
    <AvatarGroup
      size={56}
      overlap={18}
      avatars={[
        { name: "Ada", image: "https://i.pravatar.cc/96?img=12" },
        { name: "Linus", image: "https://i.pravatar.cc/96?img=32" },
        { name: "Grace", image: "https://i.pravatar.cc/96?img=47" },
      ]}
    />
  );
}`,
    props: [
      { name: "avatars", type: "{ name: string; image: string }[]", default: "5 sample avatars", description: "People to show. `name` is revealed on hover; `image` is the picture URL." },
      { name: "size", type: "number", default: "48", description: "Avatar diameter in px." },
      { name: "overlap", type: "number", default: "14", description: "How far each avatar overlaps the previous one, in px." },
    ],
  },

  "Masked Avatars": {
    usage: `import MaskedAvatars from "${importFrom("MaskedAvatars")}";

export default function Example() {
  return <MaskedAvatars />;
}`,
    props: [],
  },

  "Orbit Gallery": {
    usage: `import OrbitGallery from "${importFrom("OrbitGallery")}";

export default function Example() {
  return (
    <OrbitGallery
      interval={3000}
      items={[
        { name: "Ada Lovelace", years: "1815 — 1852", background: "linear-gradient(135deg, #3b2a4f, #0b0710)" },
        { name: "Alan Turing", years: "1912 — 1954", background: "linear-gradient(135deg, #1f3a4d, #070d12)" },
        { name: "Grace Hopper", years: "1906 — 1992", background: "linear-gradient(135deg, #4d2f1f, #120a07)" },
      ]}
    />
  );
}`,
    props: [
      { name: "items", type: "OrbitGalleryItem[]", default: "7 sample entries", description: "Entries: { name, years?, image?, avatar?, background? }. `background` is a CSS background used when `image` is not set." },
      { name: "interval", type: "number", default: "3200", description: "Milliseconds each item stays active." },
      { name: "autoPlay", type: "boolean", default: "true", description: "Advance automatically. Always off for reduced-motion users." },
      { name: "className", type: "string", default: '""', description: "Extra classes for the root element." },
    ],
  },

  /* ---------------------------------------------------- NAVIGATION */
  "Spotlight Navbar": {
    usage: `import { House, Search, Target } from "lucide-react";
import SpotlightNavbar from "${importFrom("SpotlightNavbar")}";

export default function Example() {
  return (
    <SpotlightNavbar
      defaultActive={1}
      items={[
        { label: "Home", icon: House },
        { label: "Search", icon: Search },
        { label: "Goals", icon: Target },
      ]}
      onChange={(item, index) => console.log(item.label, index)}
    />
  );
}

// Plain strings work too: items={["Home", "Search", "Goals"]}`,
    props: [
      { name: "items", type: "(string | { label: string; icon?: ComponentType })[]", default: "Home, Updates, Schedule, Goals", description: "Navigation entries. A string gets a default icon; pass an object to choose one (any lucide-react icon works)." },
      { name: "defaultActive", type: "number", default: "0", description: "Index of the item that starts active." },
      { name: "onChange", type: "(item, index: number) => void", default: "undefined", description: "Called with the selected item and its index." },
    ],
  },

  /* -------------------------------------------------- BACKGROUNDS */
  "Wave Grid": {
    usage: `import WaveGrid from "${importFrom("WaveGrid")}";

export default function Example() {
  return <WaveGrid columns={24} rows={12} />;
}`,
    props: [
      { name: "columns", type: "number", default: "18", description: "Number of cells per row." },
      { name: "rows", type: "number", default: "10", description: "Number of rows." },
    ],
  },

  "Aurora Hero": {
    usage: `import AuroraHero from "${importFrom("AuroraHero")}";

export default function Example() {
  return <AuroraHero />;
}`,
    props: [],
  },

  "Stars Background": {
    usage: `import StarsBackground from "${importFrom("StarsBackground")}";

export default function Example() {
  return <StarsBackground count={140} />;
}`,
    props: [
      { name: "count", type: "number", default: "90", description: "Number of stars." },
    ],
  },
};
