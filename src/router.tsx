import { createBrowserRouter, createHashRouter, Navigate, type RouteObject } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import {
  ActivityLayout,
  AchievementsPage,
  ExperimentsPage,
  FuturePage,
  ProjectsPage,
  ResearchPage,
} from './components/sections/Activity'
import {
  AboutLayout,
  AboutPage,
  ApproachPage,
  HomePage,
  LogoPage,
  MeaningPage,
  MembersPage,
  NotFoundPage,
  ProductsPage,
  VisionPage,
} from './pages'

/**
 * Route map
 *
 *  /                          Home
 *  /about                     About Reika
 *  /about/meaning             Meaning of Reika
 *  /about/logo                Logo philosophy
 *  /about/vision              Vision & mission
 *  /about/approach            Our approach
 *  /members                   Members
 *  /products                  Products & research
 *  /activities                → /activities/research
 *  /activities/research       Current research
 *  /activities/projects       Project development
 *  /activities/experiments    Experiments & exploration
 *  /activities/achievements   Achievements
 *  /activities/future         Future direction
 *  *                          404
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'about',
        element: <AboutLayout />,
        children: [
          { index: true, element: <AboutPage /> },
          { path: 'meaning', element: <MeaningPage /> },
          { path: 'logo', element: <LogoPage /> },
          { path: 'vision', element: <VisionPage /> },
          { path: 'approach', element: <ApproachPage /> },
        ],
      },
      { path: 'members', element: <MembersPage /> },
      { path: 'products', element: <ProductsPage /> },
      {
        path: 'activities',
        element: <ActivityLayout />,
        children: [
          { index: true, element: <Navigate to="research" replace /> },
          { path: 'research', element: <ResearchPage /> },
          { path: 'projects', element: <ProjectsPage /> },
          { path: 'experiments', element: <ExperimentsPage /> },
          { path: 'achievements', element: <AchievementsPage /> },
          { path: 'future', element: <FuturePage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

/**
 * Production uses clean URLs (BrowserRouter). Hosting must rewrite every
 * path to index.html — see vercel.json / public/_redirects.
 * Set VITE_ROUTER=hash for hosts that cannot rewrite (e.g. a static preview).
 */
export const router =
  import.meta.env.VITE_ROUTER === 'hash' ? createHashRouter(routes) : createBrowserRouter(routes)
