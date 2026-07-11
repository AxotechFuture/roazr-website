import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(23,232,143,0.18), transparent 60%), #04090B",
          color: "#F2F7F5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#0A1214" />
            <rect
              x="0.5"
              y="0.5"
              width="31"
              height="31"
              rx="7.5"
              stroke="white"
              strokeOpacity="0.14"
            />
            <path
              d="M12 21.5c0-4.14 3.36-7.5 7.5-7.5"
              stroke="#17E88F"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              d="M12 16c0-2.9 2.35-5.25 5.25-5.25"
              stroke="#17E88F"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.75"
            />
            <circle cx="12" cy="21.5" r="3.1" fill="#17E88F" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
            roazr
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Every WhatsApp sale,</span>
            <span style={{ color: "#17E88F" }}>fed back to your ads.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#90A19B",
              letterSpacing: -0.5,
            }}
          >
            Revenue attribution for Meta, Google &amp; TikTok — built for
            WhatsApp commerce.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#90A19B",
          }}
        >
          <span>roazr.com</span>
          <span style={{ color: "#17E88F" }}>Get started →</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
