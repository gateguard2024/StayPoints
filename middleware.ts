// Middleware disabled — auth is handled at the layout level.
// Clerk's Edge Runtime modules are incompatible with Vercel's bundler.
// This empty matcher prevents Vercel from deploying a middleware Edge Function.
export const config = { matcher: [] };
