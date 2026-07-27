import React, { useState, useEffect, useMemo, useRef } from "react";

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
// Which regions border which, so a scoped board can still offer the neighbours
// a real proposal might reach across (Kāpiti–Horowhenua, Waitaki, Kaikōura).
const REGION_NEIGHBOURS = {
  "Northland": ["Auckland"],
  "Auckland": ["Northland", "Waikato"],
  "Waikato": ["Auckland", "Bay of Plenty", "Manawatū-Whanganui", "Taranaki"],
  "Bay of Plenty": ["Waikato", "Gisborne", "Hawke's Bay", "Manawatū-Whanganui"],
  "Gisborne": ["Bay of Plenty", "Hawke's Bay"],
  "Hawke's Bay": ["Gisborne", "Bay of Plenty", "Manawatū-Whanganui", "Wellington"],
  "Taranaki": ["Waikato", "Manawatū-Whanganui"],
  "Manawatū-Whanganui": ["Taranaki", "Waikato", "Bay of Plenty", "Hawke's Bay", "Wellington"],
  "Wellington": ["Manawatū-Whanganui", "Hawke's Bay"],
  "Nelson-Tasman": ["Marlborough", "West Coast"],
  "Marlborough": ["Nelson-Tasman", "West Coast", "Canterbury"],
  "West Coast": ["Nelson-Tasman", "Marlborough", "Canterbury", "Otago"],
  "Canterbury": ["Marlborough", "West Coast", "Otago"],
  "Otago": ["Canterbury", "West Coast", "Southland"],
  "Southland": ["Otago"],
  "Chatham Islands": [],
};

// Documented cross-boundary options between specific councils, as reported to
// 26 July 2026. These make the linked region appear on a scoped board by
// default, with a label naming why.
const CROSS_LINKS = [
  { a: "kapiti", b: "horowhenua", label: "Kāpiti's northern option with Horowhenua" },
  { a: "tararua", b: "masterton", label: "Tararua's 'go south' option toward Wairarapa" },
  { a: "ruapehu", b: "taupo", label: "northern Ruapehu's Taupō option" },
];

// Councils publicly exploring partners without a committed proposal, and what
// they have actually said. Shown as a status, not a grouping, because none had
// converted talks into a jointly sponsored proposal by 26 July 2026.
const EXPLORING = {
  manawatu: "Prefers Rangitīkei if amalgamation is unavoidable; decided 23 July not to lodge a proposal without committed partners.",
  rangitikei: "Tested three options: the whole Horizons region, a western grouping with Whanganui and Ruapehu, and a rural districts grouping (27%, 26%, 23% support). Decision due 30 July.",
  ruapehu: "Options include Whanganui, Rangitīkei or Manawatū in the south, and Taupō in the north. None selected.",
  tararua: "Weighing 'go west' into Horizons or 'go south' toward Wairarapa; overall prefers a different reform approach.",
  palmy: "In talks with neighbouring councils; no settled configuration. Decision due 5 August.",
  whanganui: "Engaging neighbours; its mayor says the Horizons councils won't have an agreed proposal by 9 August.",
  horowhenua: "No amalgamation partner selected; existing Central Districts Water partnership with Palmerston North and Rangitīkei.",
};

const REGION_POP = {};
COUNCILS.forEach((c) => { if (!c.locked) REGION_POP[c.region] = (REGION_POP[c.region] || 0) + c.pop; });

const IDX_OF = Object.fromEntries(COUNCILS.map((c, i) => [c.id, i]));
const BASIS_CODE = { person: "p", household: "h", unit: "u", bill: "b" };
// "h" (per residential property) was removed from the UI: it divided the whole
// rates take by a dwelling count, muddling the rating base with a residential
// measure. Old share links carrying it fall back to per rating unit.
const CODE_BASIS = { p: "person", h: "unit", u: "unit", b: "bill" };
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
  // Auckland-adjacent / upper North
  { name: "The Kauri Coast", ids: ["kaipara", "farnorth", "whangarei"], need: 2 },
  { name: "Twin Harbours", ids: ["kaipara", "whangarei"], need: 2 },
  { name: "Tail of the Fish", ids: ["farnorth", "whangarei", "kaipara"], need: 3 },
  // Waikato / Coromandel
  { name: "Gold & Gulf", ids: ["thames", "hauraki"], need: 2 },
  { name: "The Pōhutukawa Coast", ids: ["thames", "hauraki"], need: 2 },
  { name: "Hobbiton Shire", ids: ["matamata", "waipa", "swaikato"], need: 2 },
  { name: "The Dairy Belt", ids: ["matamata", "waipa", "swaikato", "hauraki", "waikatod"], need: 3 },
  { name: "King Country", ids: ["otorohanga", "waitomo", "ruapehu"], need: 2 },
  { name: "The Great Lake District", anchor: "taupo", ids: ["taupo", "ruapehu", "swaikato"], need: 1 },
  { name: "Mighty River Council", ids: ["waikatod", "hamilton", "swaikato", "taupo"], need: 3 },
  // Bay of Plenty / Gisborne
  { name: "Kiwifruit Country", ids: ["wbop", "tauranga", "opotiki"], need: 2 },
  { name: "Geyserland", anchor: "rotorua", ids: ["rotorua", "taupo", "whakatane"], need: 1 },
  { name: "Steam & Surf", ids: ["rotorua", "tauranga", "whakatane"], need: 2 },
  { name: "The Eastland Council", ids: ["gisborne", "wairoa", "opotiki"], need: 2 },
  { name: "First Light Council", ids: ["gisborne", "wairoa"], need: 2 },
  { name: "Tairāwhiti Combined", ids: ["gisborne", "wairoa", "opotiki"], need: 2 },
  // Hawke's Bay / east
  { name: "Bay Vintage", ids: ["hastings", "napier", "chb"], need: 2 },
  { name: "The Heretaunga Council", anchor: "hastings", ids: ["hastings", "napier", "chb", "wairoa"], need: 1 },
  // Taranaki / Whanganui
  { name: "Mounga Council", ids: ["newplymouth", "stratford", "staranaki"], need: 2 },
  { name: "Surf Highway", ids: ["newplymouth", "staranaki"], need: 2 },
  { name: "Two Rivers", ids: ["whanganui", "rangitikei"], need: 2 },
  { name: "Volcanic Plateau", ids: ["ruapehu", "taupo", "rangitikei"], need: 2 },
  { name: "Central Plateau Council", ids: ["ruapehu", "taupo", "rangitikei", "swaikato"], need: 2 },
  // Manawatū / Horowhenua
  { name: "The Manawatū Council", ids: ["palmy", "manawatu", "horowhenua", "tararua"], need: 3 },
  { name: "Tararua Council", ids: ["tararua", "manawatu", "horowhenua", "masterton"], need: 2 },
  { name: "Kāpiti–Horowhenua", ids: ["kapiti", "horowhenua"], need: 2 },
  { name: "The Northern Option", ids: ["kapiti", "horowhenua"], need: 2 },
  // Wellington
  { name: "Wellington Metro", anchor: "wellington", ids: ["hutt", "upperhutt", "porirua"], need: 3 },
  { name: "Harbour City Council", anchor: "wellington", ids: ["hutt", "upperhutt", "porirua", "kapiti"], need: 1 },
  { name: "Two Hutts & Friends", ids: ["hutt", "upperhutt", "wellington", "porirua"], need: 3 },
  { name: "The Wairarapa", ids: ["masterton", "carterton", "swairarapa"], need: 2 },
  { name: "Over the Rimutakas", ids: ["masterton", "carterton", "swairarapa"], need: 2 },
  // Top of the south / Marlborough
  { name: "Golden Bay & Beyond", anchor: "tasman", ids: ["tasman", "nelson", "buller"], need: 1 },
  { name: "Top of the South", ids: ["nelson", "tasman", "marlborough"], need: 3 },
  { name: "The Sounds Council", anchor: "marlborough", ids: ["marlborough", "nelson", "tasman"], need: 1 },
  // West Coast
  { name: "Glacier Country", ids: ["westland", "grey"], need: 2 },
  { name: "Coal & Greenstone", ids: ["buller", "grey", "westland"], need: 2 },
  { name: "Te Tai Poutini", ids: ["buller", "grey", "westland"], need: 3 },
  // Canterbury
  { name: "The Braided Rivers", ids: ["ashburton", "selwyn", "waimakariri", "timaru"], need: 3 },
  { name: "Canterbury Plains Council", ids: ["ashburton", "selwyn", "waimakariri", "christchurch", "timaru"], need: 3 },
  { name: "Dark Sky Council", anchor: "mackenzie", ids: ["mackenzie", "waitaki", "timaru"], need: 1 },
  { name: "Whale Coast", ids: ["kaikoura", "hurunui", "marlborough"], need: 2 },
  { name: "South Canterbury", ids: ["timaru", "mackenzie", "waimate"], need: 2 },
  { name: "The Quake Belt", anchor: "christchurch", ids: ["christchurch", "selwyn", "waimakariri", "hurunui", "kaikoura"], need: 2 },
  // Otago / Southland
  { name: "The Remarkables Council", anchor: "qldc", ids: ["qldc", "centralotago"], need: 1 },
  { name: "Central Otago Council", ids: ["centralotago", "qldc", "clutha"], need: 2 },
  { name: "Pinot Country", ids: ["centralotago", "qldc"], need: 2 },
  { name: "Steampunk Shire", anchor: "waitaki", ids: ["waitaki", "centralotago", "waimate"], need: 1 },
  { name: "The Deep South", ids: ["southlandd", "gore", "invercargill", "clutha"], need: 3 },
  { name: "Gorevercargill", ids: ["gore", "invercargill"], need: 2 },
  { name: "Bottom of the World", ids: ["southlandd", "invercargill", "gore", "clutha"], need: 3 },
  { name: "Catlins Coast", ids: ["clutha", "southlandd"], need: 2 },
  { name: "Fiordland Council", anchor: "southlandd", ids: ["southlandd", "qldc", "invercargill"], need: 1 },
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

// ---------------------------------------------------------------------------
// Geographic / cultural touchstones, used to build names when a group has no
// ready-made nickname. Keyed to the council whose patch the feature sits in.
// ---------------------------------------------------------------------------
const FEATURES = {
  farnorth: ["Ninety Mile", "Cape Rēinga"], whangarei: ["Whangārei Heads"], kaipara: ["Kauri"],
  thames: ["Coromandel"], hauraki: ["Hauraki"], waikatod: ["Waikato River"], matamata: ["Kaimai"],
  hamilton: ["Waikato"], waipa: ["Maungatautari"], otorohanga: ["Kiwi House"], swaikato: ["Kinleith"],
  waitomo: ["Glowworm"], taupo: ["Great Lake"], wbop: ["Kiwifruit"], tauranga: ["Mauao"],
  rotorua: ["Geyser", "Te Arawa"], whakatane: ["Whakaari"], kawerau: ["Pūtauaki"], opotiki: ["Sunrise"],
  gisborne: ["First Light", "Tairāwhiti"], wairoa: ["Waikaremoana"], hastings: ["Heretaunga"],
  napier: ["Art Deco"], chb: ["Ruahine"], newplymouth: ["Taranaki Maunga"], stratford: ["Ring Plain"],
  staranaki: ["Surf Highway"], ruapehu: ["Ruapehu", "Volcanic"], whanganui: ["Awa", "River City"],
  rangitikei: ["Rangitīkei"], manawatu: ["Manawatū"], palmy: ["Square"], tararua: ["Tararua"],
  horowhenua: ["Horowhenua"], kapiti: ["Kāpiti Island"], porirua: ["Pauatahanui"], upperhutt: ["Akatarawa"],
  hutt: ["Te Awa Kairangi"], wellington: ["Harbour City", "Windy"], masterton: ["Wairarapa"],
  carterton: ["Daffodil"], swairarapa: ["Palliser"], tasman: ["Abel Tasman", "Golden Bay"],
  nelson: ["Centre of NZ"], marlborough: ["Sounds", "Sauvignon"], buller: ["Pancake Rocks"],
  grey: ["Greenstone"], westland: ["Glacier"], kaikoura: ["Whale"], hurunui: ["Hanmer"],
  waimakariri: ["Waimakariri"], christchurch: ["Garden City", "Ōtautahi"], selwyn: ["Rakaia"],
  ashburton: ["Hakatere"], timaru: ["Caroline Bay"], mackenzie: ["Dark Sky", "Aoraki"],
  waimate: ["Whitehorse"], waitaki: ["Steampunk", "Moeraki"], centralotago: ["Pinot", "Rail Trail"],
  qldc: ["Remarkables", "Whakatipu"], dunedin: ["Ōtepoti", "Albatross"], clutha: ["Catlins"],
  southlandd: ["Fiordland"], gore: ["Brown Trout"], invercargill: ["Bluff", "Southern"],
  chathams: ["Rēkohu"],
};
const SUFFIXES = ["Council", "District", "Coast", "Country", "Region", "Combined"];
function featureNames(members) {
  const sorted = [...members].sort((a, b) => b.pop - a.pop);
  const pool = [];
  sorted.forEach((m) => (FEATURES[m.id] || []).forEach((f) => pool.push(f)));
  if (!pool.length) return [];
  const out = [];
  const seedish = members.length + members.reduce((s, m) => s + m.id.length, 0);
  pool.slice(0, 4).forEach((f, i) => {
    const suf = SUFFIXES[(seedish + i) % SUFFIXES.length];
    out.push(f.endsWith("Council") || f.endsWith("City") ? f : `${f} ${suf}`);
  });
  if (pool.length >= 2) out.push(`${pool[0]} & ${pool[1]}`);
  return out;
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
  // Feature names sit after hand-written nicknames but ahead of raw blends.
  const nicks = nicknamesFor(members);
  const feats = featureNames(members);
  const rest = out.filter((n) => !nicks.includes(n));
  return [...new Set([...nicks, ...feats, ...rest])].filter(Boolean);
}

// ---------------------------------------------------------------------------
function ShareBar({ members, color, compact }) {
  const total = members.reduce((s, m) => s + m.pop, 0) || 1;
  const sorted = [...members].sort((a, b) => b.pop - a.pop);
  const pct = (m) => (m.pop / total) * 100;
  const top = sorted[0], bottom = sorted[sorted.length - 1];
  const barLabel = sorted.slice(0, 3).map((m) => `${m.name} ${Math.round(pct(m))}%`).join(", ") + (sorted.length > 3 ? `, and ${sorted.length - 3} smaller` : "");
  return (
    <div className={"share" + (compact ? " shareCompact" : "")}>
      <div className="shareBar" role="img" aria-label={`Population share: ${barLabel}`}>
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
            {top.pop / total > 0.5 ? (<><strong>{top.name}</strong> would make up {Math.round(pct(top))}% of the merged population on its own, more than everyone else combined.</>)
              : pct(top) >= 35 ? (<><strong>{top.name}</strong> would be the largest share at {Math.round(pct(top))}%, but under half the total; no single district would be an outright majority of residents.</>)
              : (<>No district would exceed {Math.round(pct(top))}% of the merged population. It's spread fairly evenly across {sorted.length} of them.</>)}{" "}
            <span className="muted">{bottom.name} would be {pct(bottom) < 1 ? "under 1" : Math.round(pct(bottom))}%.</span>
          </p>
          <p className="shareCaveat">Population share, not voting power: how councillors, wards and local boards would be arranged is set by each proposal, not modelled here.</p>
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

function LegacyApp() {
  const [groups, setGroups] = useState(OPENING.groups);
  const [assignment, setAssignment] = useState(OPENING.assignment);
  const [activeId, setActiveId] = useState(OPENING.activeId);
  const [suggestIdx, setSuggestIdx] = useState({});
  const [year, setYear] = useState("r26");
  const [savings, setSavings] = useState(0);
  const [basis, setBasis] = useState("bill"); // "bill" | "unit" | "person" — bill is the default: it is the only figure that is an actual bill
  const [loaded, setLoaded] = useState(false);
  const [sharedView, setSharedView] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copyMsg, setCopyMsg] = useState("");
  const [cardFor, setCardFor] = useState(null);
  const [cardImg, setCardImg] = useState(null);
  const [cardMsg, setCardMsg] = useState("");
  const cardCanvas = useRef(null);
  const [step, setStep] = useState(0); // 0 choose region · 1 build · 2 implications · 3 name · 4 share
  const [scope, setScope] = useState(null); // region name, or "ALL"
  const [showNeighbours, setShowNeighbours] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [scenarios, setScenarios] = useState([]); // saved snapshots for comparison (max 3)
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
      const scenarios = Array.isArray(s.scenarios)
        ? s.scenarios.filter((x) => x && typeof x.name === "string" && Array.isArray(x.groups) && x.assignment && typeof x.assignment === "object").slice(0, 3)
        : [];
      return { groups: s.groups, assignment: asg, activeId, uid: nextUid, scenarios };
    } catch (e) { return null; }
  };

  useEffect(() => {
    (async () => {
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
      if (typeof window !== "undefined" && window.storage && !dirty.current) {
        const r = await window.storage.get(STORE_KEY);
        if (r && r.value) {
          const v = validateState(JSON.parse(r.value));
          if (v) { setGroups(v.groups); setAssignment(v.assignment); setActiveId(v.activeId); setScenarios(v.scenarios); uid = v.uid; }
        }
      }
    } catch (e) { /* fresh start */ }
    setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded || sharedView) return; // never persist a map you're only viewing
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        if (typeof window !== "undefined" && window.storage)
          await window.storage.set(STORE_KEY, JSON.stringify({ groups, assignment, activeId, uid, scenarios }));
      } catch (e) { /* non-fatal */ }
    }, 500);
  }, [groups, assignment, activeId, scenarios, loaded, sharedView]);

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
    (async () => {
      try {
        if (typeof window !== "undefined" && window.storage) {
          const r = await window.storage.get(STORE_KEY);
          const v = r && r.value ? validateState(JSON.parse(r.value)) : null;
          if (v) { setGroups(v.groups); setAssignment(v.assignment); setActiveId(v.activeId); setScenarios(v.scenarios); uid = v.uid; return; }
        }
      } catch (e) { /* fall through */ }
      const g = { id: newId(), name: "New council 1", color: COLORS[0] };
      setGroups([g]); setAssignment({}); setActiveId(g.id);
    })();
  };

  // Snapshot the current map as a named scenario (max 3) for side-by-side comparison.
  const saveScenario = () => {
    if (stats.valid.length === 0) { setCopyMsg("Build at least one valid group (2+ councils) before saving a scenario."); return; }
    dirty.current = true;
    setScenarios((sc) => {
      const name = "Scenario " + "ABC"[sc.length % 3];
      const next = [...sc, { name, groups: groups.map((g) => ({ ...g })), assignment: { ...assignment } }];
      return next.slice(-3);
    });
    setShowCompare(true);
  };
  const dropScenario = (i) => { dirty.current = true; setScenarios((sc) => sc.filter((_, k) => k !== i)); };
  const loadScenario = (i) => {
    const sc = scenarios[i]; if (!sc) return;
    dirty.current = true;
    setGroups(sc.groups.map((g) => ({ ...g })));
    setAssignment({ ...sc.assignment });
    setActiveId(sc.groups[0] ? sc.groups[0].id : activeId);
  };

  // Bill-basis outcome per council for any snapshot — fixed basis so columns are comparable.
  const outcomesOf = (snapGroups, snapAssignment) => {
    const byG = {};
    snapGroups.forEach((g) => (byG[g.id] = []));
    COUNCILS.forEach((c) => { const gid = snapAssignment[c.id]; if (gid && byG[gid]) byG[gid].push(c); });
    const out = {};
    Object.values(byG).forEach((members) => {
      if (members.length < 2) return;
      const w = members.filter((m) => m.avgRes != null && m.hh);
      if (w.length < 2) { members.forEach((m) => (out[m.id] = null)); return; }
      const bl = w.reduce((t, m) => t + m.avgRes * m.hh, 0) / w.reduce((t, m) => t + m.hh, 0);
      members.forEach((m) => (out[m.id] = m.avgRes != null ? bl - m.avgRes : null));
    });
    return out;
  };

  const comparison = useMemo(() => {
    if (!scenarios.length) return null;
    const cols = [{ name: "Current", out: outcomesOf(groups, assignment) }, ...scenarios.map((sc) => ({ name: sc.name, out: outcomesOf(sc.groups, sc.assignment) }))];
    const ids = [...new Set(cols.flatMap((c) => Object.keys(c.out)))];
    const rows = ids.map((cid) => ({ c: BY_ID[cid], cells: cols.map((col) => (cid in col.out ? col.out[cid] : undefined)) }))
      .sort((a, b) => a.c.name.localeCompare(b.c.name));
    return { cols, rows };
  }, [scenarios, groups, assignment]);

  const exportComparison = () => {
    if (!comparison) return;
    const head = ["council", ...comparison.cols.map((c) => c.name + " (Δ avg residential bill, $/yr)")].join(",");
    const lines = comparison.rows.map((r) => [
      '"' + r.c.name + '"',
      ...r.cells.map((v) => (v === undefined ? "not in scenario" : v === null ? "no data" : Math.round(v))),
    ].join(","));
    const blob = new Blob([head + "\n" + lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "amalgamator-comparison.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // Render a share card: name huge, map second, one stat third. Canvas keeps it
  // client-side, which matters because static hosting can't generate previews.
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
      setCopyMsg("Link copied. Anyone who opens it sees this exact map.");
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

  // Choosing a region must also choose a sensible active group, otherwise taps
  // on a Wellington board would land in whatever national group was active.
  const groupTouches = (g, r) => (membersOf[g.id] || []).some((m) => m.region === r);
  const groupNearby = (g, r) => (membersOf[g.id] || []).some((m) => (REGION_NEIGHBOURS[r] || []).includes(m.region));
  const groupInScope = (g, r) => r === "ALL" || groupTouches(g, r) || (showNeighbours && groupNearby(g, r));
  const chooseScope = (r) => {
    dirty.current = true;
    setScope(r); setShowNeighbours(false); setStep(1);
    if (r === "ALL") return;
    // Prefer the group actually in this region; neighbours are for reach, not defaults.
    const current = groups.find((g) => g.id === activeId);
    if (current && groupTouches(current, r)) return;
    const firstIn = groups.find((g) => groupTouches(g, r));
    if (firstIn) { setActiveId(firstIn.id); return; }
    const empty = groups.find((g) => (membersOf[g.id] || []).length === 0);
    if (empty) { setActiveId(empty.id); return; }
    const g = { id: newId(), name: "New council " + (groups.length + 1), color: COLORS[groups.length % COLORS.length] };
    setGroups((gs) => [...gs, g]); setActiveId(g.id);
  };

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

  // Draw the card for ONE group and show it, rather than firing a download the
  // user can't see. Nothing leaves the page until they choose.
  const drawCard = (g, members) => {
    const W = 1200, H = 630, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const x = cv.getContext("2d");
    x.fillStyle = "#F6F1E4"; x.fillRect(0, 0, W, H);
    x.fillStyle = g.color; x.fillRect(0, 0, W, 14);

    let size = 96;
    x.fillStyle = "#1A2E33";
    do { x.font = `800 ${size}px Georgia, serif`; size -= 4; } while (x.measureText(g.name).width > W - 120 && size > 34);
    x.fillText(g.name, 60, 150);

    x.font = "600 20px system-ui, sans-serif";
    let cx = 60, cy = 190;
    members.forEach((m) => {
      const w = x.measureText(m.name).width + 30;
      if (cy > H - 320) return; // stop before the taller stats band
      if (cx + w > W - 60) { cx = 60; cy += 46; }
      x.fillStyle = g.color; x.globalAlpha = 0.9;
      x.fillRect(cx, cy, w, 36); x.globalAlpha = 1;
      x.fillStyle = textOn(g.color);
      x.fillText(m.name, cx + 15, cy + 25);
      cx += w + 10;
    });

    const pop = members.reduce((t, m) => t + m.pop, 0);
    const cmp = pop > BY_ID.christchurch.pop ? " Bigger than Christchurch." : pop > BY_ID.dunedin.pop ? " Bigger than Dunedin." : "";
    x.fillStyle = "#1A2E33";

    // Draw a line at the largest size that still fits the card width.
    const line = (text, y, max, weight = "400") => {
      let sz = max;
      do { x.font = `${weight} ${sz}px Georgia, serif`; sz -= 1; }
      while (x.measureText(text).width > W - 120 && sz > 24);
      x.fillText(text, 60, y);
    };

    line(`${pop.toLocaleString("en-NZ")} people. ${members.length} councils.${cmp}`, H - 212, 46, "800");

    // Bill blend + biggest movers, on the published-bill basis
    const r = ratesFor(members, "bill");
    if (r && r.blended != null) {
      const scored = r.rows.filter((q) => q.delta != null);
      line(`Blended average residential bill: ${money(r.blended)} a year.`, H - 158, 34);
      if (scored.length >= 2) {
        const hi = scored[0], lo = scored[scored.length - 1];
        line(`Biggest rise ${hi.m.name} ${signed(hi.delta)}. Biggest fall ${lo.m.name} ${signed(lo.delta)}.`, H - 110, 34);
      }
    }

    // Regional mandate line
    const regs = [...new Set(members.map((m) => m.region))];
    const base = regs.reduce((t, rg) => t + (REGION_POP[rg] || 0), 0);
    if (base) {
      const share = (pop / base) * 100;
      const many = regs.length > 1;
      line(
        share > 50
          ? `${share.toFixed(0)}% of its region${many ? "s" : ""}: enough to include councils that object.`
          : `${share.toFixed(0)}% of its region${many ? "s" : ""} by population.`,
        H - 62, 34
      );
    }

    x.font = "700 24px system-ui, sans-serif"; x.fillStyle = "#B23A18";
    x.fillText("kasukabe914.github.io/localgovernment", 60, H - 22);
    return cv;
  };

  // Which groups can have a card (2+ councils). The user picks one explicitly.
  const cardable = useMemo(
    () => groups.filter((g) => (membersOf[g.id] || []).length >= 2),
    [groups, membersOf]
  );

  const buildCard = (gid) => {
    const g = groups.find((x) => x.id === gid);
    const members = membersOf[gid] || [];
    if (!g || members.length < 2) return;
    const cv = drawCard(g, members);
    setCardFor(gid);
    setCardImg({ url: cv.toDataURL("image/png"), name: g.name });
    cardCanvas.current = cv;
  };

  const cardBlob = () => new Promise((res) => cardCanvas.current.toBlob(res, "image/png"));

  // Moving between steps should land at the top of the new page, not wherever
  // the previous page happened to be scrolled to.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (typeof window === "undefined") return;
    const target = document.getElementById("stepTop");
    if (target && target.scrollIntoView) target.scrollIntoView({ block: "start" });
    else if (window.scrollTo) window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    if (step === 4 && active && activeMembers.length >= 2) buildCard(active.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, activeId, active && active.name, active && active.color]);

  const downloadCard = async () => {
    const blob = await cardBlob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${(cardImg?.name || "council").replace(/[^\w]+/g, "-").toLowerCase()}.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    setCardMsg("Saved to your downloads.");
  };

  const shareCard = async () => {
    const blob = await cardBlob();
    const file = new File([blob], "council.png", { type: "image/png" });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: cardImg?.name || "My council" });
        setCardMsg("Shared.");
      } else {
        setCardMsg("Your browser can't share files directly. Use Download, or press and hold the image to copy it.");
      }
    } catch (e) { /* user cancelled */ }
  };

  const copyCard = async () => {
    try {
      const blob = await cardBlob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCardMsg("Image copied. Paste it anywhere.");
    } catch (e) {
      setCardMsg("Copying images isn't allowed here. Use Download instead.");
    }
  };


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
  // Name duel: offer exactly two candidates. One is a suggestion you ignore;
  // five is a menu you scroll past; two is a choice you made.
  const duelPair = useMemo(() => {
    if (candidates.length < 2) return null;
    const i = (suggestIdx[activeId] || 0) * 2;
    return [candidates[i % candidates.length], candidates[(i + 1) % candidates.length]];
  }, [candidates, suggestIdx, activeId]);
  const shuffleDuel = () => setSuggestIdx((sx) => ({ ...sx, [activeId]: (sx[activeId] || 0) + 1 }));
  const pickName = (n) => { renameGroup(activeId, n); shuffleDuel(); };
  const applyPreset = (key) => {
    dirty.current = true;
    const b = buildPreset(key);
    const presetScope = { wgtnOne: "Wellington", megatron: "Waikato" }[key] || "ALL";
    setGroups(b.groups); setAssignment(b.assignment); setActiveId(b.activeId); setSuggestIdx({});
    setScope(presetScope); setShowNeighbours(false); setStep(1);
  };
  const clearAll = () => {
    dirty.current = true;
    const g = { id: newId(), name: "New council 1", color: COLORS[0] };
    setGroups([g]); setAssignment({}); setActiveId(g.id);
    setSuggestIdx({}); setSavings(0); setYear("r26"); setBasis("bill"); setScope(null); setShowNeighbours(false); setStep(0);
  };

  const groupById = useMemo(() => Object.fromEntries(groups.map((g) => [g.id, g])), [groups]);
  const isBill = basis === "bill";
  const unit = basis === "unit" ? "per rating unit" : isBill ? "avg residential bill" : "per person";
  const unitShort = basis === "unit" ? "/unit" : isBill ? " bill" : "/pp";
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
                    {!g && !c.locked && EXPLORING[c.id] && <span className="exploreTag" title={EXPLORING[c.id]}>exploring</span>}
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
      <a className="skip" href="#map">Skip to the map</a>

      {sharedView && (
        <div className="sharedBanner">
          <span>You're looking at <strong>{groups[0] ? groups[0].name : "a shared map"}</strong>, someone else's map. Think you can do better? Keep it and rename it. Your own map is saved and untouched.</span>
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
          Every non-Auckland council has been told to team up with its neighbours, or have a merger imposed on it.
          Pick a new council, tap the pieces to build it, then see who runs the place and whose rates move.
        </p>
        <div className="presets">
          <button onClick={() => applyPreset("article")}>{PRESETS.article.label}</button>
          <button onClick={() => applyPreset("wgtnOne")}>{PRESETS.wgtnOne.label}</button>
          <button onClick={() => applyPreset("megatron")}>{PRESETS.megatron.label}</button>
          <button onClick={() => applyPreset("regional")}>{PRESETS.regional.label}</button>
          <button className="ghost" onClick={clearAll}>Start again</button>
          <button className="ghost" onClick={() => setShowHow((v) => !v)} aria-expanded={showHow}>How this works</button>
        </div>
        {showHow && (
          <section className="how" aria-label="How this works">
            <h2>How this works</h2>
            <p><strong>Inputs.</strong> 2024 population and 2025 land area (Stats NZ, via DIA's July 2025 council
            profiles release); rates revenue for 2023/24 (actual) and 2025/26 (forecast) from council accounts,
            GST-exclusive as reported; residential property counts and each council's published average residential
            bill for 2024/25 (NZ Taxpayers' Union Ratepayers' Report, GST-inclusive); and best-available rating-unit
            counts with data-quality flags.</p>
            <p><strong>What it computes.</strong> Pick councils into a group and the tool blends them as one entity:
            the default view blends their published residential bills weighted by property count; the other two
            views spread the combined rates take (grossed up 15% so it's GST-inclusive like a bill) across people or
            rating units. A per-residential-property view was deliberately left out: dividing the whole take (which
            includes commercial and farm rates) by a residential dwelling count muddles the rating base with a
            residential measure, and the dwelling count itself includes empty holiday homes. The change shown per council is the blend minus its own figure:
            an immediate, fully harmonised redistribution of today's revenue. The regional-mandate figure is the
            group's share of its region's 2024 population, against the reported majority threshold for lodging a
            proposal that covers objecting councils.</p>
            <p><strong>Assumptions.</strong> One denominator vintage (2024 population) everywhere; revenue held at
            published levels; harmonisation assumed instant and uniform; the optional "trim" is a hypothetical cut to
            the whole take, not an evidenced savings estimate; the opening map resolves late-July 2026 reporting into
            one group per council even where positions were contested.</p>
            <p><strong>Not modelled.</strong> Transition costs and phasing (establishment costs, rates caps, phased
            harmonisation, legacy differentials and ring-fenced debt, which defer or smooth everything shown);
            governance design and representation (wards, Māori wards, councillor numbers, community boards);
            the regional-council rates layer, so nothing here is a complete bill; property-level incidence (rates are
            levied on value with differentials, and averages hide a wide spread); water reform, debt, service levels
            and post-2024 growth.</p>
            <p className="howLinks">
              Full methodology, formulas and known data caveats: <a href="methodology.html">methodology page</a> ·
              <a href="the-amalgamator-data.csv" download> download the dataset (CSV)</a>
            </p>
          </section>
        )}
        <p className="presetNote">
          The opening map is a snapshot of reporting in late July 2026, not an official proposal, and a council can be
          backing more than one option at once, which this model can't show. Proposals are due 9 August. Objecting isn't
          the same as escaping: check the regional mandate figure on any group you build.
        </p>
      </header>

      <div id="stepTop" tabIndex={-1} />
      <nav className="stepper" aria-label="Steps">
        {["1 · Choose a region", "2 · Build the map", "3 · What it means", "4 · Name it", "5 · Share it"].map((label, i) => {
          const locked = (i >= 1 && !scope) || (i >= 2 && activeMembers.length < 2);
          return (
            <button
              key={i}
              className={"stepBtn" + (step === i ? " stepOn" : "") + (locked ? " stepOff" : "")}
              onClick={() => !locked && setStep(i)}
              aria-current={step === i ? "step" : undefined}
              disabled={locked}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {step === 0 && (
        <section className="page landing">
          <div className="pageHead">
            <h2>Which part of the country?</h2>
            <p className="pageSub">Pick the region you want to redesign. You'll get its councils on a board, with neighbouring regions available if a merger needs to cross a boundary.</p>
          </div>
          <div className="regionGrid">
            {[...REGIONS_N, ...REGIONS_S].filter((r) => r !== "Auckland").map((r) => {
              const cs = COUNCILS.filter((c) => c.region === r && !c.locked);
              if (!cs.length) return null;
              const pop = cs.reduce((t, c) => t + c.pop, 0);
              return (
                <button key={r} className="regionCard" onClick={() => chooseScope(r)}>
                  <span className="regionName">{r}</span>
                  <span className="regionMeta">{cs.length} council{cs.length > 1 ? "s" : ""} · {fmtPop(pop)} people</span>
                </button>
              );
            })}
          </div>
          <button className="regionAll" onClick={() => chooseScope("ALL")}>
            <span className="regionName">The whole country</span>
            <span className="regionMeta">All 66 councils outside Auckland · {fmtPop(COUNCILS.filter((c) => !c.locked).reduce((t, c) => t + c.pop, 0))} people</span>
          </button>
          <p className="ratesNote">Auckland is excluded throughout: it amalgamated in 2010 and sits outside this round.</p>
        </section>
      )}

      {step === 1 && (<>
      {scope && (
        <div className="scopeBar">
          <span className="scopeName">{scope === "ALL" ? "The whole country" : scope}</span>
          <button className="scopeChange" onClick={() => { setStep(0); setShowNeighbours(false); }}>Change region</button>
        </div>
      )}
      <p className="mapLead">Tap the pieces to build a council. Whatever you tap joins the <strong>active</strong> group, shown at the bottom of the screen and in the list below the map.</p>
      {scope && [...new Set(COUNCILS.filter((c) => (c.region === scope || scope === "ALL") && EXPLORING[c.id] && !assignment[c.id]).map((c) => c.id))].length > 0 && (
        <details className="exploreBox">
          <summary>Some councils here are exploring partners, without a committed proposal</summary>
          <ul>
            {COUNCILS.filter((c) => (c.region === scope || scope === "ALL") && EXPLORING[c.id] && !assignment[c.id]).map((c) => (
              <li key={c.id}><strong>{c.name}:</strong> {EXPLORING[c.id]}</li>
            ))}
          </ul>
          <p>As reported to 26 July 2026. These are identified options and talks, not agreements; none had become a jointly sponsored proposal. Grouping any of these pieces is your scenario, not a settled position.</p>
        </details>
      )}
      <main className="map" id="map">
        <p className="mapNote">
          {isBill
            ? "Each piece shows the council's own average residential rates bill, 2024/25."
            : basis === "unit"
            ? `Each piece shows rates revenue ÷ rating units, ${yearLabel}.`
            : `Each piece shows rates revenue ÷ population, ${yearLabel}.`}
        </p>
        {scope === "ALL" ? (
          <>
            <h2 className="island">Te Ika-a-Māui · North Island</h2>
            {REGIONS_N.map(renderRegion)}
            <h2 className="island">Te Waipounamu · South Island</h2>
            {REGIONS_S.map(renderRegion)}
          </>
        ) : (
          <>
            {renderRegion(scope)}
            {(() => {
              // Regions linked to this one by a documented cross-boundary option
              // appear by default, each named with the reason it is shown.
              const links = CROSS_LINKS.filter((l) => BY_ID[l.a].region === scope || BY_ID[l.b].region === scope);
              const auto = {};
              links.forEach((l) => {
                const other = BY_ID[l.a].region === scope ? BY_ID[l.b].region : BY_ID[l.a].region;
                if (other !== scope) (auto[other] = auto[other] || []).push(l.label);
              });
              const autoRegions = Object.keys(auto);
              const rest = (REGION_NEIGHBOURS[scope] || []).filter((r) => r !== "Auckland" && !autoRegions.includes(r));
              return (
                <>
                  {autoRegions.map((r) => (
                    <div key={r} className="autoNb">
                      <p className="autoNbWhy"><strong>{r}</strong> is shown because of {auto[r].join("; ")}.</p>
                      {renderRegion(r)}
                    </div>
                  ))}
                  {rest.length > 0 && (
                    <div className="neighbourWrap">
                      <button className="neighbourToggle" onClick={() => setShowNeighbours((v) => !v)} aria-expanded={showNeighbours}>
                        {showNeighbours ? "Hide" : "Show"} other neighbouring regions
                        <span className="neighbourHint"> · for mergers that cross a boundary</span>
                      </button>
                      {showNeighbours && rest.map(renderRegion)}
                    </div>
                  )}
                </>
              );
            })()}
          </>
        )}
      </main>

      <div className="tray">
        <div className="trayLabel">Your new councils. Tap one to make it active, then tap pieces on the map above.</div>
        <div className="chips">
          {groups.filter((g) => !scope || scope === "ALL" || groupInScope(g, scope) || (membersOf[g.id] || []).length === 0).map((g) => {
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
            <div className="swatches" role="group" aria-label="Group colour">
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
                  if (islands.size > 1) return <p className="nudge">Heads up: this group spans both islands. Amalgamations are meant to be between neighbours, but you're free to test anything.</p>;
                  if (regions.size >= 3) return <p className="nudge">This spans {regions.size} regions, a stretch geographically, though the tool won't stop you.</p>;
                  return null;
                })()}

                <button className="nextBtn" onClick={() => setStep(2)}>Next: what it means →</button>
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

      <section className="compareBar">
        <button className="ghost" onClick={saveScenario}>Save map as scenario</button>
        {scenarios.map((sc, i) => (
          <span key={i} className="scChip">
            <button className="scLoad" onClick={() => loadScenario(i)} title="Load this scenario">{sc.name}</button>
            <button className="scDrop" onClick={() => dropScenario(i)} aria-label={`Delete ${sc.name}`}>×</button>
          </span>
        ))}
        {scenarios.length > 0 && (
          <button className="ghost" onClick={() => setShowCompare((v) => !v)} aria-expanded={showCompare}>
            {showCompare ? "Hide comparison" : "Compare"}
          </button>
        )}
      </section>
      {showCompare && comparison && (
        <section className="compare" aria-label="Scenario comparison">
          <div className="compareHead">
            <h2>Scenarios compared: change in avg residential bill, $/year</h2>
            <button className="ghost" onClick={exportComparison}>Download CSV</button>
          </div>
          <div className="compareScroll">
            <table>
              <thead>
                <tr><th scope="col">Council</th>{comparison.cols.map((c) => (<th key={c.name} scope="col">{c.name}</th>))}</tr>
              </thead>
              <tbody>
                {comparison.rows.map((r) => (
                  <tr key={r.c.id}>
                    <th scope="row">{r.c.name}</th>
                    {r.cells.map((v, i) => (
                      <td key={i} className={v == null ? "cmpNa" : v > 0 ? "cmpUp" : v < 0 ? "cmpDown" : ""}>
                        {v === undefined ? "—" : v === null ? "no data" : signed(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="ratesNote">Councils not grouped in a scenario show "—". All columns use the published-bill
          basis so they're comparable; "no data" means too few councils in that group supplied a bill.</p>
        </section>
      )}

      <footer className="summary">
        <h2>Your map of New Zealand</h2>
        <p>
          {stats.valid.length === 0
            ? `No valid proposals yet. A proposal needs at least two councils. ${stats.nonEmpty.length > 0 ? "You've got some single councils on their own." : ""}`
            : `${stats.valid.length} valid ${stats.valid.length === 1 ? "proposal" : "proposals"} (2+ councils each) covering ${stats.placed} of ${stats.eligible} territorial authorities. ${stats.remaining} still on their own.`}
        </p>
        {stats.biggest && (() => {
          const bp = stats.byGroup[stats.biggest.id].pop, cp = BY_ID.christchurch.pop;
          return (
            <p>
              Your biggest creation is <strong>{stats.biggest.name}</strong> at <strong>{fmtPop(bp)}</strong> people,{" "}
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
                    {m.length === 1 ? (<span className="warn">Only one council, not a valid proposal</span>) : (
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
            <dd>Council 2023/24 annual reports: statement of comprehensive revenue and expense, including penalties and remissions.</dd>
            <dt>Rates revenue, 2025/26 forecast</dt>
            <dd>Council 2025/26 annual plans or 2025–34 long-term plans: prospective statement of comprehensive revenue and expense, including penalties and remissions.</dd>
            <dt>Population, 2024</dt>
            <dd>
              Stats NZ, subnational population estimates (Infoshare). The 2024 estimate is used throughout, for
              population shares and for both rates years, so every figure shares one denominator. Estimates are rounded
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
              residential properties, not households, and is used only to weight the residential-bill blend; it is
              not offered as a rates denominator. Western Bay of Plenty, Westland and Waitaki declined or did not
              supply an average bill; Chatham Islands isn't in the report, so its property count is an estimate.
            </dd>
            <dt>Rating units</dt>
            <dd>
              Best-available rating-unit count per council, compiled from council annual reports, long-term plans and
              regional-council valuation rolls. A rating unit is every separately rateable property: the base councils
              actually levy on. Most counts are confirmed actuals; some are older, projected, draft or a proxy, flagged
              on the comparator rows. Chatham Islands is not in the dataset.
            </dd>
            <dt>Population, land area &amp; rates revenue, sourced from</dt>
            <dd>
              Department of Internal Affairs,{" "}
              <a href="https://www.dia.govt.nz/local-government-performance-metrics" target="_blank" rel="noreferrer">
                Data release for council profiles – July 2025
              </a>{" "}
              (updated October 2025). Figures cover the 67 territorial authorities; the 11 regional councils are
              excluded. DIA publishes this as raw data; the councils, blends, comparisons and scenarios in this tool
              are Mischewski Consulting's own work, not a DIA output, and DIA has no connection to this project.
            </dd>
            <dt>Not affiliated with</dt>
            <dd>
              This is an independent project. It is not produced, endorsed or reviewed by the Department of Internal
              Affairs, Stats NZ, the NZ Taxpayers' Union, or any council. DIA and Stats NZ publish raw figures under
              CC BY 4.0; nothing here should be read as an official government output.
            </dd>
            <dt>Who's merging with whom</dt>
            <dd>
              Positions and dates as at 24 July 2026, from Local Democracy Reporting and The Post (Justin Wong), RNZ,
              and MartinJenkins' July 2026 cost analysis. The majority rule described in the regional-mandate box is as
              reported, not legal advice; check the legislation before relying on it.
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
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC&nbsp;BY&nbsp;4.0</a>:
            reuse or adapt it freely, including commercially, with credit and a link to the licence, and say if you
            changed it. Crown data (DIA, Stats NZ) is separately CC&nbsp;BY&nbsp;4.0; residential property counts and
            average bills are © NZ Taxpayers' Union and carry their own terms. Independent project, not affiliated with
            any of them.{" "}
            <a href="https://github.com/Kasukabe914/localgovernment" target="_blank" rel="noreferrer">Source on GitHub</a>.
          </p>
        </section>
      </footer>
      </>)}

      {step >= 2 && (() => {
        const scoped = cardable.filter((g) => !scope || groupInScope(g, scope));
        const list = scoped.length ? scoped : cardable;
        return list.length > 1 ? (
        <div className="switch">
          <span className="switchLabel">Working on:</span>
          {list.map((g) => (
            <button key={g.id} className={"chip" + (g.id === activeId ? " chipActive" : "")} style={{ "--c": g.color }} onClick={() => setActiveId(g.id)} aria-pressed={g.id === activeId}>
              <span className="dot" /><span className="chipName">{g.name}</span>
            </button>
          ))}
        </div>
        ) : null;
      })()}

      {step === 2 && active && activeMembers.length >= 2 && (
        <section className="page">
          <div className="pageHead">
            <h2>What <span style={{ color: active.color }}>{active.name}</span> would mean</h2>
            <p className="pageSub">{activeMembers.length} councils · {fmtPop(stats.byGroup[active.id].pop)} people · {stats.byGroup[active.id].area.toLocaleString("en-NZ")} km²</p>
          </div>
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
                      proposal covering the whole region, including councils that object.{" "}
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
                <span className="basisTier">Normalisations, not bills</span>
                <div className="basis">
                  {[["unit", "Per rating unit"], ["person", "Per person"]].map(([k, l]) => (
                    <button key={k} className={"basisBtn" + (basis === k ? " basisOn" : "")} onClick={() => setBasis(k)} aria-pressed={basis === k}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="blended">
                <span className="blendedLabel">Blended<br />{unit}</span>
                <span className="blendedValue" aria-live="polite">{money(activeRates.blended)}</span>
              </div>
              <p className="scopeLine">
                {isBill
                  ? "What an average home pays. Residential properties only: no commercial or industrial rates."
                  : basis === "unit"
                  ? "The whole rates take, including commercial, industrial and targeted rates, divided across every rateable property. Higher than a household bill wherever there's a big commercial base."
                  : "The whole rates take, including commercial and industrial rates, divided by residents. Not what anyone is billed."}
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
                    $240m. This slider models none of that; it just trims the take.
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
                  The measures differ because the total rates take is spread over all rateable property (commercial, industrial and farm land included) while a residential bill is only what a home is charged. Where a district has little commercial property, its households carry more of the load than the per-property average suggests. For what a homeowner actually pays, use the bill basis.
                </div>
              )}
              {activeRates.blended == null ? (
                <p className="ratesNote">Fewer than two of these councils supplied an average residential bill, so there's nothing to blend. Try per person or per rating unit.</p>
              ) : (
                <ul className="deltas">
                  {activeRates.rows.map(({ m, now, then, delta, pctDelta }) => {
                    if (delta == null) {
                      const reason = isBill
                        ? (m.id === "chathams" ? "Not in the Ratepayers' Report" : "Council didn't supply an average bill")
                        : basis === "unit" ? "Not in the rating-units dataset"
                        : "Not in the rating-units dataset";
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
                  weighted by household count. Closest thing to a real bill here, but "average" hides a wide spread
                  within any district, the weighting denominator is an approximation, and a merger would set new
                  differentials and phase them in over years. Western Bay of Plenty, Westland and Waitaki didn't
                  supply a figure and Chatham Islands isn't in the report, so those show as no data.</>
                ) : basis === "unit" ? (
                  <>{yearLabel} rates revenue divided by <strong>rating units</strong>: every separately rateable
                  property (homes, farms, commercial sites, baches). A rough per-property normalisation: real bills
                  use land or capital value, targeted rates, uniform charges and differentials, so this isn't an
                  actual bill. Some counts are older, projected, draft or a proxy (flagged on the rows). Direction of
                  travel only.</>
                ) : (
                  <>{yearLabel} rates revenue spread evenly across residents. Rates aren't levied per head (they're
                  on property value) and mergers phase differentials in over years, so this is a normalisation, not
                  a bill. All figures use 2024 population, including the 2025/26 forecast, so for fast-growing
                  districts the forecast per-person figure runs high: about 8% for Selwyn, 6% for Hamilton, against
                  almost nothing for Wellington City or Nelson. That gap flatters slow-growing districts in any
                  comparison.</>
                )}{" "}
                <span className="muted">Territorial-council figures only: the separate regional-council rates layer isn't included, and the four existing unitary councils (Gisborne, Nelson, Tasman, Marlborough) already fold regional functions in, so they aren't strictly like-for-like.{!isBill && savings > 0 ? " The trim is a hypothetical cut to the whole rates take, not an evidenced merger-savings estimate." : ""}</span>
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
                  Applied to this tool: the figures above are an <em>immediate, fully harmonised</em> redistribution:
                  every property in the merged entity treated identically from day one. No real amalgamation has
                  worked that way. Expect the direction to hold and the timing and size to differ, often for years.
                </p>
              </details>
            </div>
          <div className="pageNav">
            <button className="backBtn" onClick={() => setStep(1)}>← Back to the map</button>
            <button className="nextBtn" onClick={() => setStep(3)}>Next: name it →</button>
          </div>
        </section>
      )}

      {step === 3 && active && activeMembers.length >= 2 && (
        <section className="page">
          <div className="pageHead">
            <h2>Name it</h2>
            <p className="pageSub">Pick one of the two. "Other names" deals a fresh pair, so keep going until one fits.</p>
          </div>

          <div className="currentName" style={{ borderColor: active.color }}>
            <span className="currentLabel">Currently called</span>
            <span className="currentValue">{active.name}</span>
          </div>

          {duelPair && (
            <div className="duel">
              <span className="duelAsk">Christen it</span>
              <div className="duelPair">
                {duelPair.map((n, i) => (
                  <button key={n + i} className="duelBtn" onClick={() => pickName(n)}>{n}</button>
                ))}
              </div>
              <button className="suggest" onClick={shuffleDuel}>Other names</button>
              <p className="nameNote">Names come from a fixed list of local nicknames and landmarks. There's no free-text box, so nothing unpleasant can end up on a shared card.</p>
            </div>
          )}
          <div className="pageNav">
            <button className="backBtn" onClick={() => setStep(2)}>← Back to what it means</button>
            <button className="nextBtn" onClick={() => setStep(4)}>Next: share it →</button>
          </div>
        </section>
      )}

      {step === 4 && active && activeMembers.length >= 2 && (
        <section className="page">
          <div className="pageHead">
            <h2>Share <span style={{ color: active.color }}>{active.name}</span></h2>
            <p className="pageSub">Your card, made from this one council. Check it looks right, then send it.</p>
          </div>
          {cardImg ? (
            <img className="cardPreview" src={cardImg.url} alt={`Share card for ${cardImg.name}`} />
          ) : (
            <div className="cardEmpty">Building your card…</div>
          )}
          {cardImg && (
            <div className="cardActions">
              <button className="cardGo" onClick={shareCard}>Share</button>
              <button className="cardAlt" onClick={downloadCard}>Download</button>
              <button className="cardAlt" onClick={copyCard}>Copy image</button>
            </div>
          )}
          {cardMsg && <p className="cardMsg">{cardMsg}</p>}
          <div className="shareLinkBlock">
            <div className="shareHead">Or share the live map</div>
            <button className="cardAlt" onClick={makeShareLink}>Copy a link to this map</button>
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
          </div>
          <div className="pageNav">
            <button className="backBtn" onClick={() => setStep(3)}>← Back to naming</button>
            <button className="nextBtn" onClick={() => setStep(1)}>Build another →</button>
          </div>
        </section>
      )}



      <footer className="siteFooter">
        <div className="sfGrid">
          <div className="sfCol">
            <div className="sfTitle">The Amalgamator</div>
            <p>Build-your-own council maps for Aotearoa New Zealand's local government reform.</p>
            <p className="sfDisclaim"><strong>Independent modelling tool.</strong> Not official figures, and not a prediction of any household's rates.</p>
          </div>
          <div className="sfCol">
            <div className="sfHead">Site</div>
            <ul className="sfLinks">
              <li><a href="methodology.html">Methodology</a></li>
              <li><a href="privacy-policy/">Privacy policy</a></li>
              <li><a href="the-amalgamator-data.csv" download>Dataset (CSV)</a></li>
              <li><a href="https://github.com/Kasukabe914/localgovernment" target="_blank" rel="noreferrer">Source on GitHub</a></li>
            </ul>
          </div>
          <div className="sfCol">
            <div className="sfHead">Attribution</div>
            <p>Crown data (DIA, Stats NZ) under CC BY 4.0. Residential property counts and average residential bills © NZ Taxpayers' Union.</p>
            <p>Operated by Mischewski Consulting.</p>
            <p className="sfAi">Generated with Anthropic's Claude (Fable and Opus models), directed and reviewed by Mischewski Consulting. Figures were cross-checked against the cited sources; the methodology page shows how to reproduce them.</p>
          </div>
        </div>
        <div className="sfBase">© 2026 Mischewski Consulting · Built for Aotearoa New Zealand</div>
      </footer>

      {step === 1 && active && (
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
.muted { opacity: 0.75; }
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
.trayLabel { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; opacity: 0.72; margin: 0 auto 8px; max-width: 760px; }
.chips { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; max-width: 760px; margin: 0 auto; }
.chip { font: inherit; font-size: 13px; display: inline-flex; align-items: center; gap: 7px; background: #fff; border: 1.5px solid rgba(26,46,51,0.25); border-radius: 999px; padding: 7px 12px; cursor: pointer; white-space: nowrap; color: var(--ink); }
.chip .dot { width: 12px; height: 12px; border-radius: 50%; background: var(--c); flex: none; }
.chipActive { border-color: var(--ink); box-shadow: 0 0 0 2px var(--ink); }
.chipName { font-weight: 600; max-width: 150px; overflow: hidden; text-overflow: ellipsis; }
.chipMeta { font-size: 11px; opacity: 0.72; }
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

.shareHead { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; opacity: 0.72; margin-top: 2px; }
.share { display: grid; gap: 6px; }
.shareBar { position: relative; display: flex; width: 100%; height: 22px; border: 1.5px solid var(--ink); border-radius: 4px; overflow: hidden; background: #fff; }
.shareCompact .shareBar { height: 13px; border-width: 1px; }
.shareSeg { height: 100%; border-right: 1.5px solid rgba(255,255,255,0.85); }
.shareSeg:last-of-type { border-right: none; }
.shareMid { position: absolute; left: 50%; top: 0; bottom: 0; width: 0; border-left: 2px dashed rgba(26,46,51,0.85); }
.shareLegend { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 12px; }
.shareVerdict { font-size: 13px; line-height: 1.45; margin: 0; }
.shareCaveat { font-size: 11px; line-height: 1.4; opacity: 0.72; margin: 3px 0 0; }
.presetNote { font-size: 11.5px; line-height: 1.45; opacity: 0.72; margin: 8px 0 0; max-width: 60ch; }
.nudge { font-size: 12px; line-height: 1.4; margin: 0; padding: 6px 9px; background: rgba(241,143,1,0.14); border-left: 3px solid #F18F01; border-radius: 3px; }

.rates { display: grid; gap: 10px; }
.blended { display: flex; align-items: center; justify-content: space-between; gap: 10px; border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); padding: 8px 0; }
.blendedLabel { font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; line-height: 1.25; }
.blendedValue { font-size: clamp(30px, 9vw, 44px); font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
.basis { display: flex; gap: 6px; flex-wrap: wrap; }
.basisGroup { display: grid; gap: 5px; }
.basisTier { font-size: 10px; text-transform: uppercase; letter-spacing: 0.09em; font-weight: 700; opacity: 0.72; }
.scopeLine { font-size: 12px; line-height: 1.45; margin: 0; padding: 7px 9px; background: rgba(26,46,51,0.05); border-radius: 4px; }
.diverge { font-size: 12.5px; line-height: 1.5; padding: 9px 11px; background: rgba(241,143,1,0.15); border-left: 3px solid #B23A18; border-radius: 3px; }
.diverge strong { color: #B23A18; }
.landing { max-width:860px; }
.regionGrid { display:grid; grid-template-columns:repeat(auto-fill,minmax(215px,1fr)); gap:10px; }
.regionCard, .regionAll { font:inherit; text-align:left; background:#fff; border:2px solid var(--ink); border-radius:8px; padding:14px; cursor:pointer; display:grid; gap:4px; color:var(--ink); }
.regionAll { border-color:var(--accent-ink); background:rgba(178,58,24,0.06); margin-top:4px; }
.regionCard:hover, .regionAll:hover { background:var(--ink); color:#fff; }
.regionAll:hover { background:var(--accent-ink); border-color:var(--accent-ink); }
.regionName { font-size:16px; font-weight:800; line-height:1.2; }
.regionMeta { font-size:12px; opacity:0.78; }
.scopeBar { max-width:1140px; margin:0 auto; padding:12px 18px 0; display:flex; align-items:baseline; gap:12px; flex-wrap:wrap; }
.scopeName { font-size:20px; font-weight:800; }
.scopeChange { font:inherit; font-size:12px; font-weight:700; background:transparent; border:1.5px solid var(--ink); border-radius:999px; padding:5px 11px; cursor:pointer; color:var(--ink); }
.autoNb { margin-top: 14px; }
.autoNbWhy { font-size: 12.5px; margin: 0 0 6px; padding: 7px 11px; background: #fff; border-left: 4px solid var(--accent-ink); }
.exploreTag { font-size: 8.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; border: 1.5px dashed currentColor; border-radius: 3px; padding: 1px 4px; opacity: 0.85; margin-top: 2px; display: inline-block; }
.exploreBox { max-width: 1140px; margin: 10px auto 0; border: 1.5px dashed rgba(26,46,51,0.45); border-radius: 6px; background: #fff; padding: 0 12px; }
.exploreBox summary { font-size: 13px; font-weight: 700; padding: 10px 0; cursor: pointer; }
.exploreBox ul { margin: 0; padding: 0 0 0 18px; display: grid; gap: 6px; }
.exploreBox li { font-size: 12.5px; line-height: 1.5; }
.exploreBox p { font-size: 12px; opacity: 0.85; padding-bottom: 10px; }
.neighbourWrap { margin-top:14px; padding-top:12px; border-top:1.5px dashed rgba(26,46,51,0.3); }
.neighbourToggle { font:inherit; font-size:13px; font-weight:700; background:transparent; border:1.5px solid var(--ink); border-radius:999px; padding:8px 14px; cursor:pointer; color:var(--ink); margin-bottom:10px; }
.neighbourHint { font-weight:400; opacity:0.75; }
.mapLead { max-width:1140px; margin:0 auto; padding:14px 18px 0; font-size:13.5px; line-height:1.5; }
.stepper { max-width:1140px; margin:0 auto; padding:14px 18px 0; display:flex; gap:8px; flex-wrap:wrap; }
.stepBtn { font:inherit; font-size:13px; font-weight:700; background:#fff; color:var(--ink); border:1.5px solid rgba(26,46,51,0.35); border-radius:999px; padding:9px 15px; cursor:pointer; }
.stepOn { background:var(--ink); color:#fff; border-color:var(--ink); }
.stepOff { opacity:0.5; cursor:default; }
.switch { max-width:1140px; margin:0 auto; padding:10px 18px 0; display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
.switchLabel { font-size:12px; font-weight:700; opacity:0.72; }
.page { max-width:760px; margin:0 auto; padding:18px; display:grid; gap:12px; }
.pageHead h2 { font-size:24px; margin:0 0 4px; }
.pageSub { font-size:13.5px; margin:0; opacity:0.8; }
.pageNav { display:flex; justify-content:space-between; gap:10px; margin-top:10px; flex-wrap:wrap; }
.nextBtn { font:inherit; font-size:14px; font-weight:800; background:var(--accent-ink); color:#fff; border:none; border-radius:999px; padding:12px 22px; cursor:pointer; }
.backBtn { font:inherit; font-size:14px; font-weight:700; background:transparent; color:var(--ink); border:1.5px solid var(--ink); border-radius:999px; padding:12px 18px; cursor:pointer; }
.shareLinkBlock { display:grid; gap:8px; margin-top:8px; padding-top:14px; border-top:1.5px solid rgba(26,46,51,0.2); }
.cardOverlay { position:fixed; inset:0; background:rgba(26,46,51,0.6); display:flex; align-items:center; justify-content:center; padding:16px; z-index:60; }
.cardModal { background:var(--paper); border-radius:10px; max-width:640px; width:100%; max-height:90vh; overflow:auto; padding:18px; box-shadow:0 18px 50px rgba(0,0,0,0.3); }
.cardTop { display:flex; align-items:center; justify-content:space-between; }
.cardTop h2 { font-size:18px; margin:0; }
.cardX { font:inherit; font-size:24px; line-height:1; background:transparent; border:none; cursor:pointer; color:var(--ink); padding:0 4px; }
.cardStep { font-size:13px; margin:14px 0 7px; }
.cardPick { display:flex; flex-wrap:wrap; gap:7px; }
.cardPickBtn { font:inherit; font-size:13px; font-weight:700; display:inline-flex; align-items:center; gap:7px; background:#fff; color:var(--ink); border:1.5px solid rgba(26,46,51,0.35); border-radius:999px; padding:7px 12px; cursor:pointer; }
.cardPickOn { border-color:var(--ink); border-width:2.5px; }
.cardDot { width:11px; height:11px; border-radius:50%; background:var(--c); display:inline-block; }
.cardCount { font-size:11px; opacity:0.72; }
.cardPreview { width:100%; border:1.5px solid rgba(26,46,51,0.3); border-radius:6px; display:block; }
.cardEmpty { border:1.5px dashed rgba(26,46,51,0.35); border-radius:6px; padding:34px; text-align:center; font-size:13px; opacity:0.72; }
.cardActions { display:flex; gap:8px; flex-wrap:wrap; }
.cardGo { font:inherit; font-size:14px; font-weight:800; background:var(--accent-ink); color:#fff; border:none; border-radius:999px; padding:10px 20px; cursor:pointer; }
.cardAlt { font:inherit; font-size:14px; font-weight:700; background:transparent; color:var(--ink); border:1.5px solid var(--ink); border-radius:999px; padding:10px 18px; cursor:pointer; }
.cardMsg { font-size:12.5px; font-weight:600; margin:10px 0 0; }
.currentName { background:#fff; border:2px solid var(--ink); border-radius:8px; padding:12px 14px; display:grid; gap:3px; }
.currentLabel { font-size:11px; text-transform:uppercase; letter-spacing:0.1em; font-weight:700; opacity:0.72; }
.currentValue { font-size:24px; font-weight:800; line-height:1.15; }
.nameNote { font-size:11.5px; line-height:1.5; opacity:0.75; margin:4px 0 0; }
.duel { display:grid; gap:6px; margin-top:8px; }
.duelAsk { font-size:11px; text-transform:uppercase; letter-spacing:0.1em; font-weight:700; opacity:0.72; }
.duelPair { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.duelBtn { font:inherit; font-size:15px; font-weight:800; background:#fff; color:var(--ink); border:2px solid var(--ink); border-radius:7px; padding:12px 10px; cursor:pointer; line-height:1.2; }
.duelBtn:hover { background:var(--ink); color:#fff; }
@media (max-width:520px){ .duelPair { grid-template-columns:1fr; } }
.siteFooter { background: var(--ink); color: #F6F1E4; margin-top: 34px; padding: 30px 18px 22px; }
.sfGrid { max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 2fr; gap: 26px; }
@media (max-width: 720px) { .sfGrid { grid-template-columns: 1fr; } }
.sfTitle { font-size: 17px; font-weight: 800; margin-bottom: 6px; }
.sfHead { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; opacity: 0.8; margin-bottom: 8px; }
.sfCol p { font-size: 12.5px; line-height: 1.55; margin: 0 0 9px; opacity: 0.92; }
.sfDisclaim strong { color: #fff; }
.sfLinks { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
.sfLinks a { color: #F6F1E4; font-size: 13px; font-weight: 600; }
.sfAi { opacity: 0.8 !important; font-size: 11.5px !important; }
.sfBase { max-width: 1140px; margin: 20px auto 0; padding-top: 14px; border-top: 1px solid rgba(246,241,228,0.25); font-size: 12px; opacity: 0.85; }
.skip { position:absolute; left:-9999px; top:0; background: var(--ink); color:#fff; padding:10px 16px; font-weight:700; z-index:50; border-radius:0 0 6px 0; }
.skip:focus { left:0; }
button:focus-visible, input:focus-visible, a:focus-visible, summary:focus-visible { outline: 3px solid var(--accent-ink); outline-offset: 2px; }
button, .piece { touch-action: manipulation; }
.how { background:#fff; border:2px solid var(--ink); border-radius:8px; padding:14px 16px; margin-top:12px; display:grid; gap:8px; }
.how h2 { font-size:16px; margin:0; }
.how p { font-size:12.5px; line-height:1.55; margin:0; }
.howLinks a { color: var(--accent-ink); font-weight:700; }
.compareBar { max-width: 1140px; margin: 0 auto; padding: 10px 18px 0; display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
.compareBar .ghost, .compare .ghost { font:inherit; font-size:12px; font-weight:700; background:transparent; color:var(--ink); border:1.5px solid var(--ink); border-radius:999px; padding:7px 13px; cursor:pointer; }
.scChip { display:inline-flex; align-items:stretch; border:1.5px solid var(--ink); border-radius:999px; overflow:hidden; background:#fff; }
.scLoad { font:inherit; font-size:12px; font-weight:700; border:none; background:transparent; color:var(--ink); padding:7px 10px 7px 13px; cursor:pointer; }
.scDrop { font:inherit; font-size:14px; font-weight:700; border:none; border-left:1.5px solid rgba(26,46,51,0.3); background:transparent; color:var(--ink); padding:0 10px; cursor:pointer; }
.compare { max-width:1140px; margin:10px auto 0; padding:0 18px; }
.compareHead { display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; }
.compare h2 { font-size:15px; margin:0; }
.compareScroll { overflow-x:auto; border:1.5px solid rgba(26,46,51,0.3); border-radius:6px; background:#fff; margin-top:8px; }
.compare table { border-collapse:collapse; width:100%; font-size:12.5px; }
.compare th, .compare td { padding:6px 10px; border-bottom:1px solid rgba(26,46,51,0.14); text-align:right; white-space:nowrap; }
.compare th[scope="row"], .compare thead th:first-child { text-align:left; }
.compare thead th { position:sticky; top:0; background:#fff; border-bottom:2px solid var(--ink); }
.cmpUp { color: var(--up); font-weight:700; }
.cmpDown { color: var(--down); font-weight:700; }
.cmpNa { opacity:0.72; }
.caveat { border: 1.5px solid rgba(26,46,51,0.3); border-radius: 5px; background: #fff; padding: 0; }
.caveat summary { font-size: 12px; font-weight: 700; padding: 8px 11px; cursor: pointer; list-style: none; display: flex; align-items: center; gap: 7px; }
.caveat summary::-webkit-details-marker { display: none; }
.caveat summary::before { content: "▸"; font-size: 10px; opacity: 0.72; }
.caveat[open] summary::before { content: "▾"; }
.caveat[open] summary { border-bottom: 1px solid rgba(26,46,51,0.15); }
.caveat p { font-size: 11.5px; line-height: 1.55; margin: 0; padding: 9px 11px 0; opacity: 0.82; }
.caveat p:last-child { padding-bottom: 10px; }
.caveatApply { border-top: 1px dashed rgba(26,46,51,0.2); margin-top: 8px !important; padding-top: 9px !important; opacity: 1 !important; font-weight: 500; }
.mandate { border: 1.5px solid rgba(26,46,51,0.3); border-radius: 5px; padding: 9px 11px; display: grid; gap: 5px; background: #fff; }
.mandateYes { border-color: var(--ink); border-width: 2px; background: rgba(46,125,82,0.08); }
.mandateTop { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.mandateHead { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; opacity: 0.72; }
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
.regionCount { font-size: 11px; opacity: 0.72; }
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
.sources dt { font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.72; }
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

// ===========================================================================
// Simplified experience
// One scenario, one clear task, and one result. The detailed source data and
// legacy implementation remain above so existing calculations can be checked.
// ===========================================================================

const SIMPLE_REGIONS = [...REGIONS_N, ...REGIONS_S].filter(
  (region) => COUNCILS.filter((c) => c.region === region && !c.locked).length >= 2
);
const PUBLIC_APP_URL = "https://kasukabe914.github.io/localgovernment/";
const facebookAppIdValue = String(import.meta.env.VITE_FACEBOOK_APP_ID || "").trim();
const FACEBOOK_APP_ID = /^\d+$/.test(facebookAppIdValue) ? facebookAppIdValue : "";

function simpleRates(members) {
  const usable = members.filter((m) => m.avgRes != null && m.hh);
  if (usable.length < 2) return { blended: null, rows: [], missing: members };

  const households = usable.reduce((sum, m) => sum + m.hh, 0);
  const blended = usable.reduce((sum, m) => sum + m.avgRes * m.hh, 0) / households;
  const rows = members
    .map((m) => ({
      council: m,
      before: m.avgRes,
      after: m.avgRes == null ? null : blended,
      change: m.avgRes == null ? null : blended - m.avgRes,
    }))
    .sort((a, b) => {
      if (a.change == null) return 1;
      if (b.change == null) return -1;
      return b.change - a.change;
    });

  return {
    blended,
    rows,
    missing: members.filter((m) => m.avgRes == null),
  };
}

// ---------------------------------------------------------------------------
// Share card palette. The app's UI uses green/red for "pays less"/"pays more",
// but that pair fails deuteranopia separation at every step we tested (best
// ΔE 6.2 against a floor of 8), and a share card is seen once, at speed, with
// no tooltip to fall back on. The card therefore keeps the brand red for "pays
// more" and swaps the green pole for a deep blue: red↔blue measures ΔE 18.0
// (CVD) and 26.4 (normal vision) on the paper surface, passing every check.
// Direction is additionally carried by side-of-zero position and a signed
// dollar label on every bar, so hue is never the only channel.
// ---------------------------------------------------------------------------
const CARD_W = 1200;
const CARD_H = 630;
const CARD_PAPER = "#fbf8ef";
const CARD_INK = "#193036";
const CARD_INK_SOFT = "#4d6267";
const CARD_MORE = "#ad3936";
const CARD_LESS = "#0069a8";
const CARD_RULE = "#d9d3c4";
const CARD_FONT = `'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif`;

// The one sentence that has to survive being read in a feed at speed.
function shareFinding({ councilName, members, rates, totalPopulation }) {
  const scored = rates.rows.filter((row) => row.change != null);
  const rising = scored.filter((row) => row.change > 0);
  const falling = scored.filter((row) => row.change < 0);
  // rates.rows is sorted descending by change, nulls last.
  const biggestRise = rising.length ? rising[0] : null;
  const biggestFall = falling.length ? falling[falling.length - 1] : null;
  const headline = biggestFall
    ? `${biggestFall.council.name} ratepayers pay ${money(Math.abs(biggestFall.change))} on average less a year`
    : biggestRise
      ? `${biggestRise.council.name} ratepayers pay ${money(biggestRise.change)} on average more a year`
      : "No comparable rates data for this combination";

  const noData = rates.rows
    .filter((row) => row.change == null)
    .map((row) => row.council.name);

  return {
    councilName,
    councilCount: members.length,
    population: totalPopulation,
    rising,
    falling,
    noData,
    biggestRise,
    biggestFall,
    blended: rates.blended,
    headline,
    // Short enough to survive LinkedIn's description truncation (~200 chars).
    summary: rates.blended
      ? `Residents of ${rising.length} of ${scored.length} councils would pay more, ${falling.length} would pay less. ${headline}.`
      : "Population, land area and rates data for this combination.",
  };
}

// Suggested post copy. LinkedIn deprecated prefill (shareArticle's title/
// summary/source went in 2018 and share-offsite only accepts `url`), so the
// only way to get text into the composer is the clipboard.
function sharePostText(finding, url) {
  const lines = [];
  lines.push(
    `Meet ${finding.councilName} — ${finding.councilCount} New Zealand councils merged into one, ${fmtPop(finding.population)} people.`
  );
  lines.push("");
  if (finding.blended) {
    lines.push("If rates were harmonised tomorrow:");
    if (finding.biggestRise) {
      lines.push(
        `↑ ${finding.biggestRise.council.name} ratepayers pay ${money(finding.biggestRise.change)} on average more a year`
      );
    }
    if (finding.biggestFall) {
      lines.push(
        `↓ ${finding.biggestFall.council.name} ratepayers pay ${money(Math.abs(finding.biggestFall.change))} on average less a year`
      );
    }
    lines.push("");
    lines.push(
      `Residents of ${finding.rising.length} of ${finding.rising.length + finding.falling.length} councils would pay more, ${finding.falling.length} would pay less. Blended average residential bill: ${money(finding.blended)} a year.`
    );
    if (finding.noData.length) {
      lines.push(
        `(${finding.noData.join(", ")} ${finding.noData.length > 1 ? "publish" : "publishes"} no average residential bill, so ${finding.noData.length > 1 ? "they are" : "it is"} left out of the blend.)`
      );
    }
    lines.push("");
  }
  lines.push(
    "Built with The Amalgamator — an independent model of council amalgamation, not a proposal and not a prediction of anyone's rates. Sources, formulas and caveats are all published."
  );
  lines.push("");
  lines.push(`See this combination: ${url}`);
  lines.push("");
  lines.push("What would yours look like?");
  return lines.join("\n");
}

function fitText(ctx, text, maxWidth, startSize, weight) {
  let size = startSize;
  ctx.font = `${weight} ${size}px ${CARD_FONT}`;
  while (ctx.measureText(text).width > maxWidth && size > 18) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${CARD_FONT}`;
  }
  return size;
}

function roundedBar(ctx, x, y, w, h, r, flatLeft) {
  // 4px rounded data-end, square at the baseline (the zero line).
  const radius = Math.min(r, Math.abs(w));
  ctx.beginPath();
  if (flatLeft) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x, y + h);
  } else {
    ctx.moveTo(x, y);
    ctx.lineTo(x - w + radius, y);
    ctx.quadraticCurveTo(x - w, y, x - w, y + radius);
    ctx.lineTo(x - w, y + h - radius);
    ctx.quadraticCurveTo(x - w, y + h, x - w + radius, y + h);
    ctx.lineTo(x, y + h);
  }
  ctx.closePath();
  ctx.fill();
}

// Renders the 1200x630 card. Pure canvas, no dependencies, no server.
function drawShareCard(canvas, finding, rates, totalArea) {
  const ctx = canvas.getContext("2d");
  canvas.width = CARD_W;
  canvas.height = CARD_H;

  ctx.fillStyle = CARD_PAPER;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Masthead
  const headH = 84;
  ctx.fillStyle = CARD_INK;
  ctx.fillRect(0, 0, CARD_W, headH);
  ctx.fillStyle = CARD_PAPER;
  ctx.font = `800 26px ${CARD_FONT}`;
  ctx.textBaseline = "middle";
  ctx.fillText("The Amalgamator", 56, headH / 2);
  ctx.font = `600 19px ${CARD_FONT}`;
  ctx.globalAlpha = 0.72;
  ctx.textAlign = "right";
  ctx.fillText("Independent modelling · New Zealand local government", CARD_W - 56, headH / 2);
  ctx.globalAlpha = 1;
  ctx.textAlign = "left";

  // Hero: the council the user built
  let y = headH + 62;
  const heroSize = fitText(ctx, finding.councilName, CARD_W - 112, 68, 800);
  ctx.fillStyle = CARD_INK;
  ctx.font = `800 ${heroSize}px ${CARD_FONT}`;
  ctx.fillText(finding.councilName, 56, y);

  y += 40;
  ctx.fillStyle = CARD_INK_SOFT;
  ctx.font = `600 23px ${CARD_FONT}`;
  ctx.fillText(
    `${finding.councilCount} councils · ${fmtPop(finding.population)} people · ${Math.round(totalArea).toLocaleString("en-NZ")} km²`,
    56,
    y
  );

  y += 34;
  ctx.strokeStyle = CARD_RULE;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(56, y + 0.5);
  ctx.lineTo(CARD_W - 56, y + 0.5);
  ctx.stroke();

  const footH = 74;
  const rows = rates.rows.filter((row) => row.change != null);

  if (!rows.length || !rates.blended) {
    ctx.fillStyle = CARD_INK_SOFT;
    ctx.font = `600 26px ${CARD_FONT}`;
    ctx.fillText(
      "Not enough published rates data to compare this combination.",
      56,
      y + 60
    );
  } else {
    y += 38;
    ctx.fillStyle = CARD_INK_SOFT;
    ctx.font = `700 20px ${CARD_FONT}`;
    ctx.fillText("CHANGE TO THE AVERAGE RESIDENTIAL RATES BILL", 56, y);

    // Biggest movers, both directions, largest absolute change first.
    const shown = [...rows]
      .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
      .slice(0, 5)
      .sort((a, b) => b.change - a.change);

    const maxAbs = Math.max(...shown.map((r) => Math.abs(r.change)), 1);
    // Names sit in their own left column: a diverging bar grows both ways, so
    // a label hung off the zero line gets painted over by its own bar.
    const nameX = 56;
    const nameMax = 280;
    const zeroX = 646;
    const maxBar = 240;
    // Councils excluded from the blend get named. A card that says "4
    // councils" and draws three bars invites exactly the objection this tool
    // shouldn't attract.
    const noData = rates.rows
      .filter((row) => row.change == null)
      .map((row) => row.council.name);

    const legendY = CARD_H - footH - 28;
    const noteY = legendY - 28;
    const chartBottom = (noData.length ? noteY : legendY) - 18;
    const chartTop = y + 24;
    const span = chartBottom - chartTop;
    // Fill the space rather than top-anchoring: a two-council card was
    // leaving half the panel empty.
    const rowH = Math.min(56, span / shown.length);
    // Cap the mark at 24px however much room there is — a fat bar reads as
    // decoration, and the leftover band is meant to be air.
    const barH = Math.max(18, Math.min(24, rowH - 24));
    const top = chartTop + Math.max(0, (span - rowH * shown.length) / 2);

    // Zero line — the neutral midpoint of the diverging scale.
    ctx.strokeStyle = CARD_RULE;
    ctx.lineWidth = 2;
    const pad = (rowH - barH) / 2;
    ctx.beginPath();
    ctx.moveTo(zeroX, top + pad - 6);
    ctx.lineTo(zeroX, top + (shown.length - 1) * rowH + pad + barH + 6);
    ctx.stroke();

    shown.forEach((row, i) => {
      const rowY = top + i * rowH;
      const barY = rowY + (rowH - barH) / 2;
      // Keep a hairline of bar visible even for a near-zero change.
      const w = Math.max(3, (Math.abs(row.change) / maxAbs) * maxBar);
      const up = row.change > 0;

      ctx.textBaseline = "middle";
      ctx.fillStyle = CARD_INK;
      ctx.textAlign = "left";
      const nameSize = fitText(ctx, row.council.name, nameMax, 22, 600);
      ctx.font = `600 ${nameSize}px ${CARD_FONT}`;
      ctx.fillText(row.council.name, nameX, barY + barH / 2);

      ctx.fillStyle = up ? CARD_MORE : CARD_LESS;
      roundedBar(ctx, zeroX + (up ? 1 : -1), barY, w, barH, 4, up);

      // Direct label at the outer tip of every bar: the secondary encoding
      // that lets the pair stay legible without relying on hue.
      ctx.fillStyle = CARD_INK;
      ctx.font = `700 22px ${CARD_FONT}`;
      ctx.textAlign = up ? "left" : "right";
      ctx.fillText(
        signed(row.change),
        up ? zeroX + w + 14 : zeroX - w - 14,
        barY + barH / 2
      );
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
    });

    if (noData.length) {
      ctx.textBaseline = "middle";
      ctx.fillStyle = CARD_INK_SOFT;
      ctx.font = `600 18px ${CARD_FONT}`;
      const label =
        noData.length === 1
          ? `${noData[0]} publishes no average residential bill and is not in the blend.`
          : `${noData.slice(0, 3).join(", ")}${noData.length > 3 ? " and others" : ""} publish no average residential bill and are not in the blend.`;
      ctx.fillText(label, 56, noteY);
      ctx.textBaseline = "alphabetic";
    }

    // Legend — identity never rests on colour alone.
    ctx.textBaseline = "middle";
    ctx.fillStyle = CARD_MORE;
    ctx.fillRect(56, legendY - 6, 13, 13);
    ctx.fillStyle = CARD_INK_SOFT;
    ctx.font = `600 19px ${CARD_FONT}`;
    ctx.fillText(`Ratepayers pay more (${finding.rising.length})`, 78, legendY);
    const shift =
      78 + ctx.measureText(`Ratepayers pay more (${finding.rising.length})`).width + 30;
    ctx.fillStyle = CARD_LESS;
    ctx.fillRect(shift, legendY - 6, 13, 13);
    ctx.fillStyle = CARD_INK_SOFT;
    ctx.fillText(`Ratepayers pay less (${finding.falling.length})`, shift + 22, legendY);
    ctx.textBaseline = "alphabetic";
  }

  // Footer
  ctx.fillStyle = CARD_INK;
  ctx.fillRect(0, CARD_H - footH, CARD_W, footH);
  ctx.textBaseline = "middle";
  ctx.fillStyle = CARD_PAPER;
  ctx.font = `700 22px ${CARD_FONT}`;
  ctx.fillText(
    rates.blended
      ? `Blended average bill ${money(rates.blended)} a year`
      : "Indicative modelling",
    56,
    CARD_H - footH / 2
  );
  ctx.font = `600 20px ${CARD_FONT}`;
  ctx.globalAlpha = 0.75;
  ctx.textAlign = "right";
  const disclosure = "Indicative only. Rates changes subject to transition arrangements.";
  const disclosureSize = fitText(ctx, disclosure, 610, 18, 600);
  ctx.font = `600 ${disclosureSize}px ${CARD_FONT}`;
  ctx.fillText(disclosure, CARD_W - 56, CARD_H - footH / 2);
  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  return canvas;
}

function ShareIcon({ type }) {
  if (type === "download") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M4 20h16" />
      </svg>
    );
  }
  if (type === "copy") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M15 5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15" />
      </svg>
    );
  }
  if (type === "check") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </svg>
    );
  }
  if (type === "link") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M10 13a5 5 0 0 0 7.1.1l2-2A5 5 0 0 0 12 4l-1.2 1.2" />
        <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.2-1.2" />
      </svg>
    );
  }
  if (type === "share") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 16V3" />
        <path d="m7 8 5-5 5 5" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
      </svg>
    );
  }
  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }
  if (type === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.3L3.5 20l1.2-4.4a8.4 8.4 0 1 1 15.8-4Z" />
        <path d="M8.2 7.8c.5 3.9 2.5 6 6.3 6.6" />
        <path d="m8.2 7.8 1.9-.9 1.4 2.5-1.1 1.2M14.5 14.4l1.1-1.2 2.4 1.5-.8 1.8" />
      </svg>
    );
  }
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path className="simpleShareSolid" d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v6h4v-6h3.5l.5-4h-4V9c0-.7.3-1 1-1Z" />
      </svg>
    );
  }
  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle className="simpleShareSolid" cx="6" cy="5.5" r="2" />
        <path className="simpleShareSolid" d="M4 9h4v11H4zM11 9h3.8v1.5c.8-1.2 2-2 3.8-2 3.1 0 4.4 2 4.4 5.5v6h-4v-5.3c0-1.7-.6-2.7-1.9-2.7-1.5 0-2.1 1-2.1 3.1V20h-4z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle className="simpleShareSolid" cx="5" cy="12" r="2" />
      <circle className="simpleShareSolid" cx="12" cy="12" r="2" />
      <circle className="simpleShareSolid" cx="19" cy="12" r="2" />
    </svg>
  );
}

const POPULATION_SHARE_COLORS = [
  "#c7461b",
  "#286f9b",
  "#7a5195",
  "#2f7d62",
  "#d18b21",
  "#9d3f63",
  "#536f22",
  "#5c57a8",
];

function ResultShareBar({ members }) {
  const total = members.reduce((sum, m) => sum + m.pop, 0) || 1;
  const sorted = [...members].sort((a, b) => b.pop - a.pop);

  return (
    <div className="simpleShare" aria-label="Share of the merged population">
      <div className="simpleShareBar">
        {sorted.map((m, i) => (
          <span
            key={m.id}
            style={{
              width: `${(m.pop / total) * 100}%`,
              backgroundColor: POPULATION_SHARE_COLORS[i % POPULATION_SHARE_COLORS.length],
            }}
          />
        ))}
      </div>
      <div className="simpleShareLegend">
        {sorted.map((m, i) => (
          <span key={m.id}>
            <i
              className="simpleShareLegendSwatch"
              style={{
                backgroundColor: POPULATION_SHARE_COLORS[i % POPULATION_SHARE_COLORS.length],
              }}
              aria-hidden="true"
            />
            {m.name} <strong>{Math.round((m.pop / total) * 100)}%</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("start");
  const [region, setRegion] = useState("");
  const [allCouncils, setAllCouncils] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [query, setQuery] = useState("");
  const [customName, setCustomName] = useState("");
  const [talksActive, setTalksActive] = useState(false);
  const [copied, setCopied] = useState("");
  const [cardBusy, setCardBusy] = useState(false);
  const [cardPreview, setCardPreview] = useState("");

  useEffect(() => {
    try {
      const match = /[#&]m=([^&]+)/.exec(window.location.hash || "");
      const queryCode = new URLSearchParams(window.location.search).get("m");
      const sharedCode = queryCode || (match ? match[1] : "");
      if (!sharedCode) return;
      const decoded = decodeMap(decodeURIComponent(sharedCode));
      if (!decoded || !decoded.groups.length) return;
      const first = decoded.groups[0];
      const ids = Object.entries(decoded.assignment)
        .filter(([, groupId]) => groupId === first.id)
        .map(([id]) => id)
        .filter((id) => BY_ID[id] && !BY_ID[id].locked);
      if (ids.length < 2) return;
      const regions = [...new Set(ids.map((id) => BY_ID[id].region))];
      const restoredMembers = ids.map((id) => BY_ID[id]).filter(Boolean);
      const matchingPresetNames = Object.values(PRESETS).flatMap((preset) =>
        preset.groups
          .filter((group) => {
            const presetIds = [...group.ids].sort();
            const restoredIds = [...ids].sort();
            return presetIds.length === restoredIds.length &&
              presetIds.every((id, index) => id === restoredIds[index]);
          })
          .map((group) => group.name)
      );
      const allowedNames = new Set([...nameCandidates(restoredMembers), ...matchingPresetNames]);
      setSelectedIds(ids);
      setRegion(regions.length === 1 ? regions[0] : "");
      setAllCouncils(regions.length > 1);
      setCustomName(allowedNames.has(first.name) ? first.name : "");
      setScreen("result");
    } catch (error) {
      // An invalid shared link should simply open the normal start screen.
    }
  }, []);

  const members = useMemo(
    () => selectedIds.map((id) => BY_ID[id]).filter(Boolean),
    [selectedIds]
  );

  const councilProximity = useMemo(() => {
    const anchorRegions = new Set(
      selectedIds.length
        ? selectedIds.map((id) => BY_ID[id]?.region).filter(Boolean)
        : region
          ? [region]
          : []
    );
    const neighbouringRegions = new Set();
    anchorRegions.forEach((anchor) => {
      (REGION_NEIGHBOURS[anchor] || []).forEach((neighbour) => {
        if (!anchorRegions.has(neighbour)) neighbouringRegions.add(neighbour);
      });
    });
    const linkedCouncils = new Map();
    CROSS_LINKS.forEach((link) => {
      if (selectedIds.includes(link.a) && !selectedIds.includes(link.b)) {
        linkedCouncils.set(link.b, link.label);
      }
      if (selectedIds.includes(link.b) && !selectedIds.includes(link.a)) {
        linkedCouncils.set(link.a, link.label);
      }
    });
    return { anchorRegions, neighbouringRegions, linkedCouncils };
  }, [region, selectedIds]);

  const availableCouncils = useMemo(() => {
    const base = allCouncils
      ? COUNCILS.filter((c) => !c.locked)
      : COUNCILS.filter((c) => c.region === region && !c.locked);
    if (allCouncils) {
      base.sort((a, b) => {
        const tier = (c) => {
          if (selectedIds.includes(c.id)) return 0;
          if (councilProximity.linkedCouncils.has(c.id)) return 1;
          if (councilProximity.anchorRegions.has(c.region)) return 2;
          if (councilProximity.neighbouringRegions.has(c.region)) return 3;
          return 4;
        };
        const tierDifference = tier(a) - tier(b);
        if (tierDifference) return tierDifference;
        const regionDifference = a.region.localeCompare(b.region, "en-NZ");
        if (regionDifference) return regionDifference;
        return a.name.localeCompare(b.name, "en-NZ");
      });
    }
    const term = query.trim().toLocaleLowerCase("en-NZ");
    if (!term) return base;
    return base.filter(
      (c) =>
        selectedIds.includes(c.id) ||
        c.name.toLocaleLowerCase("en-NZ").includes(term) ||
        c.region.toLocaleLowerCase("en-NZ").includes(term)
    );
  }, [allCouncils, councilProximity, query, region, selectedIds]);

  const councilSections = useMemo(() => {
    const selected = availableCouncils.filter((c) => selectedIds.includes(c.id));
    const unselected = availableCouncils.filter((c) => !selectedIds.includes(c.id));
    const nearby = unselected.filter(
      (c) =>
        councilProximity.linkedCouncils.has(c.id) ||
        councilProximity.anchorRegions.has(c.region) ||
        councilProximity.neighbouringRegions.has(c.region)
    );
    const distant = unselected.filter(
      (c) =>
        !councilProximity.linkedCouncils.has(c.id) &&
        !councilProximity.anchorRegions.has(c.region) &&
        !councilProximity.neighbouringRegions.has(c.region)
    );
    const byRegion = (councils) =>
      [...REGIONS_N, ...REGIONS_S]
        .map((regionName) => ({
          region: regionName,
          councils: councils.filter((c) => c.region === regionName),
        }))
        .filter((group) => group.councils.length);
    return {
      selected,
      nearbyByRegion: byRegion(nearby),
      distantByRegion: byRegion(distant),
    };
  }, [availableCouncils, councilProximity, selectedIds]);

  const candidates = useMemo(() => nameCandidates(members), [members]);
  const generatedName = candidates[0] || "New council";
  const councilName = customName.trim() || generatedName;
  const selectableNames = useMemo(
    () => [...new Set([customName.trim(), ...candidates].filter(Boolean))].slice(0, 8),
    [candidates, customName]
  );
  const rates = useMemo(() => simpleRates(members), [members]);

  const totalPopulation = members.reduce((sum, m) => sum + m.pop, 0);
  const totalArea = members.reduce((sum, m) => sum + m.area, 0);
  const largest = [...members].sort((a, b) => b.pop - a.pop)[0];
  const largestShare = largest && totalPopulation ? Math.round((largest.pop / totalPopulation) * 100) : 0;
  const rising = rates.rows.filter((row) => row.change > 0);
  const falling = rates.rows.filter((row) => row.change < 0);
  const maxRateChange = Math.max(
    1,
    ...rates.rows.map((row) => Math.abs(row.change || 0))
  );

  const startRegion = () => {
    if (!region) return;
    setTalksActive(false);
    setAllCouncils(false);
    setSelectedIds([]);
    setQuery("");
    setScreen("build");
  };

  const startAcrossRegions = () => {
    setTalksActive(false);
    setRegion("");
    setAllCouncils(true);
    setSelectedIds([]);
    setQuery("");
    setScreen("build");
  };

  const expandToAllRegions = () => {
    setAllCouncils(true);
    setQuery("");
  };

  const openCurrentTalks = () => {
    setTalksActive(false);
    setSelectedIds([]);
    setQuery("");
    setScreen("talks");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadTalkCombination = (combination) => {
    const ids = combination.ids.filter((id) => BY_ID[id] && !BY_ID[id].locked);
    const regions = [...new Set(ids.map((id) => BY_ID[id].region))];
    setTalksActive(true);
    setRegion(regions.length === 1 ? regions[0] : "");
    setAllCouncils(regions.length > 1);
    setSelectedIds(ids);
    setCustomName(combination.name);
    setScreen("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleCouncil = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const showResult = () => {
    if (selectedIds.length < 2) return;
    setCustomName("");
    setScreen("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editSelection = () => {
    setScreen("build");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startOver = () => {
    try {
      if (/^https?:$/.test(window.location.protocol)) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (error) {
      // Clearing a fragment is optional in embedded previews.
    }
    setScreen("start");
    setRegion("");
    setAllCouncils(false);
    setSelectedIds([]);
    setQuery("");
    setCustomName("");
    setTalksActive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const makeUrl = () => {
    const group = { id: "simple", name: councilName, color: COLORS[0] };
    const assignment = Object.fromEntries(selectedIds.map((id) => [id, group.id]));
    const code = encodeMap([group], assignment, "bill", "r26");
    if (!code) return "";
    try {
      if (/^https?:$/.test(window.location.protocol)) {
        const isLocalPreview = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(
          window.location.hostname
        );
        const baseUrl = isLocalPreview
          ? PUBLIC_APP_URL
          : `${window.location.origin}${window.location.pathname}`;
        return `${baseUrl}?m=${code}`;
      }
    } catch (error) {
      // Fall back to the public site in local or embedded environments.
    }
    return `${PUBLIC_APP_URL}?m=${code}`;
  };

  const finding = useMemo(
    () => shareFinding({ councilName, members, rates, totalPopulation }),
    [councilName, members, rates, totalPopulation]
  );

  const flash = (key) => {
    setCopied(key);
    window.clearTimeout(flash.timer);
    flash.timer = window.setTimeout(() => setCopied(""), 2400);
  };

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      flash(key);
      return true;
    } catch (error) {
      // Clipboard is blocked in some embedded and insecure contexts.
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (fallbackError) {
        ok = false;
      }
      document.body.removeChild(field);
      if (ok) flash(key);
      return ok;
    }
  };

  const renderCard = async () => {
    // Wait for the webfont so the card doesn't render in the fallback face.
    try {
      if (document.fonts && document.fonts.load) {
        await document.fonts.load(`800 68px 'Bricolage Grotesque'`);
        await document.fonts.ready;
      }
    } catch (error) {
      // A missing webfont only affects the card's typeface, not its content.
    }
    const canvas = document.createElement("canvas");
    drawShareCard(canvas, finding, rates, totalArea);
    return canvas;
  };

  const cardFileName =
    `${councilName.replace(/[^\wÀ-ɏḀ-ỿ-]+/g, "-").toLowerCase()}-amalgamator.png`;

  const saveCardDataUrl = (dataUrl) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = cardFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    flash("card");
  };

  const downloadCard = async () => {
    setCardBusy(true);
    try {
      if (cardPreview) {
        saveCardDataUrl(cardPreview);
        return;
      }
      const canvas = await renderCard();
      saveCardDataUrl(canvas.toDataURL("image/png"));
    } finally {
      setCardBusy(false);
    }
  };

  const copyPost = () => copyText(sharePostText(finding, makeUrl()), "post");

  const copyLink = () => copyText(makeUrl(), "link");

  const buildLinkedInLink = (shareUrl = makeUrl()) => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  };

  const buildFacebookFallbackLink = (shareUrl = makeUrl()) => {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  };

  const isMobileShareDevice = () =>
    navigator.userAgentData?.mobile === true ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const buildFacebookDialogLink = (shareUrl = makeUrl()) => {
    if (!FACEBOOK_APP_ID) return "";
    const dialogUrl = new URL("https://www.facebook.com/dialog/share");
    dialogUrl.searchParams.set("app_id", FACEBOOK_APP_ID);
    dialogUrl.searchParams.set("display", "page");
    dialogUrl.searchParams.set("href", shareUrl);
    dialogUrl.searchParams.set("redirect_uri", PUBLIC_APP_URL);
    return dialogUrl.toString();
  };

  const shareOnLinkedIn = () => {
    window.open(buildLinkedInLink(), "_blank", "noopener,noreferrer");
  };

  const shareOnFacebook = () => {
    const shareUrl = makeUrl();
    const dialogUrl = buildFacebookDialogLink(shareUrl);
    if (dialogUrl) {
      window.open(dialogUrl, "_blank", "noopener,noreferrer");
      return;
    }

    window.open(buildFacebookFallbackLink(shareUrl), "_blank", "noopener,noreferrer");
  };

  const shareOnMobile = async () => {
    const shareUrl = makeUrl();
    const shareData = {
      title: `${councilName} — The Amalgamator`,
      text: finding.summary,
      url: shareUrl,
    };

    if (
      navigator.share &&
      (!navigator.canShare || navigator.canShare(shareData))
    ) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }

    // Some embedded or older mobile browsers do not expose native sharing.
    // Keep the result useful by copying the same direct link instead.
    await copyText(shareUrl, "link");
  };

  const mobileShareDevice = isMobileShareDevice();

  // Keep a preview available for people who want to download and reuse the
  // share image separately.
  useEffect(() => {
    let cancelled = false;
    if (screen !== "result" || members.length < 2) {
      setCardPreview("");
      return undefined;
    }
    (async () => {
      try {
        const canvas = await renderCard();
        if (!cancelled) setCardPreview(canvas.toDataURL("image/png"));
      } catch (error) {
        if (!cancelled) setCardPreview("");
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, finding, rates, totalArea, members.length]);

  const renderCouncilChoice = (council) => {
    const checked = selectedIds.includes(council.id);
    return (
      <label
        key={council.id}
        className={`simpleCouncil ${checked ? "simpleCouncilSelected" : ""}`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => toggleCouncil(council.id)}
        />
        <span className="simpleCouncilCopy">
          <strong>{council.name}</strong>
          <span>
            {fmtPop(council.pop)} people
            {allCouncils ? ` · ${council.region}` : ""}
          </span>
          {allCouncils && councilProximity.linkedCouncils.has(council.id) && (
            <span
              className="simpleCouncilRelation"
              title={councilProximity.linkedCouncils.get(council.id)}
            >
              Direct cross-boundary option
            </span>
          )}
          {allCouncils &&
            !councilProximity.linkedCouncils.has(council.id) &&
            councilProximity.neighbouringRegions.has(council.region) && (
              <span className="simpleCouncilRelation">Neighbouring region</span>
            )}
        </span>
      </label>
    );
  };

  return (
    <div className="simpleApp">
      <style>{SIMPLE_CSS}</style>
      <a className="simpleSkip" href="#simpleMain">Skip to the main content</a>

      <header className="simpleHeader">
        <button className="simpleBrand" type="button" onClick={startOver}>
          The Amalgamator
        </button>
        {screen !== "start" && (
          <button className="simpleHeaderAction" type="button" onClick={startOver}>
            Start over
          </button>
        )}
      </header>

      <main id="simpleMain">
        {screen === "start" && (
          <section className="simpleStart">
            <p className="simpleEyebrow">Aotearoa local government explorer</p>
            <h1>Build a bigger council.</h1>
            <p className="simpleLead">
              Choose a region, pick the councils, and see who could pay more or less.
            </p>

            <div className="simpleStartOptions">
              <button
                className="simpleExample simpleTalksEntry"
                type="button"
                onClick={openCurrentTalks}
              >
                <span>
                  <strong>Not sure where to begin?</strong>
                  Start from all {PRESETS.article.groups.length} reported council combinations.
                </span>
                <span aria-hidden="true">View current talks</span>
              </button>
            </div>

            <div className="simpleChoiceDivider"><span>Or build your own</span></div>

            <div className="simpleStartCard">
              <label htmlFor="simpleRegion">Where do you want to start?</label>
              <select
                id="simpleRegion"
                value={region}
                onChange={(event) => setRegion(event.target.value)}
              >
                <option value="">Choose a region</option>
                {SIMPLE_REGIONS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <button
                className="simplePrimary simpleFull"
                type="button"
                disabled={!region}
                onClick={startRegion}
              >
                Choose councils
              </button>
              <button className="simpleTextButton" type="button" onClick={startAcrossRegions}>
                I need councils from different regions
              </button>
            </div>

            <p className="simpleIndependence">
              Independent modelling tool. It is not an official proposal or a prediction of any household’s rates.
            </p>
          </section>
        )}

        {screen === "talks" && (
          <section className="simpleTalks">
            <div className="simplePageHead">
              <p className="simpleEyebrow">Optional starting point</p>
              <h1>Where talks stand</h1>
              <p>
                Every reported combination in this snapshot is shown below. Choose one
                to explore it, then change the councils if you want.
              </p>
            </div>

            <div className="simpleTalksNotice">
              <strong>Snapshot updated 26 July 2026</strong>
              <span>
                These are reported discussions and stated positions, not endorsements,
                predictions, or final proposals.
              </span>
            </div>

            <div className="simpleTalkGrid" aria-label="Reported council combinations">
              {PRESETS.article.groups.map((combination) => {
                const combinationMembers = combination.ids.map((id) => BY_ID[id]).filter(Boolean);
                const combinationRegions = [...new Set(combinationMembers.map((m) => m.region))];
                const combinationPopulation = combinationMembers.reduce((sum, m) => sum + m.pop, 0);
                return (
                  <button
                    className="simpleTalkCard"
                    type="button"
                    key={combination.name}
                    onClick={() => loadTalkCombination(combination)}
                  >
                    <span className="simpleTalkRegion">{combinationRegions.join(" · ")}</span>
                    <strong>{combination.name}</strong>
                    <span className="simpleTalkMembers">
                      {combinationMembers.map((m) => m.name).join(" + ")}
                    </span>
                    <span className="simpleTalkMeta">
                      {combinationMembers.length} councils · {fmtPop(combinationPopulation)} people
                    </span>
                  </button>
                );
              })}
            </div>

            <details className="simpleExploring">
              <summary>Councils still exploring options</summary>
              <div>
                {Object.entries(EXPLORING).map(([id, status]) => (
                  <article key={id}>
                    <strong>{BY_ID[id]?.name || id}</strong>
                    <p>{status}</p>
                  </article>
                ))}
              </div>
            </details>

            <button className="simpleSecondary" type="button" onClick={startOver}>
              Back to the start
            </button>
          </section>
        )}

        {screen === "build" && (
          <section className="simpleBuild">
            <div className="simplePageHead">
              <p className="simpleEyebrow">Step 1 of 2</p>
              <h1>Which councils should join?</h1>
              <p>
                {allCouncils
                  ? "Search across Aotearoa and choose at least two councils."
                  : `Choose at least two councils in ${region}.`}
              </p>
            </div>

            {!allCouncils && (
              <div className="simpleCrossRegion">
                <div>
                  <strong>Need a council from somewhere else?</strong>
                  <span>Your current selections will stay selected.</span>
                </div>
                <button className="simpleSecondary" type="button" onClick={expandToAllRegions}>
                  Add councils from another region
                </button>
              </div>
            )}

            {allCouncils && region && (
              <div className="simpleCrossRegion simpleCrossRegionActive" role="status">
                <div>
                  <strong>All regions are available</strong>
                  <span>
                    Nearby options are separated from councils further afield.
                    The groups update as you select.
                  </span>
                </div>
              </div>
            )}

            {(allCouncils || availableCouncils.length > 7) && (
              <label className="simpleSearch">
                <span>Find a council</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Type a council or region"
                />
              </label>
            )}

            {!allCouncils && (
              <div className="simpleCouncilList" aria-label="Councils">
                {availableCouncils.map(renderCouncilChoice)}
              </div>
            )}

            {allCouncils && availableCouncils.length > 0 && (
              <div className="simpleGeoChoices">
                {councilSections.selected.length > 0 && (
                  <section className="simpleSelectedZone" aria-labelledby="selectedCouncilsHeading">
                    <h2 id="selectedCouncilsHeading">Selected councils</h2>
                    <div className="simpleCouncilList">
                      {councilSections.selected.map(renderCouncilChoice)}
                    </div>
                  </section>
                )}

                {councilSections.nearbyByRegion.length > 0 && (
                  <section className="simpleNearbyZone" aria-labelledby="nearbyCouncilsHeading">
                    <div className="simpleZoneHead">
                      <p className="simpleEyebrow">Geographically closer</p>
                      <h2 id="nearbyCouncilsHeading">Nearby options</h2>
                      <p>
                        Councils in the same or neighbouring regions are shown here.
                        Documented cross-boundary options are marked.
                      </p>
                    </div>
                    {councilSections.nearbyByRegion.map((group) => (
                      <section className="simpleNearbyRegion" key={group.region}>
                        <h3>{group.region}</h3>
                        <div className="simpleCouncilList">
                          {group.councils.map(renderCouncilChoice)}
                        </div>
                      </section>
                    ))}
                  </section>
                )}

                {councilSections.distantByRegion.length > 0 && (
                  <section className="simpleDistantZone" aria-labelledby="distantCouncilsHeading">
                    <div className="simpleZoneHead">
                      <p className="simpleEyebrow">Geographically separate</p>
                      <h2 id="distantCouncilsHeading">Further afield</h2>
                      <p>Open a region to browse its councils.</p>
                    </div>
                    <div className="simpleDistantRegions">
                      {councilSections.distantByRegion.map((group) => (
                        <details
                          className="simpleDistantRegion"
                          key={group.region}
                          open={Boolean(query.trim())}
                        >
                          <summary>
                            <span>{group.region}</span>
                            <span>{group.councils.length} council{group.councils.length === 1 ? "" : "s"}</span>
                          </summary>
                          <div className="simpleCouncilList">
                            {group.councils.map(renderCouncilChoice)}
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {availableCouncils.length === 0 && (
              <p className="simpleEmpty">No councils match that search.</p>
            )}

            <div className="simpleBuildActions">
              <button className="simpleSecondary" type="button" onClick={startOver}>
                Change starting point
              </button>
              <button
                className="simplePrimary"
                type="button"
                disabled={selectedIds.length < 2}
                onClick={showResult}
              >
                {selectedIds.length < 2
                  ? `Choose ${2 - selectedIds.length} more`
                  : `See result for ${selectedIds.length} councils`}
              </button>
            </div>
          </section>
        )}

        {screen === "result" && members.length >= 2 && (
          <section className="simpleResult">
            {talksActive && (
              <div className="simpleTalkOrigin">
                <span>Started from the current-talks snapshot.</span>
                <button className="simpleTextButton" type="button" onClick={openCurrentTalks}>
                  View all reported combinations
                </button>
              </div>
            )}
            <div className="simplePageHead simpleResultHead">
              <p className="simpleEyebrow">Step 2 of 2</p>
              <p className="simpleOverline">Your new council</p>
              <h1>{councilName}</h1>
              <p>{members.map((m) => m.name).join(" + ")}</p>
              <div className="simpleNameActions">
                <button className="simpleTextButton" type="button" onClick={editSelection}>
                  Change councils
                </button>
              </div>
              {selectableNames.length > 1 && (
                <fieldset className="simpleNameChooser">
                  <legend>Other names</legend>
                  <div>
                    {selectableNames.map((name) => (
                      <button
                        className={`simpleNameChoice ${name === councilName ? "simpleNameChoiceSelected" : ""}`}
                        type="button"
                        key={name}
                        aria-pressed={name === councilName}
                        onClick={() => setCustomName(name)}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>

            <div className="simpleStats" aria-label="Combined council summary">
              <div>
                <span>People</span>
                <strong>{totalPopulation.toLocaleString("en-NZ")}</strong>
              </div>
              <div>
                <span>Land area</span>
                <strong>{Math.round(totalArea).toLocaleString("en-NZ")} km²</strong>
              </div>
              <div>
                <span>Existing councils</span>
                <strong>{members.length}</strong>
              </div>
            </div>

            <article className="simplePanel">
              <div className="simplePanelHead">
                <div>
                  <p className="simpleEyebrow">Residential rates</p>
                  <h2>Which residents could pay more or less?</h2>
                </div>
                {rates.blended != null && (
                  <div className="simpleBlend">
                    <span>Blended average</span>
                    <strong>{money(rates.blended)}</strong>
                    <span>a year</span>
                  </div>
                )}
              </div>

              {rates.blended == null ? (
                <p className="simpleEmpty">
                  There is not enough published residential-bill data for this combination.
                </p>
              ) : (
                <>
                  <p className="simpleAnswer">
                    {rising.length > 0 || falling.length > 0
                      ? `Residents of ${rising.length} of ${rising.length + falling.length} councils would pay more, ${falling.length} would pay less.`
                      : "Published averages are already very similar."}
                  </p>
                  <div className="simpleRateChart">
                    <div className="simpleRateAxis" aria-hidden="true">
                      <span>Could pay less</span>
                      <span>Could pay more</span>
                    </div>
                    <div className="simpleRateRows">
                      {rates.rows.map((row) => (
                        <div className="simpleRateRow" key={row.council.id}>
                          <div className="simpleRateCopy">
                            <strong>{row.council.name}</strong>
                            <span>
                              {row.before == null
                                ? "No published average bill"
                                : `${money(row.before)} now`}
                            </span>
                          </div>
                          {row.change == null ? (
                            <span className="simpleNoData">No data</span>
                          ) : (
                            <>
                              <strong
                                className={
                                  row.change > 0
                                    ? "simpleUp"
                                    : row.change < 0
                                      ? "simpleDown"
                                      : "simpleFlat"
                                }
                              >
                                {row.change > 0 ? "+" : row.change < 0 ? "−" : ""}
                                {money(Math.abs(row.change))} a year
                              </strong>
                              <div className="simpleRateBar" aria-hidden="true">
                                <span className="simpleRateZero" />
                                {row.change !== 0 && (
                                  <span
                                    className={`simpleRateFill ${row.change > 0 ? "simpleRateMore" : "simpleRateLess"}`}
                                    style={{
                                      width: `${Math.max(
                                        2,
                                        (Math.abs(row.change) / maxRateChange) * 50
                                      )}%`,
                                    }}
                                  />
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <details className="simpleDisclosure">
                <summary>How to read this estimate</summary>
                <p>
                  This blends each council’s published 2024/25 average residential bill,
                  weighted by household count. It shows the direction of redistribution,
                  not a forecast for an individual property. The bars share one scale
                  within this result, so the longest bar is the largest dollar change.
                </p>
                <p>
                  Real mergers use property values, targeted rates, differentials, caps,
                  and multi-year transition arrangements. Establishment costs and savings
                  are not included.
                </p>
              </details>
            </article>

            <article className="simplePanel">
              <p className="simpleEyebrow">Balance of the new council</p>
              <h2>Where would most people live?</h2>
              <p className="simpleAnswer">
                <strong>{largest.name}</strong> would account for {largestShare}% of the population.
                {largestShare > 50
                  ? " It would be larger than all the other council areas combined."
                  : " No single area would hold a majority of residents."}
              </p>
              <ResultShareBar members={members} />
              <p className="simpleFinePrint">
                Population share is not voting power. Representation, wards, and local
                boards would be decided separately.
              </p>
            </article>

            <article className="simpleSharePanel">
              <div className="simpleShareHead">
                <p className="simpleEyebrow">Keep the conversation going</p>
                <h2>Share {councilName}</h2>
                <p className="simpleShareLead">{finding.summary}</p>
              </div>

              {cardPreview && (
                <figure className="simpleCardPreview">
                  <img src={cardPreview} alt={`Share card for ${councilName}. ${finding.summary}`} />
                  <figcaption>Preview of the downloadable share image.</figcaption>
                </figure>
              )}

              <div className="simpleSocialShare">
                <h3>Share</h3>
                <div className="simpleSocialShareButtons">
                  {mobileShareDevice ? (
                    <button
                      className="simpleNativeShareButton"
                      type="button"
                      onClick={shareOnMobile}
                      aria-label={`Share ${councilName}`}
                    >
                      <ShareIcon type="share" />
                      Share
                    </button>
                  ) : (
                    <>
                      <button
                        className="simpleSocialIconButton simpleLinkedInIconButton"
                        type="button"
                        onClick={shareOnLinkedIn}
                        aria-label={`Share ${councilName} on LinkedIn`}
                        title="Share on LinkedIn"
                      >
                        <ShareIcon type="linkedin" />
                      </button>
                      <button
                        className="simpleSocialIconButton simpleFacebookIconButton"
                        type="button"
                        onClick={shareOnFacebook}
                        aria-label={`Share ${councilName} on Facebook`}
                        title="Share on Facebook"
                      >
                        <ShareIcon type="facebook" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="simpleShareSecondary">
                <button type="button" onClick={downloadCard} disabled={cardBusy}>
                  <ShareIcon type={copied === "card" ? "check" : "download"} />
                  {copied === "card" ? "Image saved" : "Download image"}
                </button>
                <button type="button" onClick={copyPost}>
                  <ShareIcon type={copied === "post" ? "check" : "copy"} />
                  {copied === "post" ? "Write-up copied" : "Copy write-up"}
                </button>
                <button type="button" onClick={copyLink}>
                  <ShareIcon type={copied === "link" ? "check" : "link"} />
                  {copied === "link" ? "Link copied" : "Copy link"}
                </button>
              </div>
              <p className="simpleShareStatus" role="status" aria-live="polite">
                {copied === "card"
                  ? "Image saved to your downloads."
                  : copied === "post"
                    ? "Write-up copied."
                    : copied === "link"
                      ? "Link copied."
                      : ""}
              </p>
            </article>

            <div className="simpleEndActions">
              <button className="simpleSecondary" type="button" onClick={editSelection}>
                Change councils
              </button>
              <button className="simpleTextButton" type="button" onClick={startOver}>
                Build another council
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="simpleFooter">
        <div>
          <strong>The Amalgamator</strong>
          <span>Independent modelling for local government reform.</span>
        </div>
        <nav aria-label="More information">
          <a href="methodology.html">Methodology</a>
          <a href="privacy-policy/">Privacy</a>
          <a href="the-amalgamator-data.csv" download>Download the data</a>
          <a href="https://github.com/Kasukabe914/localgovernment" target="_blank" rel="noreferrer">
            Source code
          </a>
        </nav>
      </footer>
    </div>
  );
}

const SIMPLE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&display=swap');

.simpleApp {
  --ink: #193036;
  --ink-soft: #4d6267;
  --sea: #dfeff0;
  --paper: #fbf8ef;
  --white: #ffffff;
  --accent: #d94720;
  --accent-dark: #ae3214;
  --line: #b8c9ca;
  --good: #1f7250;
  --bad: #ad3936;
  min-height: 100vh;
  background: var(--sea);
  color: var(--ink);
  font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

.simpleApp *,
.simpleApp *::before,
.simpleApp *::after { box-sizing: border-box; }
.simpleApp button,
.simpleApp input,
.simpleApp select { font: inherit; }
.simpleApp button,
.simpleApp select,
.simpleApp summary,
.simpleApp label { -webkit-tap-highlight-color: transparent; }
.simpleApp a { color: inherit; }
.simpleApp h1,
.simpleApp h2,
.simpleApp p { margin-top: 0; }

.simpleSkip {
  position: fixed;
  left: 12px;
  top: -80px;
  z-index: 100;
  background: var(--ink);
  color: var(--white);
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 700;
}
.simpleSkip:focus { top: 12px; }

.simpleHeader {
  min-height: 68px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.simpleBrand,
.simpleHeaderAction,
.simpleTextButton {
  border: 0;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
}
.simpleBrand {
  padding: 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.simpleHeaderAction,
.simpleTextButton {
  padding: 7px 3px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.simpleStart,
.simpleTalks,
.simpleBuild,
.simpleResult {
  width: min(100% - 32px, 800px);
  margin: 0 auto;
}
.simpleStart {
  --start-box-gap: 72px;
  min-height: calc(100vh - 190px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 44px 0 72px;
}
.simpleEyebrow,
.simpleOverline {
  margin-bottom: 8px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.simpleStart > h1,
.simplePageHead > h1 {
  margin-bottom: 18px;
  font-size: clamp(44px, 9vw, 78px);
  line-height: 0.96;
  letter-spacing: -0.055em;
}
.simpleLead {
  max-width: 600px;
  margin-bottom: 30px;
  color: var(--ink-soft);
  font-size: clamp(18px, 3vw, 23px);
  line-height: 1.4;
}

.simpleStartCard {
  position: relative;
  z-index: 1;
  max-width: 560px;
  padding: 22px;
  display: grid;
  gap: 12px;
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 18px;
  box-shadow: 7px 7px 0 var(--ink);
}
.simpleStartCard label,
.simpleSearch > span {
  font-size: 14px;
  font-weight: 800;
}
.simpleStartCard select,
.simpleSearch input,
.simpleShareInput {
  width: 100%;
  min-height: 50px;
  padding: 11px 13px;
  background: var(--white);
  color: var(--ink);
  border: 1.5px solid var(--line);
  border-radius: 10px;
}

.simplePrimary,
.simpleSecondary {
  min-height: 48px;
  padding: 11px 18px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 800;
  transition: transform 140ms ease, background 140ms ease;
}
.simplePrimary {
  background: var(--accent);
  color: var(--white);
  border: 2px solid var(--accent);
}
.simplePrimary:hover { background: var(--accent-dark); border-color: var(--accent-dark); }
.simplePrimary:disabled {
  background: #91a3a5;
  border-color: #91a3a5;
  cursor: not-allowed;
}
.simpleSecondary {
  background: transparent;
  color: var(--ink);
  border: 2px solid var(--ink);
}
.simpleSecondary:hover { background: var(--ink); color: var(--white); }
.simplePrimary:not(:disabled):active,
.simpleSecondary:active { transform: translateY(1px); }
.simpleFull { width: 100%; }

.simpleStartOptions {
  max-width: 560px;
  margin-top: 0;
  display: grid;
  gap: 10px;
}
.simpleExample {
  width: 100%;
  padding: 17px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  background: transparent;
  color: var(--ink);
  border: 1.5px solid rgba(25, 48, 54, 0.35);
  border-radius: 14px;
  cursor: pointer;
  text-align: left;
}
.simpleTalksEntry {
  padding: 22px;
  background: var(--ink);
  color: var(--white);
  border: 2px solid var(--ink);
  box-shadow: 6px 6px 0 var(--accent);
}
.simpleExample:hover { background: rgba(255, 255, 255, 0.45); }
.simpleTalksEntry:hover { background: #27434a; }
.simpleExample > span:first-child {
  display: grid;
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleExample strong { color: var(--ink); font-size: 15px; }
.simpleExample.simpleTalksEntry > span:first-child,
.simpleExample.simpleTalksEntry strong { color: var(--white); }
.simpleExample.simpleTalksEntry > span:first-child {
  gap: 4px;
  font-size: 14px;
  line-height: 1.45;
}
.simpleExample.simpleTalksEntry strong { font-size: 20px; }
.simpleExample > span:last-child {
  flex: none;
  font-size: 13px;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.simpleExample.simpleTalksEntry > span:last-child {
  padding: 10px 16px;
  background: var(--accent);
  color: var(--white);
  border-radius: 999px;
  font-size: 15px;
  text-decoration: none;
}
.simpleChoiceDivider {
  max-width: 560px;
  min-height: 18px;
  margin: calc((var(--start-box-gap) - 18px) / 2) 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.simpleChoiceDivider::before,
.simpleChoiceDivider::after {
  height: 1px;
  flex: 1;
  background: rgba(25, 48, 54, 0.28);
  content: "";
}
.simpleApp .simpleIndependence {
  position: relative;
  z-index: 2;
  max-width: 560px;
  margin: var(--start-box-gap) 0 0;
  padding: 12px 14px;
  background: var(--white);
  color: var(--ink-soft);
  border: 1.5px solid var(--line);
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.5;
}

.simpleTalks,
.simpleBuild,
.simpleResult { padding: 54px 0 90px; }
.simplePageHead { margin-bottom: 30px; }
.simplePageHead > p:last-child {
  max-width: 650px;
  color: var(--ink-soft);
  font-size: 18px;
}
.simpleBuild .simplePageHead > h1 { font-size: clamp(38px, 7vw, 64px); }

.simpleTalks .simplePageHead > h1 { font-size: clamp(42px, 8vw, 70px); }
.simpleTalksNotice {
  margin-bottom: 20px;
  padding: 16px 18px;
  display: grid;
  gap: 3px;
  background: var(--paper);
  border-left: 5px solid var(--accent);
  border-radius: 0 12px 12px 0;
}
.simpleTalksNotice span {
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleTalkGrid {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.simpleTalkCard {
  min-height: 190px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--paper);
  color: var(--ink);
  border: 1.5px solid var(--line);
  border-radius: 16px;
  cursor: pointer;
  text-align: left;
}
.simpleTalkCard:hover {
  background: var(--white);
  border-color: var(--ink);
  transform: translateY(-1px);
}
.simpleTalkCard > strong {
  margin: 6px 0;
  font-size: 21px;
  line-height: 1.15;
}
.simpleTalkRegion,
.simpleTalkMeta {
  color: var(--ink-soft);
  font-size: 12px;
}
.simpleTalkRegion {
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.simpleTalkMembers {
  margin-bottom: 18px;
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.4;
}
.simpleTalkMeta {
  margin-top: auto;
  font-weight: 700;
}
.simpleExploring {
  margin: 4px 0 22px;
  padding: 16px 18px;
  background: rgba(255, 255, 255, 0.5);
  border: 1.5px solid var(--line);
  border-radius: 14px;
}
.simpleExploring summary {
  cursor: pointer;
  font-weight: 800;
}
.simpleExploring > div {
  margin-top: 15px;
  display: grid;
  gap: 12px;
}
.simpleExploring article {
  padding-top: 12px;
  border-top: 1px solid var(--line);
}
.simpleExploring article p {
  margin: 3px 0 0;
  color: var(--ink-soft);
  font-size: 13px;
}

.simpleCrossRegion {
  margin: -8px 0 18px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: 14px;
}
.simpleCrossRegion > div { display: grid; }
.simpleCrossRegion > div span {
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleCrossRegion .simpleSecondary {
  min-height: 42px;
  flex: none;
  padding: 8px 15px;
  font-size: 13px;
}
.simpleCrossRegionActive {
  border-left: 5px solid var(--accent);
}

.simpleSearch {
  margin-bottom: 18px;
  display: grid;
  gap: 7px;
}
.simpleCouncilList {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.simpleCouncil {
  min-height: 84px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.62);
  border: 1.5px solid var(--line);
  border-radius: 14px;
  cursor: pointer;
}
.simpleCouncil:hover { background: var(--white); border-color: var(--ink); }
.simpleCouncilSelected {
  background: var(--paper);
  border: 2px solid var(--ink);
  box-shadow: inset 0 0 0 2px var(--paper);
}
.simpleCouncil input {
  width: 24px;
  height: 24px;
  flex: none;
  accent-color: var(--accent);
}
.simpleCouncilCopy { min-width: 0; display: grid; }
.simpleCouncilCopy strong {
  overflow: hidden;
  font-size: 16px;
  line-height: 1.25;
  text-overflow: ellipsis;
}
.simpleCouncilCopy span {
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleCouncilCopy .simpleCouncilRelation {
  margin-top: 4px;
  color: var(--accent-dark);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.simpleGeoChoices {
  display: grid;
  gap: 24px;
}
.simpleSelectedZone,
.simpleNearbyZone,
.simpleDistantZone {
  padding: 20px;
  border-radius: 18px;
}
.simpleSelectedZone {
  background: var(--ink);
  color: var(--white);
}
.simpleSelectedZone h2 {
  margin: 0 0 12px;
  font-size: 18px;
}
.simpleSelectedZone .simpleCouncil {
  background: var(--paper);
  color: var(--ink);
}
.simpleNearbyZone {
  background: #edf6f0;
  border: 2px solid var(--good);
}
.simpleNearbyZone .simpleEyebrow { color: var(--good); }
.simpleDistantZone {
  background: rgba(255, 255, 255, 0.42);
  border: 2px solid var(--ink);
}
.simpleDistantZone .simpleEyebrow { color: var(--ink); }
.simpleZoneHead {
  margin-bottom: 18px;
}
.simpleZoneHead h2 {
  margin: 0 0 5px;
  font-size: clamp(26px, 4vw, 34px);
  line-height: 1.1;
}
.simpleZoneHead > p:last-child {
  margin: 0;
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleNearbyRegion + .simpleNearbyRegion { margin-top: 20px; }
.simpleNearbyRegion h3 {
  margin: 0 0 9px;
  font-size: 14px;
  letter-spacing: 0.04em;
}
.simpleDistantRegions {
  display: grid;
  gap: 8px;
}
.simpleDistantRegion {
  overflow: hidden;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: 12px;
}
.simpleDistantRegion summary {
  padding: 13px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  cursor: pointer;
  font-weight: 800;
  list-style-position: inside;
}
.simpleDistantRegion summary span:last-child {
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
}
.simpleDistantRegion[open] summary {
  border-bottom: 1px solid var(--line);
}
.simpleDistantRegion .simpleCouncilList {
  padding: 12px;
}
.simpleBuildActions,
.simpleEndActions {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.simpleEmpty {
  padding: 20px;
  color: var(--ink-soft);
  text-align: center;
}

.simpleResultHead {
  padding-bottom: 30px;
  border-bottom: 2px solid var(--ink);
}
.simpleTalkOrigin {
  margin-bottom: 18px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
}
.simpleResultHead .simpleOverline { margin-top: 28px; }
.simpleResultHead > h1 { margin-bottom: 10px; }
.simpleResultHead > p:last-of-type {
  max-width: 720px;
  font-size: 16px;
}
.simpleNameActions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.simpleDisclosure summary {
  cursor: pointer;
  font-size: 13px;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.simpleNameChooser {
  margin: 18px 0 0;
  padding: 0;
  border: 0;
}
.simpleNameChooser legend {
  margin-bottom: 8px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.simpleNameChooser > div {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.simpleNameChoice {
  padding: 8px 13px;
  background: var(--white);
  color: var(--ink);
  border: 1.5px solid var(--line);
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
}
.simpleNameChoice:hover {
  border-color: var(--ink);
}
.simpleNameChoiceSelected {
  background: var(--ink);
  color: var(--white);
  border-color: var(--ink);
}

.simpleStats {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--ink);
  color: var(--white);
  border-radius: 16px;
  overflow: hidden;
}
.simpleStats > div {
  padding: 20px;
  display: grid;
  gap: 3px;
  border-right: 1px solid rgba(255, 255, 255, 0.18);
}
.simpleStats > div:last-child { border-right: 0; }
.simpleStats span { font-size: 12px; opacity: 0.75; }
.simpleStats strong { font-size: clamp(20px, 4vw, 30px); line-height: 1.1; }

.simplePanel,
.simpleSharePanel {
  margin-top: 18px;
  padding: clamp(20px, 4vw, 30px);
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: 18px;
}
.simplePanel h2,
.simpleSharePanel h2 {
  margin-bottom: 12px;
  font-size: clamp(24px, 4vw, 34px);
  line-height: 1.08;
  letter-spacing: -0.025em;
}
.simplePanelHead {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}
.simpleBlend {
  flex: none;
  display: grid;
  text-align: right;
  font-size: 12px;
  color: var(--ink-soft);
}
.simpleBlend strong { color: var(--ink); font-size: 28px; line-height: 1.1; }
.simpleAnswer {
  max-width: 650px;
  margin-bottom: 20px;
  font-size: 18px;
}
.simpleRateChart {
  display: grid;
  gap: 4px;
}
.simpleRateAxis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: var(--ink-soft);
  font-size: 11px;
  font-weight: 700;
}
.simpleRateAxis span:first-child {
  padding-right: 9px;
  text-align: right;
}
.simpleRateAxis span:last-child { padding-left: 9px; }
.simpleRateRows {
  display: grid;
  border-top: 1px solid var(--line);
}
.simpleRateRow {
  padding: 14px 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px 18px;
  border-bottom: 1px solid var(--line);
}
.simpleRateCopy { display: grid; }
.simpleRateCopy span {
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleRateRow > strong { text-align: right; }
.simpleRateBar {
  position: relative;
  grid-column: 1 / -1;
  height: 10px;
  overflow: hidden;
  background: rgba(25, 48, 54, 0.09);
  border-radius: 999px;
}
.simpleRateZero {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 2px solid rgba(25, 48, 54, 0.48);
}
.simpleRateFill {
  position: absolute;
  top: 0;
  bottom: 0;
}
.simpleRateLess {
  right: 50%;
  background: var(--good);
  border-radius: 999px 0 0 999px;
}
.simpleRateMore {
  left: 50%;
  background: var(--bad);
  border-radius: 0 999px 999px 0;
}
.simpleUp { color: var(--bad); }
.simpleDown { color: var(--good); }
.simpleFlat,
.simpleNoData { color: var(--ink-soft); }
.simpleNoData { font-size: 13px; }
.simpleDisclosure {
  margin-top: 18px;
  padding-top: 2px;
}
.simpleDisclosure p {
  max-width: 680px;
  margin: 12px 0 0;
  color: var(--ink-soft);
  font-size: 13px;
}

.simpleShareBar {
  height: 22px;
  display: flex;
  overflow: hidden;
  background: var(--line);
  border: 2px solid var(--ink);
  border-radius: 999px;
}
.simpleShareBar span { display: block; }
.simpleShareBar span + span { border-left: 2px solid var(--paper); }
.simpleShareLegend {
  margin-top: 10px;
  display: flex;
  gap: 8px 16px;
  flex-wrap: wrap;
  color: var(--ink-soft);
  font-size: 12px;
}
.simpleShareLegend > span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.simpleShareLegendSwatch {
  width: 10px;
  height: 10px;
  flex: none;
  border: 1px solid rgba(25, 48, 54, 0.28);
  border-radius: 2px;
}
.simpleShareLegend strong { color: var(--ink); }
.simpleFinePrint {
  margin: 18px 0 0;
  color: var(--ink-soft);
  font-size: 12px;
}

.simpleSharePanel {
  background: var(--ink);
  color: var(--white);
  border-color: var(--ink);
}
.simpleSharePanel .simpleEyebrow { color: rgba(255, 255, 255, 0.72); }
.simpleSharePanel h2 { color: var(--white); }
.simpleShareHead { display: grid; gap: 4px; }
.simpleShareLead {
  margin: 4px 0 0;
  font-size: 16px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.82);
  max-width: 62ch;
}

.simpleCardPreview {
  margin: 18px 0 0;
  display: grid;
  gap: 8px;
  justify-items: start;
}
.simpleCardPreview img {
  width: 100%;
  max-width: 520px;
  height: auto;
  display: block;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.28);
}
.simpleCardPreview figcaption {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.66);
}

.simpleSocialShare {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.simpleSocialShare h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  color: var(--white);
}
.simpleSocialShareButtons {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.simpleSocialIconButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  color: var(--white);
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, transform 120ms ease;
}
.simpleSocialIconButton:hover {
  transform: translateY(-1px);
}
.simpleSocialIconButton:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.72);
  outline-offset: 3px;
}
.simpleNativeShareButton {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 16px;
  font: inherit;
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
  background: var(--white);
  border: 1px solid var(--white);
  border-radius: 999px;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, transform 120ms ease;
}
.simpleNativeShareButton:hover {
  background: var(--paper);
  border-color: var(--paper);
  transform: translateY(-1px);
}
.simpleNativeShareButton:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.72);
  outline-offset: 3px;
}
.simpleLinkedInIconButton {
  background: #0a66c2;
  border-color: #0a66c2;
}
.simpleLinkedInIconButton:hover {
  background: #08529b;
  border-color: #08529b;
}
.simpleFacebookIconButton {
  background: #1877f2;
  border-color: #1877f2;
}
.simpleFacebookIconButton:hover {
  background: #0c5fca;
  border-color: #0c5fca;
}

.simpleShareSecondary {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.simpleShareSecondary button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  font-size: 14px;
  font-weight: 700;
  color: var(--white);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 999px;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease;
}
.simpleShareSecondary button:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.6);
}
.simpleShareSecondary button:disabled { opacity: 0.55; cursor: default; }
.simpleShareStatus {
  margin: 10px 0 0;
  min-height: 18px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.76);
}
.simpleSharePanel svg {
  width: 18px;
  height: 18px;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.simpleSharePanel .simpleShareSolid {
  fill: currentColor;
  stroke: none;
}
.simpleFooter {
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 22px 44px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 26px;
  color: var(--ink-soft);
  border-top: 1px solid rgba(25, 48, 54, 0.24);
  font-size: 12px;
}
.simpleFooter > div { display: grid; }
.simpleFooter strong { color: var(--ink); font-size: 14px; }
.simpleFooter nav { display: flex; gap: 16px; flex-wrap: wrap; }
.simpleFooter a { font-weight: 700; }

.simpleApp button:focus-visible,
.simpleApp input:focus-visible,
.simpleApp select:focus-visible,
.simpleApp summary:focus-visible,
.simpleApp a:focus-visible,
.simpleCouncil:has(input:focus-visible) {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

@media (max-width: 650px) {
  .simpleHeader { min-height: 58px; padding: 12px 16px; }
  .simpleStart,
  .simpleTalks,
  .simpleBuild,
  .simpleResult { width: min(100% - 24px, 800px); }
  .simpleStart {
    --start-box-gap: 64px;
    justify-content: flex-start;
    padding-top: 40px;
  }
  .simpleStart > h1,
  .simplePageHead > h1 { font-size: clamp(42px, 14vw, 64px); }
  .simpleCouncilList { grid-template-columns: 1fr; }
  .simpleExample {
    align-items: flex-start;
    flex-direction: column;
  }
  .simpleExample.simpleTalksEntry > span:last-child {
    width: 100%;
    text-align: center;
  }
  .simpleCrossRegion {
    align-items: stretch;
    flex-direction: column;
  }
  .simpleCrossRegion .simpleSecondary { width: 100%; }
  .simpleTalkGrid { grid-template-columns: 1fr; }
  .simpleTalkCard { min-height: 0; }
  .simpleTalkOrigin {
    align-items: flex-start;
    flex-direction: column;
  }
  .simpleBuildActions {
    align-items: stretch;
    flex-direction: column-reverse;
  }
  .simpleBuildActions button { width: 100%; }
  .simpleStats { grid-template-columns: 1fr; }
  .simpleStats > div {
    grid-template-columns: 1fr auto;
    align-items: baseline;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  }
  .simpleStats > div:last-child { border-bottom: 0; }
  .simplePanelHead { display: block; }
  .simpleBlend {
    margin-bottom: 20px;
    display: flex;
    align-items: baseline;
    gap: 7px;
    text-align: left;
  }
  .simpleRateRow { align-items: flex-start; }
  .simpleRateRow > strong { max-width: 145px; }
  .simpleFooter { flex-direction: column; }
}

@media (prefers-reduced-motion: reduce) {
  .simpleApp * { scroll-behavior: auto !important; transition: none !important; }
}
`;
