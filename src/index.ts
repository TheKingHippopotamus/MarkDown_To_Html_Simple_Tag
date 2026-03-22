export { clearFetchCache, fetchTextCached } from "./cache.js";
export { defineMdSpawn, MdSpawn } from "./md-spawn.js";
export type { RenderMarkdownOptions } from "./render.js";
export { renderMarkdown } from "./render.js";
export { resolveRelativeAssets } from "./resolve-assets.js";
export { getFetchBaseUrl, resolveMarkdownFetchUrl } from "./resolve-src.js";
export { MD_SPAWN_THEME_CSS } from "./theme.js";

import { defineMdSpawn } from "./md-spawn.js";

defineMdSpawn();
