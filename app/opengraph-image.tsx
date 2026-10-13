import { ImageResponse } from "next/og";

export const alt = "JSS Innovative Solutions — ERP that's innovating your business judgments";
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
          justifyContent: "center",
          background: "#0B1F4B",
          color: "#ffffff",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 8, background: "#D7141F" }} />
        <div style={{ display: "flex", fontSize: 78, fontWeight: 700, marginTop: 44, lineHeight: 1.1 }}>
          JSS Innovative Solutions
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 26, color: "#C9D3EE" }}>
          200% Customized ERP Solutions · Pune, India
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 70, color: "#FF7A82" }}>
          jssinnovativesolutions.com
        </div>
      </div>
    ),
    size
  );
}