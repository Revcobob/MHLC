import { authMiddleware } from '@clerk/nextjs/server';

// Public paths are served as-is. The static HTML files in /public are
// handled by Next.js directly; the CMS content injection happens server-side
// inside app/(public)/[...slug] route, NOT in middleware, because Vercel's
// edge middleware can't easily stream-rewrite a static asset response while
// preserving the file response's headers/caching contract. Keeping this
// thin lets Clerk gate /admin and /api/admin without touching public assets.

export default authMiddleware({
  publicRoutes: [
    '/',
    '/admin',
    '/admin/sign-in(.*)',
    '/admin/sign-up(.*)',
    '/api/public/(.*)',
    '/api/page-content/(.*)',
    '/mhlc-(.*)\\.html',
    '/assets/(.*)',
    '/cms-bootstrap.js',
    '/favicon.ico'
  ],
  ignoredRoutes: [
    '/assets/(.*)',
    '/_next/(.*)',
    '/favicon.ico'
  ]
});

export const config = {
  // Apply to everything except static assets that Next.js handles internally.
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)', '/', '/(api|trpc)(.*)']
};
