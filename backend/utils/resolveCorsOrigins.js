const LOCAL_DEFAULTS = ["http://localhost:5173", "http://localhost:3000"];

/**
 * CORS_ORIGIN: comma-separated list, highest priority.
 * On Render, RENDER_EXTERNAL_URL is used when CORS_ORIGIN is unset.
 */
export default function resolveCorsOrigins() {
  const fromEnv = process.env.CORS_ORIGIN?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (fromEnv?.length) return fromEnv;

  const renderUrl = process.env.RENDER_EXTERNAL_URL;
  if (renderUrl) return [renderUrl.replace(/\/$/, "")];

  return LOCAL_DEFAULTS;
}
