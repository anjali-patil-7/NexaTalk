const LOCAL_DEFAULTS = ["http://localhost:5173", "http://localhost:3000"];

/**
 * Resolves allowed CORS origins.
 *
 * ── Production (Render) ───────────────────────────────────────────────────
 * Set the CORS_ORIGIN env var on Render to your Vercel frontend URL:
 *   CORS_ORIGIN=https://your-app.vercel.app
 *
 * Multiple origins are comma-separated:
 *   CORS_ORIGIN=https://your-app.vercel.app,https://custom-domain.com
 *
 * ── Local dev ─────────────────────────────────────────────────────────────
 * Falls back to localhost:5173 / localhost:3000 automatically.
 * ──────────────────────────────────────────────────────────────────────────
 */
export default function resolveCorsOrigins() {
  const fromEnv = process.env.CORS_ORIGIN
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (fromEnv?.length) return fromEnv;

  // On Render (NODE_ENV=production) warn loudly — missing CORS_ORIGIN means
  // every cross-origin request will be blocked with a 401 / CORS error.
  if (process.env.NODE_ENV === "production") {
    console.error(
      "❌ CORS_ORIGIN env var is NOT set in production! " +
      "All cross-origin requests from your Vercel frontend will be blocked. " +
      "Set CORS_ORIGIN=https://<your-vercel-app>.vercel.app on Render."
    );
  }

  return LOCAL_DEFAULTS;
}
