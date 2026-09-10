import { ImageResponse } from "next/og";

export const alt =
  "Institute of Architects of Zimbabwe — the register, the standard, the voice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f3f2ee",
          color: "#282826",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* rule + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 3, background: "#fa3600" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#5c5c57",
            }}
          >
            Est. 1924 · Sheet A-001
          </div>
        </div>

        {/* wordmark */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            Institute of Architects
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            of Zimbabwe
          </div>
        </div>

        {/* footer line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#5c5c57",
          }}
        >
          <span>The register · the standard · the voice</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="46" height="46" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 4 5 9.5v13L16 28l11-5.5v-13L16 4Z"
                stroke="#282826"
                strokeWidth={1.6}
                strokeLinejoin="round"
              />
              <path
                d="M5 9.5 16 15l11-5.5M16 15v13"
                stroke="#282826"
                strokeWidth={1.6}
                strokeLinejoin="round"
              />
              <rect x="14" y="13" width="4" height="4" fill="#fa3600" />
            </svg>
            <span style={{ color: "#282826", letterSpacing: 2 }}>IAZ</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
