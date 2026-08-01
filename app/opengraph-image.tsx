import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const mark = await readFile(
    join(process.cwd(), "public/brand/roazr-mark.png"),
  );
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
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
          {/* Real brand mark — rounded corners are baked into the PNG. */}
          <img src={markSrc} width={56} height={56} alt="" />
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
            Revenue attribution for Meta &amp; Snapchat — built for WhatsApp
            commerce.
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
