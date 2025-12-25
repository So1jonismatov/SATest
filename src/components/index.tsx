import { lazy } from "react";

// Shared Components
export const LazyFooter = lazy(() =>
  import("./shared/footer/Footer").then((module) => ({
    default: module.Footer,
  })),
);
export const LazyHeader = lazy(() =>
  import("./shared/header/Header").then((module) => ({
    default: module.Header,
  })),
);

// UI Components (Heavier or more specific ones)
export const LazyAuroraBackground = lazy(() =>
  import("./ui/aurora-background").then((module) => ({
    default: module.AuroraBackground,
  })),
);
export const LazyCanvasRevealEffect = lazy(() =>
  import("./ui/canvas-reveal-effect").then((module) => ({
    default: module.CanvasRevealEffect,
  })),
);
export const LazyCardSpotlight = lazy(() =>
  import("./ui/card-spotlight").then((module) => ({
    default: module.CardSpotlight,
  })),
);
export const LazyModeToggle = lazy(() =>
  import("./ui/mode-toggle").then((module) => ({
    default: module.ModeToggle,
  })),
);

/*
 * Directly Exported Components & Utilities
 *
 * These are smaller, foundational components or utilities (like variants)
 * that are used frequently across the app. Lazy loading them individually
 * would add unnecessary overhead. You can continue to import them directly.
 *
 * Example:
 * import { Button, buttonVariants } from '@/components';
 */

export * from "./ui/button";
export * from "./ui/dropdown-menu";
