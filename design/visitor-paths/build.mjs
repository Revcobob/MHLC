import { pine } from "./genpine.mjs";
import { writeFileSync } from "node:fs";

const OUT = "/home/user/MHLC/design/visitor-paths/";

/* Copy is unchanged from the live page — only the ribbon and the
   illustration around it are new. */
const rows = [
  {
    n: "01",
    who: "I am living with dementia",
    title: "See what a day here looks like.",
    text: "Homes, gardens, paths, and shared places planned around the shape of an ordinary day.",
    cue: "A day at MHLC",
    href: "#vision",
  },
  {
    n: "02",
    who: "I am caring for someone",
    title: "Find help today, and answers about later.",
    text: "Whether the Center is open, when families can ask about availability, and where to turn right now.",
    cue: "For families",
    href: "#families",
  },
  {
    n: "03",
    who: "I work in dementia care",
    title: "See where training would happen.",
    text: "A clinic, classrooms, and student housing are planned so caregivers and clinicians can learn on site.",
    cue: "The campus",
    href: "#campus",
  },
  {
    n: "04",
    who: "I am a clinician or educator",
    title: "Read the care model in full.",
    text: "The Hogeweyk lineage, the five principles behind it, and the education wing the European models do not have.",
    cue: "The care model",
    href: "/mhlc-overview.html#care-model",
  },
  {
    n: "05",
    who: "I live in East Texas",
    title: "See what this means for the region.",
    text: "Where the campus sits, what it is near, and why the location was chosen.",
    cue: "Location & region",
    href: "#partners",
  },
  {
    n: "06",
    who: "I want to help build it",
    title: "See where the project stands, and what it needs.",
    text: "What is funded, what is not, and how to talk with the Foundation about a larger commitment.",
    cue: "Ways to give",
    href: "#give",
  },
];

const head = (extra = "") => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Inter:wght@400;500;600&display=swap">
  <style>
    body { margin: 0; font-family: Inter, system-ui, sans-serif; }
    a { color: #0f4c4a; text-decoration: none; }
    a:hover { color: #0a3a39; }
    ${extra}
  </style>
</helmet>
`;
const tail = `</x-dc>
</body>
</html>
`;

const sectionHead = (scale = 1) => `
  <p style="margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #8e3f2a;">Start where you are</p>
  <div style="width: 56px; height: 3px; border-radius: 2px; background: #d4a04f; margin: ${scale > 0.8 ? "16px 0 20px" : "14px 0 18px"};"></div>
  <h2 style="margin: 0; font-family: 'Source Serif 4', Georgia, serif; font-size: ${scale > 0.8 ? 45 : 31}px; font-weight: 600; line-height: 1.12; letter-spacing: -0.012em;${scale > 0.8 ? " max-width: 22ch;" : ""}">Every visitor arrives with a different question.</h2>
  <p style="margin: ${scale > 0.8 ? 20 : 16}px 0 0; font-size: ${scale > 0.8 ? 19 : 17}px; line-height: 1.7; color: #3b433e; max-width: 54ch;">Choose the one closest to yours. Each goes straight to the part of the project that answers it.</p>
`;

/* ---------- The trail ribbon: pronounced, meandering ---------- */
// Waypoint centres, one per row (row height 132, first centre at 66).
const wp = [
  [146, 66],
  [70, 198],
  [144, 330],
  [72, 462],
  [146, 594],
  [74, 726],
];
const ribbon = `M120 -18 C 148 6 150 26 146 66 C 141 124 68 146 70 198 C 72 252 142 278 144 330 C 146 384 70 408 72 462 C 74 516 144 542 146 594 C 148 648 72 674 74 726 C 76 780 100 800 104 836`;

const trees = [
  // [x, bottomY, spec] — far/pale first so nearer pines overlay them
  [-26, 300, { seed: 3, height: 300, width: 150, crown: 0.4, spread: 52, layers: 11 }, 0.4],
  [168, 214, { seed: 11, height: 214, width: 120, crown: 0.44, spread: 38, layers: 9, lean: -0.4 }, 0.34],
  [16, 470, { seed: 23, height: 250, width: 130, crown: 0.42, spread: 44, layers: 10, lean: 0.3 }, 0.62],
  [156, 560, { seed: 37, height: 300, width: 140, crown: 0.4, spread: 50, layers: 11 }, 0.5],
  [-34, 782, { seed: 51, height: 268, width: 132, crown: 0.44, spread: 45, layers: 10, lean: -0.3 }, 0.72],
  [150, 856, { seed: 67, height: 224, width: 118, crown: 0.46, spread: 37, layers: 9 }, 0.66],
  [46, 150, { seed: 83, height: 168, width: 96, crown: 0.48, spread: 28, layers: 8 }, 0.3],
  [60, 880, { seed: 97, height: 150, width: 90, crown: 0.5, spread: 25, layers: 7, lean: 0.4 }, 0.55],
];

const treeLayer = trees
  .map(
    ([x, bottom, spec, op]) =>
      `<div style="position: absolute; left: ${x}px; top: ${bottom - spec.height}px; opacity: ${op};">${pine(spec)}</div>`,
  )
  .join("\n      ");

const trailSvg = (h) => `<svg width="260" height="${h + 90}" viewBox="0 0 260 ${h + 90}" aria-hidden="true" focusable="false" style="position: absolute; left: 0; top: 0;">
        <defs>
          <linearGradient id="trailFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fff" stop-opacity="0"></stop>
            <stop offset="0.06" stop-color="#fff" stop-opacity="1"></stop>
            <stop offset="0.9" stop-color="#fff" stop-opacity="1"></stop>
            <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
          </linearGradient>
          <mask id="trailMask"><rect x="0" y="0" width="260" height="${h + 90}" fill="url(#trailFade)"></rect></mask>
        </defs>
        <g mask="url(#trailMask)">
          <path d="${ribbon}" fill="none" stroke="#ece2d0" stroke-width="46" stroke-linecap="round"></path>
          <path d="${ribbon}" fill="none" stroke="#e3d8c3" stroke-width="44" stroke-linecap="round" stroke-dasharray="1 9" stroke-opacity=".8"></path>
        </g>
        ${wp
          .map(
            ([x, y]) =>
              `<g><circle cx="${x}" cy="${y}" r="19" fill="#ffffff"></circle><circle cx="${x}" cy="${y}" r="11" fill="#d4a04f"></circle></g>`,
          )
          .join("\n        ")}
        ${wp
          .map(
            ([x, y]) =>
              `<line x1="${x + 22}" y1="${y}" x2="248" y2="${y}" stroke="#e0d5c0" stroke-width="1"></line>`,
          )
          .join("\n        ")}
      </svg>`;

/* ---------- Main: desktop ---------- */
const desktopRows = rows
  .map(
    (r) => `
        <a href="${r.href}" style="display: grid; grid-template-columns: minmax(0, 186px) minmax(0, 1fr) minmax(0, 152px); align-items: baseline; gap: 34px; height: 132px; align-content: center; border-bottom: 1px solid #efe6d7;">
          <span style="display: flex; align-items: baseline; gap: 11px; font-size: 13px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #8e3f2a;">
            <span style="font-family: 'Source Serif 4', Georgia, serif; font-size: 14px; letter-spacing: 0; color: #8a6320;">${r.n}</span>
            <span>${r.who}</span>
          </span>
          <span style="display: block;">
            <span style="display: block; font-family: 'Source Serif 4', Georgia, serif; font-size: 25px; font-weight: 600; line-height: 1.22; letter-spacing: -0.012em; color: #1f2421;">${r.title}</span>
            <span style="display: block; margin-top: 7px; font-size: 15px; line-height: 1.7; color: #3b433e; max-width: 62ch;">${r.text}</span>
          </span>
          <span style="justify-self: end; font-size: 15px; font-weight: 600; color: #0f4c4a; white-space: nowrap;">${r.cue} &nbsp;&rarr;</span>
        </a>`,
  )
  .join("");

writeFileSync(
  OUT + "Main.dc.html",
  head() +
    `
<div style="width: 1440px; background: #ffffff; padding: 72px 32px 88px; box-sizing: border-box; color: #1f2421;">
  <div style="max-width: 1376px; margin: 0 auto;">
    ${sectionHead(1)}
    <div style="position: relative; margin-top: 52px; padding-left: 248px; min-height: 792px;">
      <div style="position: absolute; left: 0; top: -34px; width: 248px; height: 930px; overflow: hidden; -webkit-mask-image: linear-gradient(180deg, #000 0, #000 86%, transparent 100%); mask-image: linear-gradient(180deg, #000 0, #000 86%, transparent 100%);">
        ${treeLayer}
      </div>
      ${trailSvg(792)}
      <div style="position: relative; border-top: 1px solid #efe6d7;">${desktopRows}
      </div>
    </div>
  </div>
</div>
` +
    tail,
);

/* ---------- Mobile ---------- */
const mWp = [
  [82, 60],
  [48, 224],
  [80, 388],
  [48, 552],
  [82, 716],
  [50, 880],
];
const mRibbon = `M72 -14 C 84 4 84 22 82 60 C 80 122 46 160 48 224 C 50 290 78 326 80 388 C 82 452 46 490 48 552 C 50 616 80 654 82 716 C 84 780 48 818 50 880 C 52 926 62 944 64 972`;
const mTrees = [
  [-26, 268, { seed: 3, height: 196, width: 96, crown: 0.42, spread: 33, layers: 9 }, 0.3],
  [-14, 520, { seed: 23, height: 168, width: 88, crown: 0.44, spread: 29, layers: 8, lean: 0.3 }, 0.42],
  [-30, 760, { seed: 51, height: 182, width: 92, crown: 0.42, spread: 31, layers: 9, lean: -0.3 }, 0.36],
  [-18, 970, { seed: 67, height: 156, width: 84, crown: 0.46, spread: 26, layers: 8 }, 0.44],
];
const mTreeLayer = mTrees
  .map(
    ([x, bottom, spec, op]) =>
      `<div style="position: absolute; left: ${x}px; top: ${bottom - spec.height}px; opacity: ${op};">${pine(spec)}</div>`,
  )
  .join("\n        ");

const mobileRows = rows
  .map(
    (r) => `
          <a href="${r.href}" style="display: block; height: 164px; padding: 24px 0 0; box-sizing: border-box; border-bottom: 1px solid #efe6d7;">
            <span style="display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #8e3f2a;">${r.n} &nbsp;${r.who}</span>
            <span style="display: block; margin-top: 7px; font-family: 'Source Serif 4', Georgia, serif; font-size: 21px; font-weight: 600; line-height: 1.2; letter-spacing: -0.012em; color: #1f2421;">${r.title}</span>
            <span style="display: block; margin-top: 8px; font-size: 15px; font-weight: 600; color: #0f4c4a;">${r.cue} &nbsp;&rarr;</span>
          </a>`,
  )
  .join("");

writeFileSync(
  OUT + "PathMobile.dc.html",
  head() +
    `
<div style="width: 390px; background: #ffffff; padding: 40px 20px 48px; box-sizing: border-box; color: #1f2421;">
  ${sectionHead(0.6)}
  <div style="position: relative; margin-top: 34px; padding-left: 124px; min-height: 984px;">
    <div style="position: absolute; left: 0; top: -28px; width: 124px; height: 1060px; overflow: hidden; -webkit-mask-image: linear-gradient(180deg, #000 0, #000 88%, transparent 100%); mask-image: linear-gradient(180deg, #000 0, #000 88%, transparent 100%);">
      ${mTreeLayer}
    </div>
    <svg width="126" height="1010" viewBox="0 0 126 1010" aria-hidden="true" focusable="false" style="position: absolute; left: 0; top: 0;">
      <defs>
        <linearGradient id="mTrailFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity="0"></stop>
          <stop offset="0.05" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="0.92" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
        </linearGradient>
        <mask id="mTrailMask"><rect x="0" y="0" width="126" height="1010" fill="url(#mTrailFade)"></rect></mask>
      </defs>
      <g mask="url(#mTrailMask)">
        <path d="${mRibbon}" fill="none" stroke="#ece2d0" stroke-width="30" stroke-linecap="round"></path>
        <path d="${mRibbon}" fill="none" stroke="#e3d8c3" stroke-width="28" stroke-linecap="round" stroke-dasharray="1 8" stroke-opacity=".8"></path>
      </g>
      ${mWp.map(([x, y]) => `<g><circle cx="${x}" cy="${y}" r="14" fill="#ffffff"></circle><circle cx="${x}" cy="${y}" r="8" fill="#d4a04f"></circle></g>`).join("\n      ")}
    </svg>
    <div style="position: relative; border-top: 1px solid #efe6d7;">${mobileRows}
    </div>
  </div>
</div>
` +
    tail,
);

/* ---------- The illustration sheet ---------- */
const sheet = [
  { seed: 3, height: 340, width: 150, crown: 0.4, spread: 56, layers: 11 },
  { seed: 11, height: 300, width: 130, crown: 0.44, spread: 44, layers: 10, lean: -0.4 },
  { seed: 23, height: 250, width: 120, crown: 0.46, spread: 40, layers: 9, lean: 0.3 },
  { seed: 37, height: 190, width: 100, crown: 0.48, spread: 31, layers: 8 },
  { seed: 51, height: 150, width: 88, crown: 0.5, spread: 25, layers: 7, lean: -0.3 },
];
writeFileSync(
  OUT + "Pines.dc.html",
  head() +
    `
<div style="width: 900px; background: #f7f2ea; padding: 56px 48px 40px; box-sizing: border-box; color: #1f2421;">
  <p style="margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #8e3f2a;">The illustrations</p>
  <div style="width: 56px; height: 3px; border-radius: 2px; background: #d4a04f; margin: 16px 0 20px;"></div>
  <h2 style="margin: 0; font-family: 'Source Serif 4', Georgia, serif; font-size: 34px; font-weight: 600; line-height: 1.15; letter-spacing: -0.012em;">Loblolly pines, drawn to match the campus illustration.</h2>
  <p style="margin: 16px 0 0; font-size: 16px; line-height: 1.7; color: #3b433e; max-width: 58ch;">Tall bare trunks, high open crowns, drooping branch layers and fine needle strokes — the same sage and olive greens, warm trunks and soft edges as the daily-life illustration already on the page. Drawn as vectors, so they stay crisp at any size and add nothing to the page weight.</p>
  <div style="display: flex; gap: 30px; align-items: flex-end; margin-top: 40px;">
    ${sheet.map((s) => pine(s)).join("\n    ")}
  </div>
  <p style="margin: 28px 0 0; font-size: 14px; line-height: 1.6; color: #5f665f;">Five trees, varied in height, crown density and lean. On the page they are scaled and faded to sit at different depths, so the path reads as running through a wood rather than past a row of identical trees.</p>
</div>
` +
    tail,
);

console.log("wrote Main, PathMobile, Pines");
