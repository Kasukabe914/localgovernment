import { useState, useEffect, useMemo, useRef } from "react";

// ---------------------------------------------------------------------------
// Source: DIA, "Data release for council profiles – July 2025" (updated Oct 2025).
// pop  = usually resident population, 2024 (Stats NZ)
// area = land area, 2025, km² (Stats NZ)
// r24  = total rates revenue 2023/24 actual, dollars (workbook reports $000)
// r26  = total forecast rates revenue 2025/26, dollars
// ---------------------------------------------------------------------------
const COUNCILS = [
  { id: "farnorth", name: "Far North", region: "Northland", pop: 73500, area: 6687, r24: 103039000, r26: 122142000 },
  { id: "whangarei", name: "Whangārei", region: "Northland", pop: 100500, area: 2711, r24: 127432000, r26: 162152000 },
  { id: "kaipara", name: "Kaipara", region: "Northland", pop: 26800, area: 3109, r24: 45682000, r26: 55604000 },
  { id: "auckland", name: "Auckland", region: "Auckland", pop: 1797300, area: 4940, r24: 2523000000, r26: 3035235000, locked: true },
  { id: "thames", name: "Thames-Coromandel", region: "Waikato", pop: 32400, area: 2208, r24: 94354000, r26: 117517000 },
  { id: "hauraki", name: "Hauraki", region: "Waikato", pop: 21900, area: 1270, r24: 39359000, r26: 51940000 },
  { id: "waikatod", name: "Waikato District", region: "Waikato", pop: 90600, area: 4404, r24: 130394000, r26: 156832000 },
  { id: "matamata", name: "Matamata-Piako", region: "Waikato", pop: 39100, area: 1755, r24: 50741000, r26: 62249000 },
  { id: "hamilton", name: "Hamilton City", region: "Waikato", pop: 189700, area: 110, r24: 255719000, r26: 353949000 },
  { id: "waipa", name: "Waipā", region: "Waikato", pop: 61400, area: 1470, r24: 81073000, r26: 114179000 },
  { id: "otorohanga", name: "Ōtorohanga", region: "Waikato", pop: 10750, area: 1999, r24: 15714000, r26: 19161000 },
  { id: "swaikato", name: "South Waikato", region: "Waikato", pop: 25900, area: 1819, r24: 39895000, r26: 47649000 },
  { id: "waitomo", name: "Waitomo", region: "Waikato", pop: 9950, area: 3535, r24: 22502000, r26: 25738000 },
  { id: "taupo", name: "Taupō", region: "Waikato", pop: 42200, area: 6333, r24: 92833000, r26: 118089000 },
  { id: "wbop", name: "Western Bay of Plenty", region: "Bay of Plenty", pop: 60800, area: 1944, r24: 89024000, r26: 113112000 },
  { id: "tauranga", name: "Tauranga City", region: "Bay of Plenty", pop: 161300, area: 142, r24: 295016000, r26: 367996000 },
  { id: "rotorua", name: "Rotorua Lakes", region: "Bay of Plenty", pop: 77100, area: 2409, r24: 128139000, r26: 159928000 },
  { id: "whakatane", name: "Whakatāne", region: "Bay of Plenty", pop: 38300, area: 4444, r24: 59049000, r26: 79144000 },
  { id: "kawerau", name: "Kawerau", region: "Bay of Plenty", pop: 7670, area: 29, r24: 13057847, r26: 15811000 },
  { id: "opotiki", name: "Ōpōtiki", region: "Bay of Plenty", pop: 10300, area: 3090, r24: 14814000, r26: 17218000 },
  { id: "gisborne", name: "Gisborne", region: "Gisborne", pop: 53000, area: 8385, r24: 76965000, r26: 94904000 },
  { id: "wairoa", name: "Wairoa", region: "Hawke's Bay", pop: 8920, area: 4079, r24: 19141000, r26: 23437000 },
  { id: "hastings", name: "Hastings", region: "Hawke's Bay", pop: 89200, area: 5227, r24: 112761000, r26: 155043000 },
  { id: "napier", name: "Napier City", region: "Hawke's Bay", pop: 66800, area: 105, r24: 85724000, r26: 111890000 },
  { id: "chb", name: "Central Hawke's Bay", region: "Hawke's Bay", pop: 16050, area: 3333, r24: 27622000, r26: 36067000 },
  { id: "newplymouth", name: "New Plymouth", region: "Taranaki", pop: 90300, area: 2205, r24: 132257000, r26: 162300000 },
  { id: "stratford", name: "Stratford", region: "Taranaki", pop: 10400, area: 2163, r24: 16219000, r26: 19938000 },
  { id: "staranaki", name: "South Taranaki", region: "Taranaki", pop: 29900, area: 3575, r24: 48312000, r26: 57414000 },
  { id: "ruapehu", name: "Ruapehu", region: "Manawatū-Whanganui", pop: 13550, area: 6734, r24: 28731000, r26: 34373000 },
  { id: "whanganui", name: "Whanganui", region: "Manawatū-Whanganui", pop: 48900, area: 2373, r24: 76562000, r26: 88001000 },
  { id: "rangitikei", name: "Rangitīkei", region: "Manawatū-Whanganui", pop: 16200, area: 4484, r24: 28890000, r26: 35573000 },
  { id: "manawatu", name: "Manawatū", region: "Manawatū-Whanganui", pop: 33700, area: 2567, r24: 47102000, r26: 54555000 },
  { id: "palmy", name: "Palmerston North", region: "Manawatū-Whanganui", pop: 91300, area: 395, r24: 124714000, r26: 145900000 },
  { id: "tararua", name: "Tararua", region: "Manawatū-Whanganui", pop: 19050, area: 4365, r24: 33761000, r26: 41504000 },
  { id: "horowhenua", name: "Horowhenua", region: "Manawatū-Whanganui", pop: 38200, area: 1064, r24: 52533000, r26: 68694000 },
  { id: "kapiti", name: "Kāpiti Coast", region: "Wellington", pop: 57700, area: 732, r24: 87643000, r26: 114024000 },
  { id: "porirua", name: "Porirua City", region: "Wellington", pop: 61800, area: 175, r24: 96417000, r26: 122653000 },
  { id: "upperhutt", name: "Upper Hutt City", region: "Wellington", pop: 47500, area: 540, r24: 53506000, r26: 75739000 },
  { id: "hutt", name: "Hutt City", region: "Wellington", pop: 113400, area: 376, r24: 156488000, r26: 208411000 },
  { id: "wellington", name: "Wellington City", region: "Wellington", pop: 209900, area: 290, r24: 483252000, r26: 628974000 },
  { id: "masterton", name: "Masterton", region: "Wellington", pop: 28700, area: 2300, r24: 41025706, r26: 49663000 },
  { id: "carterton", name: "Carterton", region: "Wellington", pop: 10300, area: 1180, r24: 17755000, r26: 20641000 },
  { id: "swairarapa", name: "South Wairarapa", region: "Wellington", pop: 12250, area: 2388, r24: 25966000, r26: 31027000 },
  { id: "tasman", name: "Tasman", region: "Nelson-Tasman", pop: 59800, area: 9616, r24: 100049000, r26: 121655000 },
  { id: "nelson", name: "Nelson City", region: "Nelson-Tasman", pop: 54400, area: 422, r24: 84741000, r26: 106060000 },
  { id: "marlborough", name: "Marlborough", region: "Marlborough", pop: 51600, area: 10458, r24: 88218000, r26: 109456000 },
  { id: "buller", name: "Buller", region: "West Coast", pop: 10600, area: 7943, r24: 16360000, r26: 23195000, r24note: "2023/24 actual unavailable; 2021/22 shown" },
  { id: "grey", name: "Grey District", region: "West Coast", pop: 14400, area: 3474, r24: 21483000, r26: 29361000 },
  { id: "westland", name: "Westland", region: "West Coast", pop: 9270, area: 11829, r24: 18891000, r26: 25984000 },
  { id: "kaikoura", name: "Kaikōura", region: "Canterbury", pop: 4380, area: 2049, r24: 9625000, r26: 11730000 },
  { id: "hurunui", name: "Hurunui", region: "Canterbury", pop: 14200, area: 8641, r24: 29127000, r26: 34355000 },
  { id: "waimakariri", name: "Waimakariri", region: "Canterbury", pop: 69000, area: 2217, r24: 88031000, r26: 106942000 },
  { id: "christchurch", name: "Christchurch City", region: "Canterbury", pop: 412000, area: 1415, r24: 687030000, r26: 836698000 },
  { id: "selwyn", name: "Selwyn", region: "Canterbury", pop: 85200, area: 6381, r24: 96104000, r26: 135673000 },
  { id: "ashburton", name: "Ashburton", region: "Canterbury", pop: 36800, area: 6181, r24: 48462000, r26: 56303000 },
  { id: "timaru", name: "Timaru", region: "Canterbury", pop: 49500, area: 2732, r24: 72809000, r26: 91940000 },
  { id: "mackenzie", name: "Mackenzie", region: "Canterbury", pop: 5500, area: 7139, r24: 16074000, r26: 20242000 },
  { id: "waimate", name: "Waimate", region: "Canterbury", pop: 8500, area: 3554, r24: 14100000, r26: 17479000 },
  { id: "waitaki", name: "Waitaki", region: "Otago", pop: 24300, area: 7108, r24: 41280000, r26: 51064000 },
  { id: "centralotago", name: "Central Otago", region: "Otago", pop: 25500, area: 9933, r24: 43992000, r26: 60106000 },
  { id: "qldc", name: "Queenstown-Lakes", region: "Otago", pop: 52900, area: 8719, r24: 123066000, r26: 175548000 },
  { id: "dunedin", name: "Dunedin City", region: "Otago", pop: 131800, area: 3286, r24: 203946000, r26: 264596000 },
  { id: "clutha", name: "Clutha", region: "Otago", pop: 18700, area: 6335, r24: 30706000, r26: 41716000 },
  { id: "southlandd", name: "Southland District", region: "Southland", pop: 33300, area: 29586, r24: 63282000, r26: 77151000 },
  { id: "gore", name: "Gore", region: "Southland", pop: 13000, area: 1254, r24: 22341000, r26: 29553000 },
  { id: "invercargill", name: "Invercargill City", region: "Southland", pop: 57600, area: 390, r24: 71292000, r26: 85019000 },
  { id: "chathams", name: "Chatham Islands", region: "Chatham Islands", pop: 610, area: 795, r24: 787000, r26: 873000 },
];

// ---------------------------------------------------------------------------
// Households and average residential rates bill (2024/25), by council.
// Source: NZ Taxpayers' Union, Ratepayers' Report 2026 (year ended 30 June
// 2025), compiled from council annual reports and LGOIMA requests — a separate,
// non-government source from the DIA/Stats NZ figures above. hh = households;
// avgRes = average residential rates bill in dollars (null where the council
// refused or did not respond). Chatham Islands is not in the report; its
// household count is an estimate (est: true).
// ---------------------------------------------------------------------------
const HH = {
  farnorth: { hh: 32538, avgRes: 3276.19 },
  whangarei: { hh: 41319, avgRes: 3112.65 },
  kaipara: { hh: 13368, avgRes: 3181.0 },
  auckland: { hh: 609774, avgRes: 3520.0 },
  thames: { hh: 26829, avgRes: 4266.86 },
  hauraki: { hh: 9729, avgRes: 3753.94 },
  waikatod: { hh: 31869, avgRes: 4409.74 },
  matamata: { hh: 15162, avgRes: 3346.08 },
  hamilton: { hh: 65403, avgRes: 3620.0 },
  waipa: { hh: 23379, avgRes: 3895.81 },
  otorohanga: { hh: 4416, avgRes: 2554.36 },
  swaikato: { hh: 9912, avgRes: 3736.34 },
  waitomo: { hh: 4407, avgRes: 3621.96 },
  taupo: { hh: 22044, avgRes: 4090.0 },
  wbop: { hh: 23895, avgRes: null },
  tauranga: { hh: 61587, avgRes: 4534.04 },
  rotorua: { hh: 29658, avgRes: 4031.59 },
  whakatane: { hh: 14928, avgRes: 4508.0 },
  kawerau: { hh: 2823, avgRes: 3130.37 },
  opotiki: { hh: 4713, avgRes: 3163.49 },
  gisborne: { hh: 19314, avgRes: 3786.0 },
  wairoa: { hh: 4260, avgRes: 3420.97 },
  hastings: { hh: 32614, avgRes: 4368.0 },
  napier: { hh: 26739, avgRes: 3558.83 },
  chb: { hh: 6867, avgRes: 3697.0 },
  newplymouth: { hh: 36060, avgRes: 3663.87 },
  stratford: { hh: 4302, avgRes: 3664.37 },
  staranaki: { hh: 12378, avgRes: 2975.71 },
  ruapehu: { hh: 7602, avgRes: 4001.78 },
  whanganui: { hh: 20544, avgRes: 3861.48 },
  rangitikei: { hh: 6960, avgRes: 3440.0 },
  manawatu: { hh: 13139, avgRes: 3791.48 },
  palmy: { hh: 33987, avgRes: 3648.0 },
  tararua: { hh: 8190, avgRes: 3738.0 },
  horowhenua: { hh: 17109, avgRes: 4402.0 },
  kapiti: { hh: 26208, avgRes: 4357.0 },
  porirua: { hh: 20580, avgRes: 5591.0 },
  upperhutt: { hh: 17850, avgRes: 3392.95 },
  hutt: { hh: 42348, avgRes: 4004.47 },
  wellington: { hh: 84678, avgRes: 5093.73 },
  masterton: { hh: 12453, avgRes: 3378.0 },
  carterton: { hh: 4626, avgRes: 4770.53 },
  swairarapa: { hh: 6258, avgRes: 4494.0 },
  tasman: { hh: 25755, avgRes: 4240.68 },
  nelson: { hh: 22626, avgRes: 4650.0 },
  marlborough: { hh: 24324, avgRes: 3828.0 },
  buller: { hh: 6054, avgRes: 3089.61 },
  grey: { hh: 6888, avgRes: 2702.89 },
  westland: { hh: 5007, avgRes: null },
  kaikoura: { hh: 2466, avgRes: 4019.42 },
  hurunui: { hh: 7353, avgRes: 3041.77 },
  waimakariri: { hh: 27375, avgRes: 3940.0 },
  christchurch: { hh: 166029, avgRes: 3923.1 },
  selwyn: { hh: 30075, avgRes: 4306.71 },
  ashburton: { hh: 15343, avgRes: 3142.7 },
  timaru: { hh: 21429, avgRes: 3380.63 },
  mackenzie: { hh: 4134, avgRes: 3311.32 },
  waimate: { hh: 3957, avgRes: 2901.21 },
  waitaki: { hh: 12051, avgRes: null },
  centralotago: { hh: 12441, avgRes: 3743.03 },
  qldc: { hh: 25101, avgRes: 4848.32 },
  dunedin: { hh: 54198, avgRes: 3532.0 },
  clutha: { hh: 8841, avgRes: 2677.74 },
  southlandd: { hh: 16344, avgRes: 2995.65 },
  gore: { hh: 5781, avgRes: 3711.93 },
  invercargill: { hh: 23922, avgRes: 2894.0 },
  chathams: { hh: 270, avgRes: null, est: true },
};


// ---------------------------------------------------------------------------
// Rating units per council — the true denominator for rates, since councils
// levy on every separately rateable property (homes, farms, commercial sites,
// baches), not on households. Source: "NZ local-authority rating units",
// best-available count per council, compiled from annual reports, long-term
// plans and regional-council valuation rolls. ru = preferred count; ruStatus
// flags counts that are older, projected, draft or a proxy (absent = confirmed
// actual). Chatham Islands is not in the dataset (ru: null).
// ---------------------------------------------------------------------------
const RU = {
  farnorth: { ru: 40045 },
  whangarei: { ru: 46203, ruStatus: "older" },
  kaipara: { ru: 16936 },
  auckland: { ru: 630000, ruStatus: "proxy" },
  thames: { ru: 28650 },
  hauraki: { ru: 11960 },
  waikatod: { ru: 37739 },
  matamata: { ru: 16660 },
  hamilton: { ru: 65076 },
  waipa: { ru: 25609 },
  otorohanga: { ru: 5619 },
  swaikato: { ru: 10440 },
  waitomo: { ru: 5955 },
  taupo: { ru: 25628 },
  wbop: { ru: 24970 },
  tauranga: { ru: 62101 },
  rotorua: { ru: 31254 },
  whakatane: { ru: 17166 },
  kawerau: { ru: 3006, ruStatus: "older" },
  opotiki: { ru: 5599, ruStatus: "projected" },
  gisborne: { ru: 23847, ruStatus: "older" },
  wairoa: { ru: 6958, ruStatus: "projected" },
  hastings: { ru: 32575, ruStatus: "projected" },
  napier: { ru: 26857, ruStatus: "proxy" },
  chb: { ru: 8395, ruStatus: "proxy" },
  newplymouth: { ru: 38466 },
  stratford: { ru: 5469 },
  staranaki: { ru: 14806 },
  ruapehu: { ru: 10196 },
  whanganui: { ru: 21801, ruStatus: "projected" },
  rangitikei: { ru: 8884 },
  manawatu: { ru: 15580 },
  palmy: { ru: 34932 },
  tararua: { ru: 10451, ruStatus: "draft" },
  horowhenua: { ru: 19649 },
  kapiti: { ru: 26195 },
  porirua: { ru: 20139 },
  upperhutt: { ru: 18129 },
  hutt: { ru: 42916 },
  wellington: { ru: 82547 },
  masterton: { ru: 13822 },
  carterton: { ru: 5331 },
  swairarapa: { ru: 7546 },
  tasman: { ru: 28036, ruStatus: "draft" },
  nelson: { ru: 23237 },
  marlborough: { ru: 27497 },
  buller: { ru: 7570, ruStatus: "older" },
  grey: { ru: 9234 },
  westland: { ru: 6685, ruStatus: "projected" },
  kaikoura: { ru: 3340 },
  hurunui: { ru: 10271 },
  waimakariri: { ru: 29013 },
  christchurch: { ru: 181698 },
  selwyn: { ru: 35398 },
  ashburton: { ru: 16367 },
  timaru: { ru: 23390 },
  mackenzie: { ru: 5539 },
  waimate: { ru: 4347, ruStatus: "proxy" },
  waitaki: { ru: 14007 },
  centralotago: { ru: 15310 },
  qldc: { ru: 33823 },
  dunedin: { ru: 57553 },
  clutha: { ru: 11371 },
  southlandd: { ru: 20993 },
  gore: { ru: 6743 },
  invercargill: { ru: 27310 },
  chathams: { ru: null },  // not in rating-units dataset
};

// Merge households, avg residential rates and rating units onto each council.
COUNCILS.forEach((c) => {
  const h = HH[c.id];
  if (h) { c.hh = h.hh; c.avgRes = h.avgRes; c.hhEst = !!h.est; }
  const u = RU[c.id];
  if (u) { c.ru = u.ru; c.ruStatus = u.ruStatus || null; }
});

const BY_ID = Object.fromEntries(COUNCILS.map((c) => [c.id, c]));
const REGIONS_N = ["Northland", "Auckland", "Waikato", "Bay of Plenty", "Gisborne", "Hawke's Bay", "Taranaki", "Manawatū-Whanganui", "Wellington"];
const REGIONS_S = ["Nelson-Tasman", "Marlborough", "West Coast", "Canterbury", "Otago", "Southland", "Chatham Islands"];
const COLORS = ["#E4572E", "#17BEBB", "#FFC914", "#76B041", "#A26DC2", "#3D6FB6", "#EF7BAE", "#B0413E", "#F18F01", "#2E933C", "#6B4E71", "#0FA3B1", "#D1495B", "#4C9F70", "#8D6A9F", "#EDAE49"];

const PIECE_W = 112, PIECE_H = 84, COL_W = 84;

// ---------------------------------------------------------------------------
// Share codes. The whole map rides in the URL hash, so a link needs no server
// and works on static hosting. Format:
//   1<basis><year>~<name>:<colourIdx>:<memberIdxs>~<name>:...
// Council ids are their index in COUNCILS as two base-36 chars; names are
// URI-encoded. Empty groups are dropped.
// ---------------------------------------------------------------------------
// Population of each region's territorial authorities. Used for the majority
// test below: the reform lets a coalition holding more than half a region's
// population lodge a proposal covering the whole region, including councils
// that object to being in it.
const REGION_POP = {};
COUNCILS.forEach((c) => { if (!c.locked) REGION_POP[c.region] = (REGION_POP[c.region] || 0) + c.pop; });

const IDX_OF = Object.fromEntries(COUNCILS.map((c, i) => [c.id, i]));
const BASIS_CODE = { person: "p", household: "h", unit: "u", bill: "b" };
const CODE_BASIS = { p: "person", h: "household", u: "unit", b: "bill" };
const b36 = (n) => n.toString(36).padStart(2, "0");

function encodeMap(groups, assignment, basis, year) {
  const byGroup = {};
  groups.forEach((g) => (byGroup[g.id] = []));
  Object.entries(assignment).forEach(([cid, gid]) => {
    if (byGroup[gid] && IDX_OF[cid] != null) byGroup[gid].push(IDX_OF[cid]);
  });
  const parts = groups
    .filter((g) => byGroup[g.id].length)
    .map((g) => {
      const ci = COLORS.indexOf(g.color);
      const mem = byGroup[g.id].sort((a, b) => a - b).map(b36).join("");
      return `${encodeURIComponent(g.name)}:${(ci < 0 ? 0 : ci).toString(36)}:${mem}`;
    });
  if (!parts.length) return null;
  return `1${BASIS_CODE[basis] || "p"}${year === "r24" ? "4" : "6"}~${parts.join("~")}`;
}

function decodeMap(code) {
  try {
    const bits = String(code).split("~");
    const head = bits.shift();
    if (!head || head[0] !== "1" || !bits.length) return null;
    const basis = CODE_BASIS[head[1]] || "person";
    const year = head[2] === "4" ? "r24" : "r26";
    const groups = [];
    const assignment = {};
    bits.forEach((part, i) => {
      const seg = part.split(":");
      if (seg.length < 3) return;
      const id = "sg" + i;
      const name = decodeURIComponent(seg[0]).slice(0, 60) || `Council ${i + 1}`;
      const color = COLORS[parseInt(seg[1], 36)] || COLORS[i % COLORS.length];
      const mem = seg[2];
      const picked = [];
      for (let k = 0; k + 1 < mem.length + 1; k += 2) {
        const chunk = mem.slice(k, k + 2);
        if (chunk.length < 2) break;
        const c = COUNCILS[parseInt(chunk, 36)];
        if (c && !c.locked && assignment[c.id] == null) { assignment[c.id] = id; picked.push(c.id); }
      }
      if (picked.length) groups.push({ id, name, color });
    });
    if (!groups.length) return null;
    return { groups, assignment, basis, year };
  } catch (e) { return null; }
}
const PIECE_PATH = "M14 0 H98 V32 C106 30 112 34 112 42 C112 50 106 54 98 52 V84 H14 V52 C22 54 28 50 28 42 C28 34 22 30 14 32 Z";
const MASK_URI = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${PIECE_W} ${PIECE_H}'><path d='${PIECE_PATH}'/></svg>`)}")`;

const fmtPop = (n) => (n >= 999500 ? (n / 1000000).toFixed(2).replace(/0$/, "") + "m" : n >= 1000 ? Math.round(n / 1000) + "k" : String(Math.round(n)));
const money = (n) => (n == null || !isFinite(n) ? "—" : "$" + Math.round(n).toLocaleString("en-NZ"));
const signed = (n) => (n >= 0 ? "+" : "−") + "$" + Math.abs(Math.round(n)).toLocaleString("en-NZ");
// WCAG relative luminance, then pick whichever of black/white gives the higher
// contrast ratio — replaces the old brightness heuristic that failed AA.
const relLum = (hex) => {
  const c = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const textOn = (hex) => {
  const L = relLum(hex);
  const withWhite = 1.05 / (L + 0.05);
  const withBlack = (L + 0.05) / 0.05;
  return withBlack >= withWhite ? "#12232A" : "#FFFFFF";
};

// ---------------------------------------------------------------------------
// Nicknames. Offered before the generated blends when the membership fits.
// `anchor` must be present; `need` is how many of `ids` must be in the group.
// ---------------------------------------------------------------------------
const NICKNAMES = [
  // Waikato — Megatron leads wherever Hamilton is in the mix
  { name: "Megatron", anchor: "hamilton", ids: ["thames", "hauraki", "waikatod", "matamata", "waipa", "otorohanga", "swaikato", "waitomo", "taupo"], need: 3 },
  { name: "Hamiltron", anchor: "hamilton", ids: ["waikatod", "waipa", "matamata", "hauraki"], need: 1 },
  { name: "Greater Tron", anchor: "hamilton", ids: ["waikatod", "waipa", "otorohanga", "swaikato", "waitomo", "taupo", "thames", "hauraki", "matamata"], need: 2 },
  { name: "Kiwiana Country", ids: ["otorohanga", "waitomo"], need: 2 },
  { name: "Glowworm District", ids: ["otorohanga", "waitomo", "swaikato"], need: 2 },
  // Northland
  { name: "The Winterless Council", ids: ["farnorth", "whangarei", "kaipara"], need: 2 },
  { name: "Northlandia", ids: ["farnorth", "whangarei", "kaipara"], need: 2 },
  // Bay of Plenty
  { name: "Plentyville", ids: ["wbop", "tauranga", "rotorua", "whakatane", "kawerau", "opotiki"], need: 4 },
  { name: "The Sunrise Coast", ids: ["whakatane", "kawerau", "opotiki"], need: 3 },
  { name: "Mount Metropolitan", anchor: "tauranga", ids: ["wbop", "tauranga"], need: 2 },
  // Hawke's Bay
  { name: "The Fruit Bowl", ids: ["hastings", "napier", "chb", "wairoa"], need: 3 },
  { name: "The Twin Cities", ids: ["napier", "hastings"], need: 2 },
  { name: "Art Deco Council", anchor: "napier", ids: ["napier", "hastings", "chb"], need: 2 },
  // Taranaki
  { name: "The Naki", ids: ["newplymouth", "stratford", "staranaki"], need: 2 },
  { name: "Ring Plain Council", ids: ["newplymouth", "stratford", "staranaki"], need: 2 },
  // Manawatū-Whanganui
  { name: "Greater Palmy", anchor: "palmy", ids: ["manawatu", "horowhenua", "tararua", "rangitikei"], need: 1 },
  { name: "Windfarm Country", ids: ["palmy", "manawatu", "tararua", "rangitikei", "horowhenua", "whanganui", "ruapehu"], need: 4 },
  { name: "River City & Friends", anchor: "whanganui", ids: ["whanganui", "rangitikei", "ruapehu"], need: 2 },
  // Wellington
  { name: "Wellingtron", anchor: "wellington", ids: ["hutt", "upperhutt", "porirua", "kapiti"], need: 2 },
  { name: "Wellywood", anchor: "wellington", ids: ["hutt", "upperhutt", "porirua", "kapiti", "masterton", "carterton", "swairarapa"], need: 2 },
  { name: "The Big Windy", ids: ["wellington", "hutt", "upperhutt", "porirua", "kapiti"], need: 3 },
  { name: "The Wairarapa Three", ids: ["masterton", "carterton", "swairarapa"], need: 3 },
  // Top of the south
  { name: "The Sunbelt", ids: ["nelson", "tasman"], need: 2 },
  { name: "Nelmania", ids: ["nelson", "tasman"], need: 2 },
  { name: "Wine & Whales", ids: ["marlborough", "kaikoura"], need: 2 },
  { name: "Sauv Blanc Shire", anchor: "marlborough", ids: ["marlborough", "kaikoura", "tasman"], need: 1 },
  // West Coast
  { name: "The Coast", ids: ["buller", "grey", "westland"], need: 2 },
  { name: "Wild West Council", ids: ["buller", "grey", "westland"], need: 2 },
  // Canterbury
  { name: "Megachurch", anchor: "christchurch", ids: ["selwyn", "waimakariri", "hurunui", "ashburton"], need: 2 },
  { name: "The Garden Metro", anchor: "christchurch", ids: ["selwyn", "waimakariri"], need: 1 },
  { name: "Cantropolis", ids: ["kaikoura", "hurunui", "waimakariri", "christchurch", "selwyn", "ashburton", "timaru", "mackenzie", "waimate"], need: 6 },
  { name: "North Canterbury", ids: ["waimakariri", "hurunui", "kaikoura"], need: 2 },
  { name: "Aoraki Council", ids: ["timaru", "mackenzie", "waimate", "waitaki"], need: 3 },
  // Otago
  { name: "Edinburgh of the South", anchor: "dunedin", ids: ["clutha", "centralotago", "waitaki", "qldc"], need: 1 },
  { name: "The Goldfields", ids: ["centralotago", "qldc", "clutha", "waitaki"], need: 3 },
  { name: "Otagopolis", ids: ["waitaki", "centralotago", "qldc", "dunedin", "clutha"], need: 4 },
  // Southland
  { name: "Southlandia", ids: ["southlandd", "gore", "invercargill"], need: 2 },
  { name: "The Deep South", ids: ["southlandd", "gore", "invercargill", "clutha"], need: 2 },
  { name: "Gorevercargill", ids: ["gore", "invercargill"], need: 2 },
];

function nicknamesFor(members) {
  const ids = new Set(members.map((m) => m.id));
  return NICKNAMES.filter((n) => {
    if (n.anchor && !ids.has(n.anchor)) return false;
    const inSet = members.filter((m) => n.ids.includes(m.id) || m.id === n.anchor).length;
    const fromSet = n.ids.filter((x) => ids.has(x)).length;
    return fromSet >= n.need && inSet >= members.length * 0.7;
  }).map((n) => n.name);
}

// ---------------------------------------------------------------------------
// Blend generator (fallback when no nickname fits)
// ---------------------------------------------------------------------------
const VOWEL = /[aeiouyāēīōū]/i;
const FILLER = new Set(["north", "south", "east", "west", "northern", "southern", "eastern", "western", "central", "upper", "lower", "far", "new", "of", "the", "bay", "district", "city", "lakes", "islands", "coast", "greater"]);
function coreWord(name) {
  const words = String(name).replace(/[’']/g, "").split(/[\s\-–]+/).filter(Boolean);
  const keep = words.filter((w) => !FILLER.has(w.toLowerCase()));
  return (keep.length ? keep : words).reduce((a, b) => (b.length > a.length ? b : a));
}
function vowelGroups(w) {
  const out = []; let i = 0;
  while (i < w.length) { if (VOWEL.test(w[i])) { const s = i; while (i < w.length && VOWEL.test(w[i])) i++; out.push([s, i]); } else i++; }
  return out;
}
function blend(nameA, nameB) {
  const a = coreWord(nameA), b = coreWord(nameB);
  const ga = vowelGroups(a), gb = vowelGroups(b);
  const head = ga.length >= 2 ? a.slice(0, ga[1][1]) : a;
  let tail = b;
  if (gb.length >= 2) { let c = gb[1][0]; while (c > 0 && !VOWEL.test(b[c - 1])) c--; tail = b.slice(c); }
  if (tail.length < 3) tail = b;
  let out = (head + tail.toLowerCase()).replace(/([aeiou])\1+/gi, "$1");
  if (out.length > 15) out = out.slice(0, 15);
  return out.charAt(0).toUpperCase() + out.slice(1);
}
function nameCandidates(members) {
  if (members.length < 2) return [];
  const sorted = [...members].sort((a, b) => b.pop - a.pop);
  const [a, b] = sorted;
  const ids = new Set(members.map((m) => m.id));
  const out = [...nicknamesFor(members)];
  out.push(blend(a.name, b.name));
  out.push(`Greater ${coreWord(a.name)}`);
  const regions = [...new Set(members.map((m) => m.region))];
  if (regions.length === 1) {
    const all = COUNCILS.filter((c) => c.region === regions[0] && !c.locked);
    out.push(all.every((c) => ids.has(c.id)) ? regions[0] : `${regions[0]} Combined`);
  } else if (regions.length === 2) out.push(`${coreWord(regions[0])}–${coreWord(regions[1])}`);
  out.push(`${coreWord(a.name)}–${coreWord(b.name)}`);
  out.push(blend(b.name, a.name));
  if (members.length >= 5) out.push(`${coreWord(a.name)} Metro`);
  return [...new Set(out)].filter(Boolean);
}

// ---------------------------------------------------------------------------
function ShareBar({ members, color, compact }) {
  const total = members.reduce((s, m) => s + m.pop, 0) || 1;
  const sorted = [...members].sort((a, b) => b.pop - a.pop);
  const pct = (m) => (m.pop / total) * 100;
  const top = sorted[0], bottom = sorted[sorted.length - 1];
  return (
    <div className={"share" + (compact ? " shareCompact" : "")}>
      <div className="shareBar">
        {sorted.map((m, i) => (<div key={m.id} className="shareSeg" style={{ width: pct(m) + "%", background: color, opacity: Math.max(0.34, 1 - i * 0.13) }} title={`${m.name}: ${pct(m).toFixed(1)}%`} />))}
        <div className="shareMid" aria-hidden="true" />
      </div>
      {!compact && (
        <>
          <div className="shareLegend">
            {sorted.slice(0, 3).map((m) => (<span key={m.id} className="legendItem">{m.name} <b>{Math.round(pct(m))}%</b></span>))}
            {sorted.length > 3 && <span className="legendItem muted">+{sorted.length - 3} more</span>}
          </div>
          <p className="shareVerdict">
            {top.pop / total > 0.5 ? (<><strong>{top.name}</strong> would make up {Math.round(pct(top))}% of the merged population on its own — more than everyone else combined.</>)
              : pct(top) >= 35 ? (<><strong>{top.name}</strong> would be the largest share at {Math.round(pct(top))}%, but under half the total; no single district would be an outright majority of residents.</>)
              : (<>No district would exceed {Math.round(pct(top))}% of the merged population. It's spread fairly evenly across {sorted.length} of them.</>)}{" "}
            <span className="muted">{bottom.name} would be {pct(bottom) < 1 ? "under 1" : Math.round(pct(bottom))}%.</span>
          </p>
          <p className="shareCaveat">Population share, not voting power — how councillors, wards and local boards would be arranged is set by each proposal, not modelled here.</p>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
const PRESETS = {
  article: {
    label: "Where talks stand, mid-July",
    groups: [
      { name: "The Winterless Council", ids: ["farnorth", "whangarei"] },
      { name: "The Fruit Bowl", ids: ["hastings", "napier", "chb"] },
      { name: "The Sunrise Coast", ids: ["whakatane", "kawerau", "opotiki"] },
      { name: "Megatron", ids: ["waikatod", "hamilton", "waipa", "swaikato", "taupo"] },
      { name: "Kiwiana Country", ids: ["otorohanga", "waitomo"] },
      { name: "Stratford–South Taranaki", ids: ["stratford", "staranaki"] },
      { name: "Wellington metro", ids: ["wellington", "hutt", "porirua", "upperhutt"] },
      { name: "The Wairarapa Three", ids: ["masterton", "carterton", "swairarapa"] },
      { name: "Wine & Whales", ids: ["marlborough", "kaikoura"] },
      { name: "The Coast", ids: ["buller", "grey", "westland"] },
      { name: "Aoraki Council", ids: ["timaru", "mackenzie", "waimate", "waitaki"] },
      { name: "Rural Southland", ids: ["southlandd", "gore"] },
    ],
  },
  wgtnOne: {
    label: "Wellington: one authority",
    groups: [
      { name: "Greater Wellington", ids: ["wellington", "hutt", "upperhutt", "porirua", "kapiti", "masterton", "carterton", "swairarapa"] },
    ],
  },
  megatron: { label: "Megatron", groups: [{ name: "Megatron", ids: ["thames", "hauraki", "waikatod", "matamata", "hamilton", "waipa", "otorohanga", "swaikato", "waitomo", "taupo"] }] },
  regional: {
    label: "One council per region",
    groups: [
      { name: "Northlandia", ids: ["farnorth", "whangarei", "kaipara"] },
      { name: "Megatron", ids: ["thames", "hauraki", "waikatod", "matamata", "hamilton", "waipa", "otorohanga", "swaikato", "waitomo", "taupo"] },
      { name: "Plentyville", ids: ["wbop", "tauranga", "rotorua", "whakatane", "kawerau", "opotiki"] },
      { name: "The Fruit Bowl", ids: ["wairoa", "hastings", "napier", "chb"] },
      { name: "The Naki", ids: ["newplymouth", "stratford", "staranaki"] },
      { name: "Windfarm Country", ids: ["ruapehu", "whanganui", "rangitikei", "manawatu", "palmy", "tararua", "horowhenua"] },
      { name: "Wellywood", ids: ["kapiti", "porirua", "upperhutt", "hutt", "wellington", "masterton", "carterton", "swairarapa"] },
      { name: "The Sunbelt", ids: ["tasman", "nelson"] },
      { name: "The Coast", ids: ["buller", "grey", "westland"] },
      { name: "Cantropolis", ids: ["kaikoura", "hurunui", "waimakariri", "christchurch", "selwyn", "ashburton", "timaru", "mackenzie", "waimate"] },
      { name: "Otagopolis", ids: ["waitaki", "centralotago", "qldc", "dunedin", "clutha"] },
      { name: "Southlandia", ids: ["southlandd", "gore", "invercargill"] },
    ],
  },
};

// Build a preset's state. Used for the opening view as well as the buttons, so
// first-time visitors land on a populated map rather than an empty board.
function buildPreset(key) {
  const p = PRESETS[key];
  const groups = p.groups.map((pg, i) => ({ id: "p" + key + i, name: pg.name, color: COLORS[i % COLORS.length] }));
  const assignment = {};
  p.groups.forEach((pg, i) => pg.ids.forEach((cid) => { if (BY_ID[cid] && !BY_ID[cid].locked) assignment[cid] = groups[i].id; }));
  return { groups, assignment, activeId: groups[0].id };
}
const OPENING = buildPreset("article");

let uid = 1;
const newId = () => "g" + uid++;
const STORE_KEY = "nz-amalgamator-v9";
// Rates BILLS are GST-inclusive (what a ratepayer is charged); rates REVENUE in
// annual reports is GST-exclusive. Everything here is put on a GST-INCLUSIVE
// footing so the four bases are comparable and match what people actually pay.
const GST = 1.15;

export default function App() {
  const [groups, setGroups] = useState(OPENING.groups);
  const [assignment, setAssignment] = useState(OPENING.assignment);
  const [activeId, setActiveId] = useState(OPENING.activeId);
  const [suggestIdx, setSuggestIdx] = useState({});
  const [year, setYear] = useState("r26");
  const [savings, setSavings] = useState(0);
  const [basis, setBasis] = useState("bill"); // "bill" | "unit" | "household" | "person" — bill is the default: it is the only figure that is an actual bill
  const [loaded, setLoaded] = useState(false);
  const [sharedView, setSharedView] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copyMsg, setCopyMsg] = useState("");
  const saveTimer = useRef(null);
  const dirty = useRef(false); // user has interacted before/while hydration ran

  // Validate a restored blob before trusting it: unique group ids, valid colours,
  // assignments pointing at real councils and real groups. Returns null if unusable.
  const validateState = (s) => {
    try {
      if (!s || !Array.isArray(s.groups) || !s.groups.length) return null;
      const seen = new Set();
      for (const g of s.groups) {
        if (!g || typeof g.id !== "string" || typeof g.name !== "string" || typeof g.color !== "string") return null;
        if (seen.has(g.id)) return null; // duplicate id -> duplicate React keys
        seen.add(g.id);
      }
      const gids = seen;
      const asg = {};
      if (s.assignment && typeof s.assignment === "object") {
        for (const [cid, gid] of Object.entries(s.assignment)) {
          if (BY_ID[cid] && !BY_ID[cid].locked && gids.has(gid)) asg[cid] = gid;
        }
      }
      const activeId = gids.has(s.activeId) ? s.activeId : s.groups[0].id;
      const nextUid = Number.isFinite(s.uid) ? s.uid : s.groups.length + 1;
      return { groups: s.groups, assignment: asg, activeId, uid: nextUid };
    } catch (e) { return null; }
  };

  useEffect(() => {
    try {
      // A shared link wins over saved state — and we do NOT persist it, so
      // opening someone else's map never overwrites your own.
      const h = typeof window !== "undefined" ? window.location.hash : "";
      const m = /[#&]m=([^&]+)/.exec(h || "");
      if (m) {
        const v = decodeMap(decodeURIComponent(m[1]));
        if (v) {
          setGroups(v.groups);
          setAssignment(v.assignment);
          setActiveId(v.groups[0].id);
          setBasis(v.basis);
          setYear(v.year);
          uid = v.groups.length + 1;
          setSharedView(true);
          setLoaded(true);
          return;
        }
      }
      const raw = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem(STORE_KEY) : null;
      if (raw && !dirty.current) {
        const v = validateState(JSON.parse(raw));
        if (v) {
          setGroups(v.groups);
          setAssignment(v.assignment);
          setActiveId(v.activeId);
          uid = v.uid;
        }
      }
    } catch (e) { /* fresh start */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded || sharedView) return; // never persist a map you're only viewing
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && window.localStorage)
          window.localStorage.setItem(STORE_KEY, JSON.stringify({ groups, assignment, activeId, uid }));
      } catch (e) { /* non-fatal (private mode / quota) */ }
    }, 500);
  }, [groups, assignment, activeId, loaded, sharedView]);

  const clearHash = () => {
    try {
      if (typeof window !== "undefined" && window.history && /^https?:$/.test(window.location.protocol))
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } catch (e) { /* ignore */ }
  };

  // Adopt the shared map as your own (this is the point it starts saving).
  const keepShared = () => { setSharedView(false); dirty.current = true; clearHash(); };

  // Discard it and go back to whatever you had saved.
  const backToMine = () => {
    clearHash();
    setSharedView(false);
    try {
      const raw = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem(STORE_KEY) : null;
      const v = raw ? validateState(JSON.parse(raw)) : null;
      if (v) { setGroups(v.groups); setAssignment(v.assignment); setActiveId(v.activeId); uid = v.uid; return; }
    } catch (e) { /* fall through */ }
    const g = { id: newId(), name: "New council 1", color: COLORS[0] };
    setGroups([g]); setAssignment({}); setActiveId(g.id);
  };

  const makeShareLink = async () => {
    const code = encodeMap(groups, assignment, basis, year);
    if (!code) { setCopyMsg("Add some councils to a group first."); setShareUrl(""); return; }
    let url = `#m=${code}`;
    try {
      if (typeof window !== "undefined" && /^https?:$/.test(window.location.protocol))
        url = `${window.location.origin}${window.location.pathname}#m=${code}`;
    } catch (e) { /* keep fragment-only */ }
    setShareUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      setCopyMsg("Link copied — anyone who opens it sees this exact map.");
    } catch (e) {
      setCopyMsg("Copy the link below to share this map.");
    }
  };

  // Per-council "now" figure under the chosen basis.
  //  person    -> rates revenue / population
  //  household -> rates revenue / households (real counts, not a multiplier)
  //  bill      -> the council's own published average residential rates bill
  const perValue = (c, b = basis) => {
    if (b === "bill") return c.avgRes ?? null;            // already GST-inclusive
    if (b === "household") return c.hh ? (c[year] * GST) / c.hh : null;
    if (b === "unit") return c.ru ? (c[year] * GST) / c.ru : null;
    return (c[year] * GST) / c.pop;
  };
  const active = groups.find((g) => g.id === activeId) || null;

  const membersOf = useMemo(() => {
    const map = {};
    groups.forEach((g) => (map[g.id] = []));
    COUNCILS.forEach((c) => { const gid = assignment[c.id]; if (gid && map[gid]) map[gid].push(c); });
    return map;
  }, [groups, assignment]);

  const stats = useMemo(() => {
    const byGroup = {};
    let placed = 0;
    groups.forEach((g) => {
      const m = membersOf[g.id] || [];
      byGroup[g.id] = { count: m.length, pop: m.reduce((s, c) => s + c.pop, 0), area: m.reduce((s, c) => s + c.area, 0) };
      placed += m.length;
    });
    const nonEmpty = groups.filter((g) => byGroup[g.id].count > 0);
    const valid = groups.filter((g) => byGroup[g.id].count >= 2); // a real proposal = 2+ councils
    let biggest = null;
    valid.forEach((g) => { if (!biggest || byGroup[g.id].pop > byGroup[biggest.id].pop) biggest = g; });
    const eligible = COUNCILS.filter((c) => !c.locked).length;
    return { byGroup, placed, remaining: eligible - placed, nonEmpty, valid, biggest, eligible };
  }, [groups, membersOf]);

  const ratesFor = (members, b = basis) => {
    if (members.length < 2) return null;
    // Savings only trims a revenue-derived take. It must NOT touch published bills,
    // which aren't a pool to cut — applying it there hid a haircut behind a hidden slider.
    const save = b === "bill" ? 1 : 1 - savings / 100;

    let blended = null;
    if (b === "bill") {
      const withBill = members.filter((m) => m.avgRes != null && m.hh);
      if (withBill.length < 2) return { blended: null, rows: [], usable: withBill.length };
      const wsum = withBill.reduce((s, m) => s + m.avgRes * m.hh, 0);
      const hh = withBill.reduce((s, m) => s + m.hh, 0);
      blended = wsum / hh;
    } else if (b === "household") {
      const withHh = members.filter((m) => m.hh);
      if (withHh.length < 2) return { blended: null, rows: [], usable: withHh.length };
      const rev = withHh.reduce((s, m) => s + m[year], 0) * save * GST;
      blended = rev / withHh.reduce((s, m) => s + m.hh, 0);
    } else if (b === "unit") {
      const withRu = members.filter((m) => m.ru);
      if (withRu.length < 2) return { blended: null, rows: [], usable: withRu.length };
      const rev = withRu.reduce((s, m) => s + m[year], 0) * save * GST;
      blended = rev / withRu.reduce((s, m) => s + m.ru, 0);
    } else {
      const pop = members.reduce((s, m) => s + m.pop, 0);
      const rev = members.reduce((s, m) => s + m[year], 0) * save * GST;
      blended = rev / pop;
    }

    const rows = members
      .map((m) => {
        const now = perValue(m, b);
        if (now == null || blended == null) return { m, now, then: blended, delta: null, pctDelta: null };
        return { m, now, then: blended, delta: blended - now, pctDelta: ((blended - now) / now) * 100 };
      })
      .sort((a, b2) => (b2.delta ?? -Infinity) - (a.delta ?? -Infinity));

    const missing = rows.filter((r) => r.delta == null).length;
    return { blended, rows, missing };
  };

  const activeMembers = active ? membersOf[active.id] || [] : [];

  // Share of the region(s) this group spans, and who it could carry along.
  const mandate = useMemo(() => {
    if (activeMembers.length < 2) return null;
    const regions = [...new Set(activeMembers.map((m) => m.region))];
    const base = regions.reduce((s, r) => s + (REGION_POP[r] || 0), 0);
    if (!base) return null;
    const held = activeMembers.reduce((s, m) => s + m.pop, 0);
    const inGroup = new Set(activeMembers.map((m) => m.id));
    const others = COUNCILS.filter((c) => !c.locked && regions.includes(c.region) && !inGroup.has(c.id));
    return { pct: (held / base) * 100, regions, others, majority: held / base > 0.5 };
  }, [activeMembers]);
  const candidates = useMemo(() => nameCandidates(activeMembers), [activeMembers]);
  const activeRates = useMemo(() => ratesFor(activeMembers), [activeMembers, year, savings, basis]);

  // Cross-check the current basis against the residential-bill basis. Where a council
  // moves in the opposite direction under the two measures, say so — this is the
  // Porirua case: dearest on residential bills, mid-pack once commercial rates are in.
  const divergence = useMemo(() => {
    if (basis === "bill" || !activeMembers.length) return null;
    const cur = ratesFor(activeMembers, basis);
    const bill = ratesFor(activeMembers, "bill");
    if (!cur || !bill || cur.blended == null || bill.blended == null) return null;
    const billBy = Object.fromEntries(bill.rows.map((r) => [r.m.id, r]));
    const flips = cur.rows
      .filter((r) => r.delta != null && billBy[r.m.id] && billBy[r.m.id].delta != null)
      .filter((r) => Math.sign(r.delta) !== Math.sign(billBy[r.m.id].delta))
      .map((r) => ({ m: r.m, here: r.delta, onBill: billBy[r.m.id].delta }));
    return flips.length ? flips : null;
  }, [activeMembers, basis, year, savings]);

  const tapCouncil = (c) => {
    if (c.locked || !active) return;
    dirty.current = true;
    setAssignment((a) => { const n = { ...a }; if (n[c.id] === active.id) delete n[c.id]; else n[c.id] = active.id; return n; });
  };
  const addGroup = () => { dirty.current = true; const g = { id: newId(), name: `New council ${groups.length + 1}`, color: COLORS[groups.length % COLORS.length] }; setGroups((gs) => [...gs, g]); setActiveId(g.id); };
  const dissolveGroup = (gid) => {
    dirty.current = true;
    setAssignment((a) => { const n = {}; Object.entries(a).forEach(([k, v]) => { if (v !== gid) n[k] = v; }); return n; });
    setGroups((gs) => {
      const next = gs.filter((g) => g.id !== gid);
      if (!next.length) { const g = { id: newId(), name: "New council 1", color: COLORS[0] }; setActiveId(g.id); return [g]; }
      if (activeId === gid) setActiveId(next[0].id);
      return next;
    });
  };
  const renameGroup = (gid, name) => { dirty.current = true; setGroups((gs) => gs.map((g) => (g.id === gid ? { ...g, name } : g))); };
  const recolorGroup = (gid, color) => { dirty.current = true; setGroups((gs) => gs.map((g) => (g.id === gid ? { ...g, color } : g))); };
  // Suggestion index is per-group, so group B doesn't start mid-list.
  const suggestName = () => {
    if (!active || !candidates.length) return;
    const i = suggestIdx[active.id] || 0;
    renameGroup(active.id, candidates[i % candidates.length]);
    setSuggestIdx((s) => ({ ...s, [active.id]: i + 1 }));
  };
  const applyPreset = (key) => {
    dirty.current = true;
    const b = buildPreset(key);
    setGroups(b.groups); setAssignment(b.assignment); setActiveId(b.activeId); setSuggestIdx({});
  };
  const clearAll = () => {
    dirty.current = true;
    const g = { id: newId(), name: "New council 1", color: COLORS[0] };
    setGroups([g]); setAssignment({}); setActiveId(g.id);
    setSuggestIdx({}); setSavings(0); setYear("r26"); setBasis("bill");
  };

  const groupById = useMemo(() => Object.fromEntries(groups.map((g) => [g.id, g])), [groups]);
  const isBill = basis === "bill";
  const unit = basis === "household" ? "per residential property" : basis === "unit" ? "per rating unit" : isBill ? "avg residential bill" : "per person";
  const unitShort = basis === "household" ? "/prop" : basis === "unit" ? "/unit" : isBill ? " bill" : "/pp";
  const yearLabel = year === "r24" ? "2023/24 actual" : "2025/26 forecast";
  const pieceValue = (c) => { const v = perValue(c); return v == null ? "—" : money(v); };
  // A council's data-vintage caveat, shown only where it actually bites: Buller's
  // older revenue only affects the 2023/24-actual revenue bases, not forecast or bill.
  const vintageNote = (c) => (c.r24note && year === "r24" && basis !== "bill" ? c.r24note : "");

  const renderRegion = (region) => {
    const members = COUNCILS.filter((c) => c.region === region);
    return (
      <section key={region} className="region">
        <div className="regionHead">
          <span className="regionName">{region}</span>
          <span className="regionCount">{members.length === 1 ? "1 council" : `${members.length} councils`}</span>
        </div>
        <div className="board">
          {members.map((c) => {
            const gid = assignment[c.id];
            const g = gid ? groupById[gid] : null;
            const bg = c.locked ? "#22343A" : g ? g.color : "#E7DCC2";
            const fg = c.locked ? "#9FB6BC" : g ? textOn(g.color) : "#4A4234";
            const inActive = !!(g && active && g.id === active.id);
            return (
              <div key={c.id} className="cell">
                <div className={"pieceWrap" + (inActive ? " lift" : "")}>
                  <button
                    className={"piece" + (c.locked ? " locked" : "")}
                    style={{ background: bg, color: fg }}
                    onClick={() => tapCouncil(c)}
                    disabled={c.locked || !loaded}
                    aria-pressed={c.locked ? undefined : inActive}
                    aria-label={`${c.name}, population ${fmtPop(c.pop)}, ${unit} ${pieceValue(c)}${c.locked ? ", already amalgamated in 2010, not selectable" : inActive ? `, in the active council ${active.name}` : g ? `, in ${g.name}` : ", not yet grouped"}`}
                  >
                    <span className="pieceName">{c.name}</span>
                    <span className="piecePop">{c.locked ? "merged 2010" : pieceValue(c)}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="app">
      <style>{CSS}</style>

      {sharedView && (
        <div className="sharedBanner">
          <span>You're looking at a <strong>shared map</strong>. Your own map is saved and untouched.</span>
          <span className="sharedActions">
            <button className="sharedKeep" onClick={keepShared}>Keep this one</button>
            <button className="sharedBack" onClick={backToMine}>Back to mine</button>
          </span>
        </div>
      )}

      <header className="masthead">
        <div className="stamp">Proposals due<br />9 Aug 2026</div>
        <p className="kicker">Local government reform · Aotearoa New Zealand</p>
        <h1>The Amalgamator</h1>
        <p className="standfirst">
          Every non-Auckland council has been told to team up with its neighbours — or have a merger imposed on it.
          Pick a new council, tap the pieces to build it, then see who runs the place and whose rates move.
        </p>
        <div className="presets">
          <button onClick={() => applyPreset("article")}>{PRESETS.article.label}</button>
          <button onClick={() => applyPreset("wgtnOne")}>{PRESETS.wgtnOne.label}</button>
          <button onClick={() => applyPreset("megatron")}>{PRESETS.megatron.label}</button>
          <button onClick={() => applyPreset("regional")}>{PRESETS.regional.label}</button>
          <button className="ghost" onClick={clearAll}>Start again</button>
          <button className="shareBtn" onClick={makeShareLink}>Share this map</button>
        </div>
        {(shareUrl || copyMsg) && (
          <div className="sharePanel">
            <p className="shareMsg">{copyMsg}</p>
            {shareUrl && (
              <input
                className="shareInput"
                readOnly
                value={shareUrl}
                onFocus={(e) => e.target.select()}
                aria-label="Shareable link to this map"
              />
            )}
          </div>
        )}
        <p className="presetNote">
          The opening map is a snapshot of reporting in late July 2026, not an official proposal — and a council can be
          backing more than one option at once, which this model can't show. Proposals are due 9 August. Objecting isn't
          the same as escaping: check the regional mandate figure on any group you build.
        </p>
      </header>

      <div className="tray">
        <div className="trayLabel">Your new councils — tap one to make it the active piece colour</div>
        <div className="chips">
          {groups.map((g) => {
            const s = stats.byGroup[g.id];
            return (
              <button key={g.id} className={"chip" + (g.id === activeId ? " chipActive" : "")} style={{ "--c": g.color }} onClick={() => setActiveId(g.id)} aria-pressed={g.id === activeId}>
                <span className="dot" />
                <span className="chipName">{g.name}</span>
                <span className="chipMeta">{s.count > 0 ? `${s.count} · ${fmtPop(s.pop)}` : "empty"}</span>
              </button>
            );
          })}
          <button className="chip addChip" onClick={addGroup}>+ New council</button>
        </div>

        {active && (
          <div className="editor">
            <div className="nameRow">
              <input className="nameInput" value={active.name} onChange={(e) => renameGroup(active.id, e.target.value)} aria-label="Council name" />
              <button className="suggest" onClick={suggestName} disabled={!candidates.length}>{candidates.length ? "Name it for me" : "Add 2 councils first"}</button>
            </div>
            <div className="swatches">
              {COLORS.map((col) => (<button key={col} className={"swatch" + (col === active.color ? " swatchOn" : "")} style={{ background: col }} onClick={() => recolorGroup(active.id, col)} aria-label={`Set colour ${col}`} aria-pressed={col === active.color} />))}
            </div>

            {activeMembers.length >= 2 ? (
              <>
                <div className="editorRow">
                  <span className="verdict">Valid proposal · {activeMembers.length} councils · {fmtPop(stats.byGroup[active.id].pop)} people · {stats.byGroup[active.id].area.toLocaleString("en-NZ")} km²</span>
                  <button className="dissolve" onClick={() => dissolveGroup(active.id)}>Dissolve</button>
                </div>
                {(() => {
                  const islands = new Set(activeMembers.map((m) => (REGIONS_S.includes(m.region) ? "S" : "N")));
                  const regions = new Set(activeMembers.map((m) => m.region));
                  if (islands.size > 1) return <p className="nudge">Heads up: this group spans both islands — amalgamations are meant to be between neighbours, but you're free to test anything.</p>;
                  if (regions.size >= 3) return <p className="nudge">This spans {regions.size} regions — a stretch geographically, though the tool won't stop you.</p>;
                  return null;
                })()}

                <div className="shareHead">Population share</div>
                <ShareBar members={activeMembers} color={active.color} />

                {mandate && (
                  <div className={"mandate" + (mandate.majority ? " mandateYes" : "")}>
                    <div className="mandateTop">
                      <span className="mandateHead">Regional mandate</span>
                      <span className="mandatePct">{mandate.pct.toFixed(0)}%</span>
                    </div>
                    <p className="mandateBody">
                      {mandate.majority ? (
                        <>
                          More than half of {mandate.regions.length === 1 ? mandate.regions[0] : "the regions"} by
                          population. Under the reform, a coalition on more than half a region's population can lodge a
                          proposal covering the whole region — including councils that object.{" "}
                          {mandate.others.length > 0 ? (
                            <>That would sweep in {mandate.others.length} council{mandate.others.length > 1 ? "s" : ""} not in this group: {mandate.others.map((c) => c.name).join(", ")}.</>
                          ) : (<>Every council in the region is already in this group.</>)}
                        </>
                      ) : (
                        <>
                          Under half of {mandate.regions.length === 1 ? mandate.regions[0] : "the regions"} by
                          population, so this group could not lodge a proposal that carries unwilling neighbours with it.
                        </>
                      )}
                    </p>
                  </div>
                )}

                <div className="shareHead">Whose rates move</div>
                <div className="rates">
                  <div className="basisGroup">
                    <span className="basisTier">Closest to a real bill</span>
                    <div className="basis">
                      <button className={"basisBtn" + (basis === "bill" ? " basisOn" : "")} onClick={() => setBasis("bill")} aria-pressed={basis === "bill"}>Avg residential bill</button>
                    </div>
                    <span className="basisTier">Normalisations — not bills</span>
                    <div className="basis">
                      {[["unit", "Per rating unit"], ["household", "Per residential property"], ["person", "Per person"]].map(([k, l]) => (
                        <button key={k} className={"basisBtn" + (basis === k ? " basisOn" : "")} onClick={() => setBasis(k)} aria-pressed={basis === k}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <div className="blended">
                    <span className="blendedLabel">Blended<br />{unit}</span>
                    <span className="blendedValue">{money(activeRates.blended)}</span>
                  </div>
                  <p className="scopeLine">
                    {isBill
                      ? "What an average home pays. Residential properties only — no commercial or industrial rates."
                      : basis === "unit"
                      ? "The whole rates take — including commercial, industrial and targeted rates — divided across every rateable property. Higher than a household bill wherever there's a big commercial base."
                      : basis === "household"
                      ? "The whole rates take — including commercial and industrial rates — divided by residential properties. Counts every house and bach whether or not anyone lives in it, so it is not a per-household figure."
                      : "The whole rates take — including commercial and industrial rates — divided by residents. Not what anyone is billed."}
                  </p>
                  {!isBill && (
                    <div className="years">
                      {[["r26", "2025/26 forecast"], ["r24", "2023/24 actual"]].map(([k, l]) => (
                        <button key={k} className={"yearBtn" + (year === k ? " yearOn" : "")} onClick={() => setYear(k)} aria-pressed={year === k}>{l}</button>
                      ))}
                    </div>
                  )}
                  {!isBill && (
                    <div className="controls">
                      <label className="slider">
                        <span>Hypothetical trim to total rates take: <b>{savings}%</b></span>
                        <input type="range" min="0" max="15" step="1" value={savings} onChange={(e) => { dirty.current = true; setSavings(+e.target.value); }} />
                      </label>
                      <p className="ratesNote">
                        Mergers cost money before they save any. MartinJenkins estimated in July 2026 that establishing a
                        Wellington metro authority would cost about $269m up front against $930m of savings spread over
                        25 years; a Wairarapa authority $42m to establish, with the loss of Wellington subsidies capable
                        of wiping out its $170m of savings; and a Horowhenua–Kāpiti merger $58m to establish against
                        $240m. This slider models none of that — it just trims the take.
                      </p>
                    </div>
                  )}
                  {divergence && (
                    <div className="diverge">
                      <strong>These measures disagree.</strong>{" "}
                      {divergence.slice(0, 2).map((d, i) => (
                        <span key={d.m.id}>
                          {i > 0 ? " " : ""}On residential bills <b>{d.m.name}</b> {d.onBill < 0 ? "falls" : "rises"} {signed(d.onBill)}, but on this measure it {d.here < 0 ? "falls" : "rises"} {signed(d.here)}.
                        </span>
                      ))}{" "}
                      {divergence.length > 2 ? `(${divergence.length - 2} more also flip.) ` : ""}
                      The measures differ because the total rates take is spread over all rateable property — commercial, industrial and farm land included — while a residential bill is only what a home is charged. Where a district has little commercial property, its households carry more of the load than the per-property average suggests. For what a homeowner actually pays, use the bill basis.
                    </div>
                  )}
                  {activeRates.blended == null ? (
                    <p className="ratesNote">Fewer than two of these councils supplied an average residential bill, so there's nothing to blend. Try per person, per residential property or per rating unit.</p>
                  ) : (
                    <ul className="deltas">
                      {activeRates.rows.map(({ m, now, then, delta, pctDelta }) => {
                        if (delta == null) {
                          const reason = isBill
                            ? (m.id === "chathams" ? "Not in the Ratepayers' Report" : "Council didn't supply an average bill")
                            : basis === "unit" ? "Not in the rating-units dataset"
                            : (m.id === "chathams" ? "Not in the property-count dataset" : "No property count");
                          return (
                            <li key={m.id} className="delta">
                              <div className="deltaTop">
                                <span className="deltaName">{m.name}</span>
                                <span className="deltaVal muted">no data</span>
                              </div>
                              <div className="deltaFoot">{reason}{vintageNote(m) ? " · " + vintageNote(m) : ""}</div>
                            </li>
                          );
                        }
                        const cls = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
                        const flag = basis === "unit" && m.ruStatus ? ` · ${m.ruStatus} count` : "";
                        // How much the whole-take-per-property figure exceeds the residential
                        // bill: effectively the commercial/targeted-rates loading.
                        const load = basis === "unit" && m.avgRes && m.ru ? ((m[year] * GST) / m.ru) / m.avgRes : null;
                        return (
                          <li key={m.id} className="delta">
                            <div className="deltaTop">
                              <span className="deltaName">{m.name}</span>
                              <span className={"deltaVal " + cls}>{signed(delta)}<span className="deltaPct"> {delta > 0 ? "+" : delta < 0 ? "−" : "±"}{Math.abs(pctDelta).toFixed(0)}%</span></span>
                            </div>
                            <div className="deltaTrack">
                              <div className="deltaZero" />
                              {delta !== 0 && <div className={"deltaFill " + cls} style={{ width: Math.min(50, Math.abs(pctDelta)) + "%" }} />}
                            </div>
                            <div className="deltaFoot">{money(now)} → {money(then)} {unit}{flag}{vintageNote(m) ? " · " + vintageNote(m) : ""}
                              {load != null && <span className={"load" + (load >= 1.35 ? " loadHi" : "")}> · all-property average is {load.toFixed(2)}× the residential bill</span>}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <p className="ratesNote">
                    {isBill ? (
                      <>Each council's own published average residential rates bill (2024/25), blended across the group
                      weighted by household count. Closest thing to a real bill here — but "average" hides a wide spread
                      within any district, the weighting denominator is an approximation, and a merger would set new
                      differentials and phase them in over years. Western Bay of Plenty, Westland and Waitaki didn't
                      supply a figure and Chatham Islands isn't in the report, so those show as no data.</>
                    ) : basis === "household" ? (
                      <>{yearLabel} rates revenue divided by the number of residential properties. Note this counts
                      dwellings, including holiday homes with nobody living in them — in bach districts like
                      Thames-Coromandel there are roughly twice as many dwellings as resident households, so this is a
                      per-property figure and not a per-household one. Direction of travel, not a bill.</>
                    ) : basis === "unit" ? (
                      <>{yearLabel} rates revenue divided by <strong>rating units</strong> — every separately rateable
                      property (homes, farms, commercial sites, baches). A rough per-property normalisation: real bills
                      use land or capital value, targeted rates, uniform charges and differentials, so this isn't an
                      actual bill. Some counts are older, projected, draft or a proxy (flagged on the rows). Direction of
                      travel only.</>
                    ) : (
                      <>{yearLabel} rates revenue spread evenly across residents. Rates aren't levied per head — they're
                      on property value — and mergers phase differentials in over years, so this is a normalisation, not
                      a bill. All figures use 2024 population, including the 2025/26 forecast — so for fast-growing
                      districts the forecast per-person figure runs high: about 8% for Selwyn, 6% for Hamilton, against
                      almost nothing for Wellington City or Nelson. That gap flatters slow-growing districts in any
                      comparison.</>
                    )}{" "}
                    <span className="muted">Territorial-council figures only — the separate regional-council rates layer isn't included, and the four existing unitary councils (Gisborne, Nelson, Tasman, Marlborough) already fold regional functions in, so they aren't strictly like-for-like.{!isBill && savings > 0 ? " The trim is a hypothetical cut to the whole rates take, not an evidenced merger-savings estimate." : ""}</span>
                  </p>

                  <details className="caveat">
                    <summary>Why the change shown here may never arrive as shown</summary>
                    <p>
                      Changes in rates between the pre- and post-amalgamation periods should be interpreted with
                      caution. Post-amalgamation rating liabilities may have been affected by transitional arrangements,
                      including caps on annual increases or decreases, phased harmonisation of former councils' rating
                      systems, continuation of legacy differentials, targeted rates, and the ring-fencing of legacy debt
                      or service costs. These arrangements may defer, smooth, or otherwise alter the redistribution of
                      rates arising from amalgamation. Consequently, the reported post-amalgamation change may not
                      represent the full effect of the final harmonised rating system or the long-term rating position
                      of each former council area.
                    </p>
                    <p className="caveatApply">
                      Applied to this tool: the figures above are an <em>immediate, fully harmonised</em> redistribution
                      — every property in the merged entity treated identically from day one. No real amalgamation has
                      worked that way. Expect the direction to hold and the timing and size to differ, often for years.
                    </p>
                  </details>
                </div>
              </>
            ) : (
              <div className="editorRow">
                <span className="verdict">{activeMembers.length === 1 ? "Needs at least 2 councils to count as a proposal" : "Tap councils below to add them"}</span>
                <button className="dissolve" onClick={() => dissolveGroup(active.id)}>Dissolve</button>
              </div>
            )}
          </div>
        )}
      </div>

      <main className="map">
        <p className="mapNote">
          {isBill
            ? "Each piece shows the council's own average residential rates bill, 2024/25."
            : basis === "household"
            ? `Each piece shows rates revenue ÷ residential properties, ${yearLabel}.`
            : basis === "unit"
            ? `Each piece shows rates revenue ÷ rating units, ${yearLabel}.`
            : `Each piece shows rates revenue ÷ population, ${yearLabel}.`}
        </p>
        <h2 className="island">Te Ika-a-Māui · North Island</h2>
        {REGIONS_N.map(renderRegion)}
        <h2 className="island">Te Waipounamu · South Island</h2>
        {REGIONS_S.map(renderRegion)}
      </main>

      <footer className="summary">
        <h2>Your map of New Zealand</h2>
        <p>
          {stats.valid.length === 0
            ? `No valid proposals yet — a proposal needs at least two councils. ${stats.nonEmpty.length > 0 ? "You've got some single councils on their own." : ""}`
            : `${stats.valid.length} valid ${stats.valid.length === 1 ? "proposal" : "proposals"} (2+ councils each) covering ${stats.placed} of ${stats.eligible} territorial authorities. ${stats.remaining} still on their own.`}
        </p>
        {stats.biggest && (() => {
          const bp = stats.byGroup[stats.biggest.id].pop, cp = BY_ID.christchurch.pop;
          return (
            <p>
              Your biggest creation is <strong>{stats.biggest.name}</strong> at <strong>{fmtPop(bp)}</strong> people —{" "}
              {bp > cp
                ? "bigger than Christchurch City, currently the largest council outside Auckland."
                : bp === cp
                ? "exactly the size of Christchurch City, the largest council outside Auckland."
                : "still smaller than Christchurch City (412k), the largest council outside Auckland."}
            </p>
          );
        })()}
        {stats.nonEmpty.length > 0 && (
          <ul className="ledger">
            {[...stats.nonEmpty].sort((a, b) => stats.byGroup[b.id].pop - stats.byGroup[a.id].pop).map((g) => {
              const m = membersOf[g.id];
              const top = [...m].sort((a, b) => b.pop - a.pop)[0];
              const shareFrac = top.pop / stats.byGroup[g.id].pop;
              const share = Math.round(shareFrac * 100);
              const r = ratesFor(m);
              return (
                <li key={g.id} className="ledgerRow">
                  <div className="ledgerTop">
                    <span className="ledgerName">{g.name}</span>
                    <span className="ledgerPop">{fmtPop(stats.byGroup[g.id].pop)}{r && r.blended != null ? " · " + money(r.blended) + unitShort : ""}</span>
                  </div>
                  <ShareBar members={m} color={g.color} compact />
                  <div className="ledgerFoot">
                    {m.length === 1 ? (<span className="warn">Only one council — not a valid proposal</span>) : (
                      <>
                        <span>{m.length} councils · {top.name} {shareFrac > 0.5 ? `is ${share}% of residents` : `is the largest at ${share}%`}</span>
                        {(() => {
                          if (!r || r.blended == null) return null;
                          const scored = r.rows.filter((x) => x.delta != null);
                          if (scored.length < 2) return null;
                          const hi = scored[0], lo = scored[scored.length - 1];
                          // Sign-aware: only call it a rise if positive.
                          const hiLabel = hi.delta > 0 ? "biggest rise" : "smallest fall";
                          const loLabel = lo.delta < 0 ? "biggest fall" : "smallest rise";
                          return (
                            <span>
                              {" · "}{hiLabel} <b className={hi.delta >= 0 ? "up" : "down"}>{hi.m.name} {signed(hi.delta)}</b>, {loLabel}{" "}
                              <b className={lo.delta >= 0 ? "up" : "down"}>{lo.m.name} {signed(lo.delta)}</b>
                            </span>
                          );
                        })()}
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <section className="sources">
          <h3>Sources</h3>
          <dl>
            <dt>Rates revenue, 2023/24 actual</dt>
            <dd>Council 2023/24 annual reports — statement of comprehensive revenue and expense, including penalties and remissions.</dd>
            <dt>Rates revenue, 2025/26 forecast</dt>
            <dd>Council 2025/26 annual plans or 2025–34 long-term plans — prospective statement of comprehensive revenue and expense, including penalties and remissions.</dd>
            <dt>Population, 2024</dt>
            <dd>
              Stats NZ, subnational population estimates (Infoshare). The 2024 estimate is used throughout — for
              population shares and for both rates years — so every figure shares one denominator. Estimates are rounded
              (mostly to the nearest 100, and to 500 or 1,000 for the largest councils), so per-person figures for the
              smallest councils carry about ±1%: Chatham Islands ±0.8%, Mackenzie ±0.9%.
            </dd>
            <dt>Land area, 2025</dt>
            <dd>Stats NZ (Datafinder).</dd>
            <dt>Residential property count &amp; average residential rates bill (2024/25)</dt>
            <dd>
              NZ Taxpayers' Union,{" "}
              <a href="https://ratepayersreport.nz/" target="_blank" rel="noreferrer">Ratepayers' Report 2026</a>{" "}
              (year ended 30 June 2025), compiled from council annual reports and LGOIMA requests. A separate,
              non-government source from the figures above. The report labels the property count "households", but it
              behaves as a <strong>dwelling count</strong>: nine bach-heavy districts imply under two residents per
              dwelling (Thames-Coromandel 1.2), which is impossible for occupied households. It is treated here as
              residential properties, not households. Western Bay of Plenty, Westland and Waitaki declined or did not
              supply an average bill; Chatham Islands isn't in the report, so its property count is an estimate.
            </dd>
            <dt>Rating units</dt>
            <dd>
              Best-available rating-unit count per council, compiled from council annual reports, long-term plans and
              regional-council valuation rolls. A rating unit is every separately rateable property — the base councils
              actually levy on. Most counts are confirmed actuals; some are older, projected, draft or a proxy, flagged
              on the comparator rows. Chatham Islands is not in the dataset.
            </dd>
            <dt>Compiled by</dt>
            <dd>
              Department of Internal Affairs,{" "}
              <a href="https://www.dia.govt.nz/local-government-performance-metrics" target="_blank" rel="noreferrer">
                Data release for council profiles – July 2025
              </a>{" "}
              (updated October 2025). Figures cover the 67 territorial authorities; the 11 regional councils are excluded.
            </dd>
            <dt>Who's merging with whom</dt>
            <dd>
              Positions and dates as at 24 July 2026, from Local Democracy Reporting and The Post (Justin Wong), RNZ,
              and MartinJenkins' July 2026 cost analysis. The majority rule described in the regional-mandate box is as
              reported, not legal advice — check the legislation before relying on it.
            </dd>
            <dt>Who's merging with whom</dt>
            <dd>
              Joel MacManus,{" "}
              <a href="https://thespinoff.co.nz/politics/24-07-2026/council-amalgamation-whos-working-together-and-who-is-refusing-to-budge" target="_blank" rel="noreferrer">
                "Council amalgamation: Who's working together and who is refusing to budge?"
              </a>{" "}
              The Spinoff, 24 July 2026.
            </dd>
          </dl>
          <p className="sourceNote">
            <strong>GST:</strong> rates bills are GST-inclusive; rates revenue in annual reports is GST-exclusive.
            Every figure here is shown GST-inclusive (revenue-derived figures are grossed up by 15%) so the four
            measures are comparable and match what a ratepayer is charged.
          </p>
          <p className="sourceNote">
            <strong>Scope:</strong> territorial-council figures only. The 11 regional councils and their separate rates
            layer are excluded, so no figure here is a household's complete rates bill. The four existing unitary
            councils (Gisborne, Nelson, Tasman, Marlborough) already include regional functions, so aren't strictly
            comparable with the rest. Rates revenue is the total take and includes metered water for most councils.
            Buller's 2023/24 actual was unavailable, so its 2021/22 figure stands in (flagged where it affects a result).
            Auckland is locked: it amalgamated in 2010 and sits outside this round.
          </p>
          <p className="sourceNote">
            <strong>What's modelled here, not sourced:</strong> the blended rate, population share, per-household and
            per-rating-unit figures and the rates-trim slider are this tool's own arithmetic. Population share is not
            voting power; the per-property figures are normalisations, not bills, and count properties rather than
            households; and the trim is a hypothetical cut to
            the whole rates take, not an evidenced merger-savings estimate. Presets are illustrative scenarios, not
            official proposals.
          </p>
          <p className="licence">
            This tool is licensed{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC&nbsp;BY&nbsp;4.0</a> —
            reuse or adapt it freely, including commercially, with credit and a link to the licence, and say if you
            changed it. Crown data (DIA, Stats NZ) is separately CC&nbsp;BY&nbsp;4.0; residential property counts and
            average bills are © NZ Taxpayers' Union and carry their own terms. Independent project, not affiliated with
            any of them.{" "}
            <a href="https://github.com/YOUR-USERNAME/the-amalgamator" target="_blank" rel="noreferrer">Source on GitHub</a>.
          </p>
        </section>
      </footer>

      {active && (
        <div className="dock">
          <span className="dockDot" style={{ background: active.color }} />
          <span className="dockName">{active.name}</span>
          <span className="dockMeta">
            {stats.byGroup[active.id].count} · {fmtPop(stats.byGroup[active.id].pop)}{activeRates && activeRates.blended != null ? ` · ${money(activeRates.blended)}${unitShort}` : ""}
          </span>
          <button className="dockUp" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to the top">↑</button>
        </div>
      )}
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

* { box-sizing: border-box; }
.app {
  --ink: #1A2E33; --sea: #DDEBEC; --sand: #E7DCC2; --paper: #F6F1E4;
  --accent: #E4572E; --accent-ink: #B23A18; --up: #B0413E; --down: #2E7D52;
  min-height: 100vh;
  background: radial-gradient(circle at 15% 10%, rgba(255,255,255,0.5), transparent 40%), var(--sea);
  color: var(--ink);
  font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  padding-bottom: 84px;
}
a { color: inherit; }
.muted { opacity: 0.62; }
.up { color: var(--up); }
.down { color: var(--down); }
.flat { color: #6a7a80; }

.masthead { position: relative; padding: 28px 20px 8px; max-width: 760px; margin: 0 auto; }
.stamp { position: absolute; top: 18px; right: 16px; border: 2px solid var(--accent); color: var(--accent); padding: 6px 10px; font-weight: 800; font-size: 11px; line-height: 1.25; text-transform: uppercase; letter-spacing: 0.06em; transform: rotate(6deg); border-radius: 4px; background: rgba(255,255,255,0.55); }
.kicker { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600; opacity: 0.7; margin: 0 0 6px; }
h1 { font-size: clamp(38px, 9vw, 64px); font-weight: 800; margin: 0 0 10px; line-height: 0.95; letter-spacing: -0.02em; }
.standfirst { font-size: 16px; line-height: 1.5; margin: 0 0 16px; max-width: 56ch; }
.presets { display: flex; flex-wrap: wrap; gap: 8px; }
.presets button { font: inherit; font-weight: 600; font-size: 13px; background: var(--ink); color: #fff; border: none; border-radius: 999px; padding: 8px 14px; cursor: pointer; }
.presets button.ghost { background: transparent; color: var(--ink); border: 1.5px solid var(--ink); }
.shareBtn { background: var(--accent-ink) !important; }
.sharePanel { margin-top: 10px; display: grid; gap: 6px; }
.shareMsg { font-size: 12.5px; font-weight: 600; margin: 0; }
.shareInput { font: inherit; font-size: 12px; width: 100%; padding: 8px 9px; border: 1.5px solid rgba(26,46,51,0.35); border-radius: 5px; background: #fff; color: var(--ink); }
.sharedBanner { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; background: var(--ink); color: #fff; padding: 10px 16px; font-size: 13px; line-height: 1.4; }
.sharedActions { display: flex; gap: 8px; margin-left: auto; }
.sharedKeep, .sharedBack { font: inherit; font-size: 12px; font-weight: 700; border-radius: 999px; padding: 6px 12px; cursor: pointer; border: 1.5px solid #fff; white-space: nowrap; }
.sharedKeep { background: #fff; color: var(--ink); }
.sharedBack { background: transparent; color: #fff; }
.presets button:active { transform: scale(0.97); }

.tray { background: var(--paper); border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); padding: 12px 16px 14px; margin-top: 18px; }
.trayLabel { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; opacity: 0.65; margin: 0 auto 8px; max-width: 760px; }
.chips { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; max-width: 760px; margin: 0 auto; }
.chip { font: inherit; font-size: 13px; display: inline-flex; align-items: center; gap: 7px; background: #fff; border: 1.5px solid rgba(26,46,51,0.25); border-radius: 999px; padding: 7px 12px; cursor: pointer; white-space: nowrap; color: var(--ink); }
.chip .dot { width: 12px; height: 12px; border-radius: 50%; background: var(--c); flex: none; }
.chipActive { border-color: var(--ink); box-shadow: 0 0 0 2px var(--ink); }
.chipName { font-weight: 600; max-width: 150px; overflow: hidden; text-overflow: ellipsis; }
.chipMeta { font-size: 11px; opacity: 0.6; }
.addChip { border-style: dashed; font-weight: 600; }

.editor { max-width: 760px; margin: 12px auto 0; display: grid; gap: 9px; }
.nameRow { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.nameInput { font: inherit; font-weight: 700; font-size: 16px; color: var(--ink); border: none; border-bottom: 2px solid rgba(26,46,51,0.35); background: transparent; padding: 4px 2px; flex: 1 1 180px; min-width: 0; }
.nameInput:focus { outline: none; border-bottom-color: var(--ink); }
.suggest { font: inherit; font-size: 12px; font-weight: 700; background: var(--accent-ink); color: #fff; border: none; border-radius: 999px; padding: 7px 13px; cursor: pointer; flex: none; }
.suggest:disabled { background: rgba(26,46,51,0.18); color: rgba(26,46,51,0.55); cursor: default; }
.swatches { display: flex; gap: 6px; flex-wrap: wrap; }
.swatch { width: 22px; height: 22px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; }
.swatchOn { border-color: var(--ink); }
.editorRow { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.verdict { font-size: 13px; font-weight: 600; }
.dissolve { font: inherit; font-size: 12px; font-weight: 600; background: transparent; border: 1.5px solid var(--up); color: var(--up); border-radius: 999px; padding: 5px 11px; cursor: pointer; }

.shareHead { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; opacity: 0.6; margin-top: 2px; }
.share { display: grid; gap: 6px; }
.shareBar { position: relative; display: flex; width: 100%; height: 22px; border: 1.5px solid var(--ink); border-radius: 4px; overflow: hidden; background: #fff; }
.shareCompact .shareBar { height: 13px; border-width: 1px; }
.shareSeg { height: 100%; border-right: 1.5px solid rgba(255,255,255,0.85); }
.shareSeg:last-of-type { border-right: none; }
.shareMid { position: absolute; left: 50%; top: 0; bottom: 0; width: 0; border-left: 2px dashed rgba(26,46,51,0.85); }
.shareLegend { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 12px; }
.shareVerdict { font-size: 13px; line-height: 1.45; margin: 0; }
.shareCaveat { font-size: 11px; line-height: 1.4; opacity: 0.6; margin: 3px 0 0; }
.presetNote { font-size: 11.5px; line-height: 1.45; opacity: 0.62; margin: 8px 0 0; max-width: 60ch; }
.nudge { font-size: 12px; line-height: 1.4; margin: 0; padding: 6px 9px; background: rgba(241,143,1,0.14); border-left: 3px solid #F18F01; border-radius: 3px; }

.rates { display: grid; gap: 10px; }
.blended { display: flex; align-items: center; justify-content: space-between; gap: 10px; border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); padding: 8px 0; }
.blendedLabel { font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; line-height: 1.25; }
.blendedValue { font-size: clamp(30px, 9vw, 44px); font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
.basis { display: flex; gap: 6px; flex-wrap: wrap; }
.basisGroup { display: grid; gap: 5px; }
.basisTier { font-size: 10px; text-transform: uppercase; letter-spacing: 0.09em; font-weight: 700; opacity: 0.55; }
.scopeLine { font-size: 12px; line-height: 1.45; margin: 0; padding: 7px 9px; background: rgba(26,46,51,0.05); border-radius: 4px; }
.diverge { font-size: 12.5px; line-height: 1.5; padding: 9px 11px; background: rgba(241,143,1,0.15); border-left: 3px solid #B23A18; border-radius: 3px; }
.diverge strong { color: #B23A18; }
.caveat { border: 1.5px solid rgba(26,46,51,0.3); border-radius: 5px; background: #fff; padding: 0; }
.caveat summary { font-size: 12px; font-weight: 700; padding: 8px 11px; cursor: pointer; list-style: none; display: flex; align-items: center; gap: 7px; }
.caveat summary::-webkit-details-marker { display: none; }
.caveat summary::before { content: "▸"; font-size: 10px; opacity: 0.6; }
.caveat[open] summary::before { content: "▾"; }
.caveat[open] summary { border-bottom: 1px solid rgba(26,46,51,0.15); }
.caveat p { font-size: 11.5px; line-height: 1.55; margin: 0; padding: 9px 11px 0; opacity: 0.82; }
.caveat p:last-child { padding-bottom: 10px; }
.caveatApply { border-top: 1px dashed rgba(26,46,51,0.2); margin-top: 8px !important; padding-top: 9px !important; opacity: 1 !important; font-weight: 500; }
.mandate { border: 1.5px solid rgba(26,46,51,0.3); border-radius: 5px; padding: 9px 11px; display: grid; gap: 5px; background: #fff; }
.mandateYes { border-color: var(--ink); border-width: 2px; background: rgba(46,125,82,0.08); }
.mandateTop { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.mandateHead { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; opacity: 0.6; }
.mandatePct { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
.mandateYes .mandatePct { color: #2E7D52; }
.mandateBody { font-size: 12.5px; line-height: 1.5; margin: 0; }
.load { opacity: 0.85; }
.loadHi { color: #B23A18; font-weight: 700; opacity: 1; }
.basisBtn { font: inherit; font-size: 12px; font-weight: 700; background: #fff; border: 1.5px solid rgba(26,46,51,0.3); color: var(--ink); border-radius: 999px; padding: 6px 12px; cursor: pointer; }
.basisOn { background: var(--accent-ink); color: #fff; border-color: var(--accent-ink); }
.years { display: flex; gap: 6px; }
.yearBtn { font: inherit; font-size: 12px; font-weight: 600; background: transparent; border: 1.5px solid rgba(26,46,51,0.35); color: var(--ink); border-radius: 999px; padding: 6px 12px; cursor: pointer; }
.yearOn { background: var(--ink); color: #fff; border-color: var(--ink); }
.controls { display: grid; gap: 8px; }
.slider { display: grid; gap: 3px; font-size: 12.5px; }
.slider input { width: 100%; accent-color: var(--accent); }
.toggle { display: flex; align-items: center; gap: 7px; font-size: 12.5px; }
.toggle input { accent-color: var(--accent); width: 16px; height: 16px; }

.deltas { list-style: none; padding: 0; margin: 0; display: grid; gap: 9px; }
.delta { display: grid; gap: 3px; }
.deltaTop { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.deltaName { font-size: 13.5px; font-weight: 700; }
.deltaVal { font-size: 13.5px; font-weight: 800; white-space: nowrap; }
.deltaPct { font-size: 11.5px; font-weight: 600; opacity: 0.75; }
.deltaTrack { position: relative; height: 8px; background: rgba(26,46,51,0.1); border-radius: 4px; overflow: hidden; }
.deltaZero { position: absolute; left: 50%; top: 0; bottom: 0; width: 0; border-left: 1.5px solid rgba(26,46,51,0.55); z-index: 1; }
.deltaFill { position: absolute; top: 0; bottom: 0; }
.deltaFill.up { left: 50%; background: var(--up); border-radius: 0 4px 4px 0; }
.deltaFill.down { right: 50%; background: var(--down); border-radius: 4px 0 0 4px; }
.deltaFoot { font-size: 11.5px; opacity: 0.7; }
.ratesNote { font-size: 11.5px; line-height: 1.45; opacity: 0.72; margin: 0; }

.map { max-width: 760px; margin: 0 auto; padding: 12px 16px 0; }
.mapNote { font-size: 12.5px; opacity: 0.75; margin: 0; }
.island { font-size: 15px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 800; margin: 24px 0 4px; border-bottom: 2px solid var(--ink); padding-bottom: 6px; }
.region { margin-top: 16px; }
.regionHead { display: flex; align-items: baseline; gap: 10px; margin-bottom: 2px; }
.regionName { font-weight: 700; font-size: 14px; }
.regionCount { font-size: 11px; opacity: 0.55; }
.board { display: grid; grid-template-columns: repeat(auto-fill, ${COL_W}px); row-gap: 8px; padding-right: ${PIECE_W - COL_W}px; }
.cell { width: ${COL_W}px; height: ${PIECE_H}px; }
.pieceWrap { width: ${PIECE_W}px; height: ${PIECE_H}px; transition: filter 0.15s, transform 0.15s; }
.pieceWrap.lift { filter: drop-shadow(0 3px 5px rgba(26,46,51,0.35)); transform: translateY(-2px); }
.piece { width: 100%; height: 100%; -webkit-mask-image: ${MASK_URI}; mask-image: ${MASK_URI}; -webkit-mask-size: 100% 100%; mask-size: 100% 100%; border: none; cursor: pointer; font: inherit; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 6px 16px 6px 31px; text-align: left; gap: 2px; transition: transform 0.12s ease, background 0.15s; }
.piece:active { transform: scale(0.96); }
.piece.locked { cursor: default; }
.piece.locked:active { transform: none; }
.piece:disabled { cursor: default; }
.piece.locked { opacity: 0.92; }
.pieceName { font-size: 10.5px; font-weight: 700; line-height: 1.12; text-shadow: 0 1px 1.5px rgba(0,0,0,0.18); }
.piecePop { font-size: 9.5px; font-weight: 600; opacity: 0.85; }
.piece:focus-visible { outline: none; box-shadow: inset 0 0 0 3px rgba(26,46,51,0.8); }

.summary { max-width: 760px; margin: 34px auto 0; padding: 0 20px; }
.summary h2 { font-size: 22px; font-weight: 800; margin: 0 0 8px; }
.summary p { font-size: 15px; line-height: 1.55; margin: 0 0 8px; }
.warn { color: var(--up); font-weight: 600; }
.ledger { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 14px; }
.ledgerRow { display: grid; gap: 5px; }
.ledgerTop { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
.ledgerName { font-weight: 700; font-size: 14px; }
.ledgerPop { font-weight: 700; font-size: 13px; opacity: 0.7; white-space: nowrap; }
.ledgerFoot { font-size: 12px; opacity: 0.85; line-height: 1.45; }

.sources { margin-top: 30px; border-top: 2px solid var(--ink); padding-top: 14px; }
.sources h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 800; margin: 0 0 10px; }
.sources dl { margin: 0; display: grid; gap: 9px; }
.sources dt { font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.65; }
.sources dd { margin: 2px 0 0; font-size: 13px; line-height: 1.5; }
.sourceNote { font-size: 11.5px; line-height: 1.55; opacity: 0.7; margin-top: 14px; }
.licence { font-size: 11.5px; line-height: 1.55; opacity: 0.7; margin-top: 10px; }

.dock { position: fixed; left: 0; right: 0; bottom: 0; z-index: 30; display: flex; align-items: center; gap: 9px; background: var(--ink); color: #fff; padding: 10px 14px; }
.dockDot { width: 14px; height: 14px; border-radius: 50%; flex: none; }
.dockName { font-weight: 700; font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dockMeta { font-size: 12px; opacity: 0.75; margin-left: auto; white-space: nowrap; }
.dockUp { font: inherit; background: rgba(255,255,255,0.15); color: #fff; border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; flex: none; }

@media (prefers-reduced-motion: reduce) {
  .piece, .pieceWrap, .presets button { transition: none; }
  .piece:active, .presets button:active { transform: none; }
}
`;
