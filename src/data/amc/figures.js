const FONT =
  'font-family="ui-sans-serif,system-ui,Segoe UI,sans-serif" font-weight="700" fill="#111827"';

export function fig(w, h, inner, label = 'Diagram') {
  const aria = String(label).replace(/"/g, "'");
  return `<svg class="amc-fig" viewBox="0 0 ${w} ${h}" role="img" aria-label="${aria}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="${w}" height="${h}" fill="#ffffff" rx="12"/>${inner}</svg>`;
}

export const figures = {
  rectCutout: fig(
    360,
    220,
    `<rect x="40" y="50" width="270" height="120" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/>
     <rect x="220" y="50" width="90" height="80" fill="#fff" stroke="#be123c" stroke-width="2.5" stroke-dasharray="7 5"/>
     <text x="155" y="122" ${FONT} font-size="16">9</text>
     <text x="28" y="118" ${FONT} font-size="16">4</text>
     <text x="258" y="96" ${FONT} font-size="14" fill="#9f1239">3×2</text>
     <text x="40" y="198" ${FONT} font-size="13" fill="#334155">cut 3 by 2 from the corner</text>`,
    'A 9 by 4 rectangle with a 3 by 2 rectangle cut from one corner'
  ),

  pythagorean: fig(
    340,
    260,
    `<polygon points="50,210 50,70 240,210" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/>
     <rect x="50" y="190" width="20" height="20" fill="none" stroke="#111827" stroke-width="2"/>
     <text x="18" y="150" ${FONT} font-size="16">4</text>
     <text x="130" y="236" ${FONT} font-size="16">3</text>
     <text x="160" y="128" ${FONT} font-size="16">?</text>`,
    'Right triangle with legs 3 and 4'
  ),

  parallels: fig(
    400,
    240,
    `<line x1="30" y1="70" x2="370" y2="70" stroke="#1d4ed8" stroke-width="4"/>
     <line x1="30" y1="170" x2="370" y2="170" stroke="#1d4ed8" stroke-width="4"/>
     <line x1="90" y1="30" x2="300" y2="210" stroke="#111827" stroke-width="3"/>
     <path d="M 148 70 A 22 22 0 0 1 168 86" fill="none" stroke="#be123c" stroke-width="2.5"/>
     <text x="172" y="78" ${FONT} font-size="15" fill="#9f1239">58°</text>
     <path d="M 232 170 A 22 22 0 0 1 252 186" fill="none" stroke="#15803d" stroke-width="2.5"/>
     <text x="258" y="196" ${FONT} font-size="16" fill="#15803d">x</text>
     <text x="36" y="60" ${FONT} font-size="13">AB</text>
     <text x="36" y="160" ${FONT} font-size="13">CD</text>
     <text x="120" y="228" ${FONT} font-size="13" fill="#334155">AB ∥ CD</text>`,
    'Parallel lines AB and CD cut by a transversal, 58 degrees and x corresponding'
  ),

  cornerSquares: fig(
    280,
    280,
    `<rect x="40" y="30" width="200" height="200" fill="#eff6ff" stroke="#1d4ed8" stroke-width="3"/>
     <rect x="40" y="30" width="50" height="50" fill="#fca5a5"/>
     <rect x="190" y="30" width="50" height="50" fill="#fca5a5"/>
     <rect x="40" y="180" width="50" height="50" fill="#fca5a5"/>
     <rect x="190" y="180" width="50" height="50" fill="#fca5a5"/>
     <text x="128" y="248" ${FONT} font-size="16">8</text>
     <text x="52" y="60" ${FONT} font-size="12">2</text>`,
    'Square of side 8 with 2 by 2 squares shaded in each corner'
  ),

  grid2x3: fig(
    300,
    230,
    `${[0, 1, 2]
      .flatMap((c) =>
        [0, 1].map(
          (r) =>
            `<rect x="${40 + c * 70}" y="${30 + r * 70}" width="70" height="70" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>`
        )
      )
      .join('')}
     <text x="70" y="210" ${FONT} font-size="14" fill="#334155">2 × 3 grid of squares</text>`,
    'A 2 by 3 grid of unit squares'
  ),

  lShape: fig(
    320,
    260,
    `<path d="M 50 40 H 230 V 160 H 140 V 210 H 50 Z" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/>
     <text x="128" y="32" ${FONT} font-size="15">6</text>
     <text x="32" y="130" ${FONT} font-size="15">6</text>
     <text x="176" y="150" ${FONT} font-size="14">2</text>
     <text x="150" y="228" ${FONT} font-size="14">2</text>`,
    'L-shape made from a 6 by 6 square with a 2 by 2 square removed'
  ),

  twoLines: fig(
    340,
    240,
    `<line x1="30" y1="40" x2="310" y2="200" stroke="#1d4ed8" stroke-width="3"/>
     <line x1="40" y1="200" x2="300" y2="40" stroke="#111827" stroke-width="3"/>
     <circle cx="170" cy="120" r="4" fill="#be123c"/>
     <path d="M 148 108 A 26 26 0 0 1 170 94" fill="none" stroke="#be123c" stroke-width="2.5"/>
     <text x="112" y="96" ${FONT} font-size="15" fill="#9f1239">47°</text>
     <path d="M 192 132 A 26 26 0 0 1 170 146" fill="none" stroke="#15803d" stroke-width="2.5"/>
     <text x="196" y="168" ${FONT} font-size="16" fill="#15803d">x</text>`,
    'Two lines intersecting, vertically opposite angles 47 degrees and x'
  ),

  rectTriangle: fig(
    340,
    230,
    `<rect x="50" y="40" width="240" height="144" fill="#eff6ff" stroke="#1d4ed8" stroke-width="3"/>
     <polygon points="50,184 290,184 50,40" fill="#fca5a5" fill-opacity="0.85" stroke="#be123c" stroke-width="2.5"/>
     <text x="155" y="210" ${FONT} font-size="16">10</text>
     <text x="18" y="120" ${FONT} font-size="16">6</text>`,
    'A 10 by 6 rectangle with one triangle shaded using a diagonal from a corner'
  ),

  grid3x3: fig(
    280,
    280,
    `${[0, 1, 2]
      .flatMap((c) =>
        [0, 1, 2].map(
          (r) =>
            `<rect x="${40 + c * 64}" y="${30 + r * 64}" width="64" height="64" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>`
        )
      )
      .join('')}`,
    'A 3 by 3 grid of unit squares'
  ),

  coord34: fig(
    300,
    300,
    `<line x1="40" y1="260" x2="280" y2="260" stroke="#111827" stroke-width="2"/>
     <line x1="40" y1="260" x2="40" y2="20" stroke="#111827" stroke-width="2"/>
     <polygon points="40,260 160,260 40,100" fill="#dbeafe" fill-opacity="0.7" stroke="#1d4ed8" stroke-width="2"/>
     <circle cx="160" cy="100" r="5" fill="#be123c"/>
     <circle cx="40" cy="260" r="4" fill="#111827"/>
     <text x="168" y="96" ${FONT} font-size="14">P(3, 4)</text>
     <text x="22" y="274" ${FONT} font-size="13">O</text>
     <text x="268" y="276" ${FONT} font-size="13">x</text>
     <text x="22" y="28" ${FONT} font-size="13">y</text>`,
    'Coordinate plane with origin O and point P at 3,4'
  ),

  midpoints: fig(
    300,
    260,
    `<polygon points="150,28 40,220 260,220" fill="#eff6ff" stroke="#1d4ed8" stroke-width="3"/>
     <polygon points="95,124 205,124 150,220" fill="#93c5fd" stroke="#1e40af" stroke-width="2"/>
     <circle cx="95" cy="124" r="4" fill="#111827"/>
     <circle cx="205" cy="124" r="4" fill="#111827"/>
     <circle cx="150" cy="220" r="4" fill="#111827"/>`,
    'Large triangle with midpoints joined'
  ),

  trapezoid: fig(
    340,
    220,
    `<polygon points="80,50 240,50 300,170 40,170" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/>
     <text x="148" y="42" ${FONT} font-size="15">6</text>
     <text x="148" y="198" ${FONT} font-size="15">10</text>
     <line x1="80" y1="50" x2="80" y2="170" stroke="#be123c" stroke-width="2" stroke-dasharray="5 4"/>
     <text x="88" y="118" ${FONT} font-size="15" fill="#9f1239">4</text>`,
    'Trapezoid with parallel sides 6 and 10 and height 4'
  ),

  pythag512: fig(
    360,
    260,
    `<polygon points="50,210 50,50 290,210" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/>
     <rect x="50" y="190" width="20" height="20" fill="none" stroke="#111827" stroke-width="2"/>
     <text x="16" y="140" ${FONT} font-size="16">12</text>
     <text x="150" y="236" ${FONT} font-size="16">5</text>
     <text x="188" y="120" ${FONT} font-size="16">?</text>`,
    'Right triangle with legs 5 and 12'
  ),

  lPerim: fig(
    340,
    260,
    `<path d="M 40 40 H 280 V 160 H 160 V 220 H 40 Z" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/>
     <text x="148" y="32" ${FONT} font-size="15">8</text>
     <text x="18" y="140" ${FONT} font-size="15">6</text>
     <text x="210" y="150" ${FONT} font-size="14">3</text>
     <text x="210" y="212" ${FONT} font-size="14">3</text>`,
    'L-shape: 8 by 6 rectangle with a 3 by 3 square removed from a corner'
  ),

  cubeNet: fig(
    300,
    340,
    `${[
      [110, 20, '5'],
      [30, 110, '2'],
      [110, 110, '3'],
      [190, 110, '4'],
      [110, 200, '1'],
      [110, 290, '6'],
    ]
      .map(
        ([x, y, t]) =>
          `<rect x="${x}" y="${y}" width="80" height="80" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/>
           <text x="${x + 28}" y="${y + 50}" ${FONT} font-size="28">${t}</text>`
      )
      .join('')}`,
    'Cube net numbered 1 to 6'
  ),

  similarTri: fig(
    340,
    240,
    `<polygon points="40,200 300,200 40,40" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/>
     <line x1="40" y1="120" x2="170" y2="200" stroke="#be123c" stroke-width="3"/>
     <text x="8" y="88" ${FONT} font-size="14">6</text>
     <text x="8" y="150" ${FONT} font-size="14">3</text>
     <text x="88" y="118" ${FONT} font-size="13" fill="#9f1239">small</text>`,
    'Two similar right triangles sharing an angle, small height 3 large height 6'
  ),

  hexagon: fig(
    300,
    280,
    `<polygon points="150,30 255,80 255,180 150,230 45,180 45,80" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/>
     <line x1="150" y1="30" x2="150" y2="230" stroke="#1e40af" stroke-width="1.5"/>
     <line x1="45" y1="80" x2="255" y2="180" stroke="#1e40af" stroke-width="1.5"/>
     <line x1="45" y1="180" x2="255" y2="80" stroke="#1e40af" stroke-width="1.5"/>
     <polygon points="150,130 255,80 255,180" fill="#93c5fd" stroke="#1e40af" stroke-width="1.5"/>`,
    'Regular hexagon split into six equilateral triangles, one shaded'
  ),

  coordArea: fig(
    300,
    280,
    `<line x1="40" y1="240" x2="280" y2="240" stroke="#111827" stroke-width="2"/>
     <line x1="40" y1="240" x2="40" y2="20" stroke="#111827" stroke-width="2"/>
     <polygon points="40,240 220,240 40,80" fill="#fca5a5" fill-opacity="0.8" stroke="#be123c" stroke-width="3"/>
     <text x="120" y="262" ${FONT} font-size="14">6</text>
     <text x="8" y="170" ${FONT} font-size="14">8</text>
     <text x="228" y="236" ${FONT} font-size="12">A</text>
     <text x="44" y="74" ${FONT} font-size="12">B</text>
     <text x="22" y="258" ${FONT} font-size="12">O</text>`,
    'Right triangle on axes with legs 6 and 8'
  ),
};
