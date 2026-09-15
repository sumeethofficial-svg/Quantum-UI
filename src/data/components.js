export const componentGroups = [
  {
    label: "INTERACTIONS",
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
    ],
  },

  {
    label: "DATA & SYSTEMS",
    items: [
      {
        name: "Telemetry Card",
        glyph: "▣",
        description:
          "A precision status surface for live system data.",
        demo: "Sync live telemetry",
      },
      {
        name: "Waveform Chart",
        glyph: "⌁",
        description:
          "An animated data trace built for streaming signals.",
        demo: "Inspect waveform",
      },
      {
        name: "Command Palette",
        glyph: "›_",
        description:
          "A fast-launch interface for expert workflows.",
        demo: "Search commands",
      },
      {
        name: "System Status",
        glyph: "◉",
        description:
          "A compact health beacon with meaningful states.",
        demo: "Systems nominal",
      },
    ],
  },

  {
    label: "SURFACES",
    items: [
      {
        name: "Hologram Panel",
        glyph: "◇",
        description:
          "A layered glass surface with projected depth.",
        demo: "Project interface",
      },
      {
        name: "Aurora Input",
        glyph: "—",
        description:
          "An input field with an active spectral edge.",
        demo: "Acquire input",
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
    ],
  },

  {
    label: "INTERACTIVE",
    items: [
      {
        name: "Avatar Group",
        glyph: "◎",
        description:
          "Overlapping avatars that lift and scale forward on hover.",
        demo: "Reveal contributor",
      },
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
        name: "Masked Avatars",
        glyph: "◒",
        description:
          "Overlapping circular avatars with an active name label.",
        demo: "AIZEN",
      },
    ],
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

export const allComponents = componentGroups.flatMap(
  (group) => group.items
);

export const getComponent = (name) =>
  allComponents.find((component) => component.name === name);

