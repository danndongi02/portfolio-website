import { ImageResponse } from "next/og";

export const alt = "Ian Muigai — Full-Stack Developer & Automation Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const headline = ["I build software that runs", "your business on", "autopilot", "."];
const label = "IAN MUIGAI";
const role = "FULL-STACK DEVELOPER & AUTOMATION ARCHITECT";
const place = "NAIROBI, KE — AVAILABLE WORLDWIDE";

// Satori needs TTF/OTF, which Google Fonts serves to non-browser user agents.
// Subsetting with `text` keeps each request tiny.
async function loadGoogleFont(family: string, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const serifText = headline.join(" ");
  const monoText = label + role + place + "—";

  const [serif, serifItalic, mono] = await Promise.all([
    loadGoogleFont("Instrument+Serif", serifText),
    loadGoogleFont("Instrument+Serif:ital@1", serifText),
    loadGoogleFont("JetBrains+Mono", monoText),
  ]);

  // Falls back to the default font if a download fails, so the build never breaks
  const fonts = [
    serif && { name: "Instrument Serif", data: serif, style: "normal" as const, weight: 400 as const },
    serifItalic && { name: "Instrument Serif", data: serifItalic, style: "italic" as const, weight: 400 as const },
    mono && { name: "JetBrains Mono", data: mono, style: "normal" as const, weight: 400 as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

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
          backgroundColor: "#08080a",
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,30,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,30,0.55) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#f0ece6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 2, height: 28, backgroundColor: "#ff4f33" }} />
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 20,
              letterSpacing: "0.3em",
              color: "#f0ece6",
            }}
          >
            {label}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Instrument Serif",
            fontSize: 84,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}
        >
          <div style={{ display: "flex" }}>{headline[0]}</div>
          <div style={{ display: "flex" }}>
            {headline[1]}
            <span style={{ fontStyle: "italic", marginLeft: "0.25em" }}>{headline[2]}</span>
            {headline[3]}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #1a1a1e",
            paddingTop: 28,
            fontFamily: "JetBrains Mono",
            fontSize: 17,
            letterSpacing: "0.15em",
            color: "#888888",
          }}
        >
          <div style={{ display: "flex" }}>{role}</div>
          <div style={{ display: "flex", color: "#7e7e7e" }}>{place}</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
