import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Institute of Architects of Zimbabwe",
    short_name: "IAZ",
    description:
      "The register of persons entitled to practise, the standard of qualification, and the voice for the built environment in Zimbabwe.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f2ee",
    theme_color: "#f3f2ee",
    lang: "en-ZW",
    categories: ["education", "government", "reference"],
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
