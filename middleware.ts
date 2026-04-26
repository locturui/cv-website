import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Run on everything except API routes, _next assets, /admin, and static files.
  matcher: ['/((?!api|admin|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|sitemap.xml|robots.txt|.*\\..*).*)'],
}
