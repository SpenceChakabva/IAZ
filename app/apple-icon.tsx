import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#282826",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4 5 9.5v13L16 28l11-5.5v-13L16 4Z"
            stroke="#f3f2ee"
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <path
            d="M5 9.5 16 15l11-5.5M16 15v13"
            stroke="#f3f2ee"
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <rect x="14" y="13" width="4" height="4" fill="#fa3600" />
        </svg>
      </div>
    ),
    size
  );
}
