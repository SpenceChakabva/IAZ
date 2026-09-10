"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  // Heron's signature ease — expo-out
  gsap.defaults({ ease: "power4.out" });
}

export const EASE = "expo.out";
export const EASE_CB = "cubic-bezier(0.16,1,0.3,1)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
