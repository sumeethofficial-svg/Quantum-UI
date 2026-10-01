import registryConfig from "../../../registry.config.json";
import { getSlug } from "../../data/components";

export const packageManagers = ["npm", "pnpm", "yarn", "bun"];

// Runner prefixes follow the shadcn CLI docs.
const shadcnRunner = {
  npm: "npx shadcn@latest",
  pnpm: "pnpm dlx shadcn@latest",
  yarn: "npx shadcn@latest",
  bun: "bunx --bun shadcn@latest",
};

const packageRunner = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "npx",
  bun: "bunx",
};

export const getRegistryUrl = (component) =>
  `${registryConfig.baseUrl}/${getSlug(component)}.json`;

/** Works in any project, no setup: shadcn add <registry item URL>. */
export const getAddCommand = (component, pm = "npm") =>
  `${shadcnRunner[pm]} add ${getRegistryUrl(component)}`;

/** Short form, needs `quantum-ui-cli init` once per project. */
export const getNamespacedCommand = (component, pm = "npm") =>
  `${shadcnRunner[pm]} add ${registryConfig.namespace}/${getSlug(component)}`;

export const getInitCommand = (pm = "npm") =>
  `${packageRunner[pm]} ${registryConfig.cliPackage} init`;
