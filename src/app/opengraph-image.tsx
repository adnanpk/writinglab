import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ICON = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/icon-256.png")).toString("base64")}`;
export const alt = "Writing Lab: English editing by PhD-qualified specialists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0F172A", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}<img src={ICON} width="110" height="110" alt="" style={{ borderRadius: 24 }} />
          <div style={{ fontSize: 56, fontWeight: 800 }}>Writing Lab</div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, marginTop: 48, lineHeight: 1.1 }}>Publication-ready English, edited by subject specialists</div>
        <div style={{ fontSize: 30, marginTop: 28, color: "#94A3B8" }}>Native-speaker · PhD-qualified · NDA · Free sample edit</div>
      </div>
    ),
    size,
  );
}
