"use client";

/**
 * Loads the photo tuner only under `npm run tune`. Both conditions are
 * inlined at build time, so in a production build this is `() => null`
 * and the tuner's code is never bundled or shipped.
 */
import dynamic from "next/dynamic";

export const PhotoTunerMount =
  process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_PHOTO_TUNER === "1"
    ? dynamic(() => import("./PhotoTuner"), { ssr: false })
    : () => null;
