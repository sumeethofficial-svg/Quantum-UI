export interface ComponentProp {
  name: string;
  type: string;
  default: string;
}

export interface ComponentItem {
  /** Display name, e.g. "Photon Button". */
  name: string;
  glyph: string;
  number?: string;
  description: string;
  demo: string;
  /** Overrides the slug derived from `name`. */
  slug?: string;
  /** Overrides the default-export / file name derived from `name`. */
  exportName?: string;
  usage?: string;
  code?: string;
  props?: ComponentProp[];
}

export interface ComponentGroup {
  label: string;
  items: ComponentItem[];
}

export const componentGroups: ComponentGroup[] = [
  {
    label: "BUTTONS",
    items: [
      {
        name: "Photon Button",
        glyph: "◈",
        number: "01",
        description:
          "A charged action trigger with an energized hover sweep.",
        demo: "Initialize sequence →",
      },
      {
        name: "Magnetic Link",
        glyph: "⌁",
        number: "02",
        description:
          "A text link that bends toward the cursor's gravity.",
        demo: "Follow trajectory ↗",
      },
      {
        name: "Signal Toggle",
        glyph: "◌",
        number: "03",
        description:
          "A binary control that makes state instantly legible.",
        demo: "Signal enabled",
      },
      {
        name: "Orbit Menu",
        glyph: "◍",
        number: "04",
        description:
          "A compact radial navigator for dense interfaces.",
        demo: "Open command orbit",
      },
      {
        name: "Liquid Button",
        glyph: "◈",
        number: "05",
        description:
          "A fluid action button with an animated liquid interaction.",
        demo: "Activate liquid sequence →",
      },
          {
        name: "Iso Button",
        glyph: "◇",
        number: "06",
        description:
          "An isometric layered tile whose plates spread apart and glow on hover.",
        demo: "Stack layers",
        props: [
          { name: "children", type: "ReactNode", default: '"Stack layers"' },
          { name: "icon", type: "ReactNode", default: "spark mark" },
          { name: "size", type: "number", default: "112" },
          { name: "layers", type: "number", default: "6" },
          { name: "onClick", type: "() => void", default: "undefined" },
        ],
      },
    ],
  },

  {
    label: "TEXT & MOTION",
    items: [
      {
        name: "Flip Text",
        glyph: "↻",
        description:
          "A word cycler that flips through phrases with a smooth 3D rotation.",
        demo: "beautiful → precise → quantum",
      },
      {
        name: "Flip Fade Text",
        glyph: "≈",
        description:
          "A cycling word display that fades and drifts between states.",
        demo: "BUILDING → PROTOTYPING → SHIPPING",
      },
      {
        name: "Liquid Text",
        glyph: "∿",
        description:
          "Text that distorts with a liquid-like skew on hover.",
        demo: "Hover Me",
      },
      {
        name: "Kinetic Typography",
        glyph: "↗",
        description:
          "Bold stacked typography with staggered letter entrances, motion, and dimensional depth.",
        demo: "WORDS IN MOTION",
        slug: "kinetic-typography",
        exportName: "KineticText",
        usage: `import KineticText from "./components/quantum-ui/KineticText";

export default function Example() {
  return <KineticText />;
}`,
        code: `import KineticText from "./components/quantum-ui/KineticText";

export default function Example() {
  return <KineticText />;
}`,
        props: [
          { name: "lines", type: "string[]", default: '["WORDS", "IN", "MOTION"]' },
        ],
      },
      {
        name: "3D Text Reveal",
        glyph: "▰",
        description:
          "Large extruded typography revealed with a perspective tilt and dimensional text shadows.",
        demo: "QUANTUM",
        slug: "3d-text-reveal",
        exportName: "Text3DReveal",
        usage: `import Text3DReveal from "./components/quantum-ui/Text3DReveal";

export default function Example() {
  return <Text3DReveal />;
}`,
        code: `import Text3DReveal from "./components/quantum-ui/Text3DReveal";

export default function Example() {
  return <Text3DReveal />;
}`,
        props: [
          { name: "text", type: "string", default: '"QUANTUM"' },
          { name: "subtitle", type: "string", default: '"Built beyond the surface"' },
        ],
      },
    ],
  },
  {
    label: "INTERACTIVE",
    items: [
      {
        name: "Cursor",
        glyph: "➹",
        description:
          "A custom trailing cursor confined to its own preview surface.",
        demo: "Move your mouse over the div",
      },
      {
        name: "Tooltip",
        glyph: "▤",
        description:
          "An animated tooltip with an arrow, triggered on hover.",
        demo: "Docs",
      },
      {
        name: "Ring Gallery",
        glyph: "⊚",
        description:
          "A circular gallery where cards orbit a ring and grow as they pass the front slot.",
        demo: "Push",
        usage: `import RingGallery from "./components/quantum-ui/RingGallery";

export default function Example() {
  return <RingGallery />;
}`,
        code: `import RingGallery from "./components/quantum-ui/RingGallery";

export default function Example() {
  return (
    <RingGallery
      items={[
        { id: "one", src: "/images/one.jpg", alt: "One" },
        { id: "two", src: "/images/two.jpg", alt: "Two" },
        { id: "three", src: "/images/three.jpg", alt: "Three" },
      ]}
      label="Push"
      speed={24}
    />
  );
}`,
        props: [
          { name: "items", type: "RingGalleryItem[]", default: "built-in demo cards" },
          { name: "label", type: "ReactNode", default: '"Push"' },
          { name: "speed", type: "number", default: "24" },
          { name: "radius", type: "number", default: "0.34" },
          { name: "cardSize", type: "number", default: "0.2" },
          { name: "pauseOnHover", type: "boolean", default: "true" },
          { name: "onActiveChange", type: "(item, index) => void", default: "undefined" },
          { name: "className", type: "string", default: '""' },
        ],
      },
              {
           name: "Book Shelf",
           glyph: "▥",
           description:
             "A row of book spines where the active book swings open in 3D to reveal its cover.",
           demo: "Open a book",
           props: [
             { name: "items", type: "BookShelfItem[]", default: "6 sample books" },
             { name: "heading", type: "string", default: '"Favorite books"' },
             { name: "interval", type: "number", default: "3000" },
             { name: "autoPlay", type: "boolean", default: "true" },
             { name: "trigger", type: '"click" | "hover"', default: '"click"' },
             { name: "className", type: "string", default: '""' },
           ],
         },
        
    ] ,
  },

   {
    label: "LAYOUT & CARDS",
    items: [
      {
        name: "Team Reveal Grid",
        glyph: "▦",
        description:
          "A responsive team grid with a smooth hover reveal on each member.",
        demo: "Meet the team",
      },
      {
        name: "Testimonials Card",
        glyph: "❝",
        description:
          "A stacked testimonial card with previous/next navigation and a counter.",
        demo: "Ocean Horizon",
      },
      {
        name: "Avatar Group",
        glyph: "◎",
        description:
          "Overlapping avatars that lift and scale forward on hover.",
        demo: "Reveal contributor",
      },
      {
        name: "Masked Avatars",
        glyph: "◒",
        description:
          "Overlapping circular avatars with an active name label.",
        demo: "AIZEN",
      },
      {
        name: "Orbit Gallery",
        glyph: "◐",
        description:
          "A portrait card with orbiting avatars, a progress ring and a crossfading backdrop.",
        demo: "Cycle the gallery",
        props: [
          { name: "items", type: "OrbitGalleryItem[]", default: "7 sample entries" },
          { name: "interval", type: "number", default: "3200" },
          { name: "autoPlay", type: "boolean", default: "true" },
          { name: "className", type: "string", default: '""' },
        ],
      },
    ],
  },
  {
    label: "NAVIGATION",
    items: [
      {
        name: "Spotlight Navbar",
        glyph: "⬤",
        description:
          "A pill navbar with an animated spotlight that tracks the active item.",
        demo: "Home",
      },
    ],
  },

  {
    label: "BACKGROUNDS",
    items: [
      {
        name: "Wave Grid",
        glyph: "▨",
        description:
          "An interactive grid background that ripples toward the cursor.",
        demo: "Move across the grid",
      },
      {
        name: "Aurora Hero",
        glyph: "▒",
        description:
          "A vertical aurora light field with smooth, shifting color bands.",
        demo: "Shift the aurora",
      },
      {
        name: "Stars Background",
        glyph: "✦",
        description:
          "A field of softly twinkling stars at a configurable density.",
        demo: "90 stars",
      },
    ],
  },
];

export const allComponents: ComponentItem[] = componentGroups.flatMap(
  (group) => group.items
);

export const getComponent = (name: string): ComponentItem | undefined =>
  allComponents.find((component) => component.name === name);

/* Helpers shared by the docs UI and the registry build (scripts/build-registry.ts). */
export const getSlug = (component: ComponentItem): string =>
  component.slug || component.name.trim().toLowerCase().replace(/\s+/g, "-");

/** Default-export / file name. Defaults to the display name without spaces. */
export const getExportName = (component: ComponentItem): string =>
  component.exportName || component.name.replace(/\s+/g, "");