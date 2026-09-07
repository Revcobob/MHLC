// Generates loblolly-pine SVG: tall bare trunk, high open crown of drooping,
// layered branch masses with needle texture. Deterministic per seed.
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
const r2 = (n) => Math.round(n * 10) / 10;

// One branch mass: a drooping wedge with a scalloped underside.
function branch(cx, y, side, len, droop, rand) {
  const tipX = cx + side * len;
  const tipY = y + droop;
  // top edge: trunk -> tip, slightly lifted near the trunk
  let d = `M${r2(cx)} ${r2(y - 3)} `;
  d += `C${r2(cx + side * len * 0.35)} ${r2(y - 5 - droop * 0.1)} ${r2(cx + side * len * 0.75)} ${r2(y - 1 + droop * 0.35)} ${r2(tipX)} ${r2(tipY)} `;
  // underside: scalloped back to the trunk
  const lobes = 3 + Math.floor(rand() * 2);
  for (let i = lobes; i >= 1; i--) {
    const t0 = i / lobes;
    const t1 = (i - 1) / lobes;
    const x0 = cx + side * len * t0;
    const x1 = cx + side * len * t1;
    const yb0 = y + droop * t0 + 4 + rand() * 2;
    const yb1 = y + droop * t1 + 4 + rand() * 2;
    const mx = (x0 + x1) / 2;
    const my = Math.max(yb0, yb1) + 4 + rand() * 3.5;
    d += `Q${r2(mx)} ${r2(my)} ${r2(x1)} ${r2(yb1)} `;
  }
  return d + "Z";
}

// Fine needle strokes hanging off a branch's lower edge.
function needles(cx, y, side, len, droop, rand) {
  const out = [];
  const n = 4 + Math.floor(rand() * 3);
  for (let i = 0; i < n; i++) {
    const t = 0.28 + (i / n) * 0.68;
    const x = cx + side * len * t;
    const yy = y + droop * t + 6 + rand() * 3;
    const l = 3.5 + rand() * 3.5;
    out.push(
      `M${r2(x)} ${r2(yy)} l${r2(side * l * 0.45)} ${r2(l)}`,
      `M${r2(x + side * 2)} ${r2(yy - 1)} l${r2(side * l * 0.15)} ${r2(l * 0.9)}`,
    );
  }
  return out.join(" ");
}

/**
 * @param {object} o
 *  height  total svg height
 *  crown   fraction of height where the crown starts (0.35 = high crown)
 *  spread  half-width of the widest branch layer
 *  layers  number of branch layers
 *  seed    deterministic variation
 */
export function pine({
  height = 320,
  width = 140,
  crown = 0.42,
  spread = 52,
  layers = 9,
  seed = 1,
  lean = 0,
} = {}) {
  const rand = rng(seed);
  const cx = width / 2;
  const top = height * 0.1;
  const crownBase = height * crown + height * 0.18;
  const baseW = Math.max(3.2, height * 0.018);

  // Trunk: tapered, faint lean.
  const tx = (y) => cx + lean * ((height - y) / height) ** 2 * 10;
  const w = (y) => baseW * (0.16 + 0.84 * (y / height)) ** 1.25;
  let trunk = `M${r2(tx(height) - w(height))} ${height} `;
  for (let y = height; y >= top + 6; y -= 26)
    trunk += `L${r2(tx(y) - w(y))} ${r2(y)} `;
  trunk += `L${r2(tx(top) - 0.5)} ${r2(top)} L${r2(tx(top) + 0.5)} ${r2(top)} `;
  for (let y = top + 6; y <= height; y += 26)
    trunk += `L${r2(tx(y) + w(y))} ${r2(y)} `;
  trunk += `L${r2(tx(height) + w(height))} ${height} Z`;

  const back = [];
  const front = [];
  const twigs = [];
  const needleStrokes = [];

  for (let i = 0; i < layers; i++) {
    const t = i / (layers - 1); // 0 = bottom of crown, 1 = tip
    // Uneven vertical spacing keeps it from reading as a ladder.
    const y =
      crownBase - (t + (rand() - 0.5) * 0.06) * (crownBase - top - 4);
    // Widest a third of the way up the crown, not at its base.
    const taper = Math.sin(Math.min(1, (1 - t) * 1.34) * Math.PI * 0.72) ** 0.7;
    // Keep an apex tuft so the leader is not a bare pole above the crown.
    const len = Math.max(
      t > 0.82 ? 9 : 0,
      spread * taper * (0.8 + rand() * 0.34),
    );
    if (len < 5) continue;
    const droop = 5 + len * 0.26;
    for (const side of [-1, 1]) {
      // A gappy crown: some branches simply are not there.
      if (t > 0.12 && t < 0.94 && rand() < 0.16) continue;
      const l = len * (0.8 + rand() * 0.42);
      const yy = y + (rand() - 0.5) * 7;
      const ox = tx(yy) + (rand() - 0.5) * 5;
      const d = branch(ox, yy, side, l, droop, rand);
      (rand() > 0.45 ? front : back).push(d);
      twigs.push(
        `M${r2(tx(yy))} ${r2(yy)} L${r2(ox + side * l * 0.9)} ${r2(yy + droop * 0.8)}`,
      );
      needleStrokes.push(needles(ox, yy, side, l, droop, rand));
    }
  }
  // A little foliage over the trunk line so it does not read as a bare pole.
  for (let i = 0; i < 3; i++) {
    const yy = crownBase - (0.2 + i * 0.26) * (crownBase - top);
    front.push(branch(tx(yy) - 4, yy, 1, 11 + rand() * 7, 6, rand));
  }

  return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" aria-hidden="true" focusable="false">
<path d="${trunk}" fill="#9a8b76"/>
<g stroke="#9a8b76" stroke-width="1" stroke-linecap="round" opacity=".7" fill="none">${twigs.map((t) => `<path d="${t}"/>`).join("")}</g>
<g fill="#9dbb9c" opacity=".75">${back.map((d) => `<path d="${d}"/>`).join("")}</g>
<g fill="#7ba382" opacity=".88">${front.map((d) => `<path d="${d}"/>`).join("")}</g>
<g stroke="#4f7559" stroke-width=".7" stroke-linecap="round" opacity=".45" fill="none">${needleStrokes.map((d) => `<path d="${d}"/>`).join("")}</g>
</svg>`;
}
