// Stats NZ, Local Authority Financial Statistics: financial position,
// year ended 30 June 2024. Council-only figures, excluding CCOs.
// Source values are published in $000; values below are converted to dollars.
// https://www.stats.govt.nz/information-releases/local-authority-financial-statistics-year-ended-june-2024/
export const NET_ASSETS_2024 = {
  farnorth: { assets: 2772994000, liabilities: 170582000 },
  whangarei: { assets: 2805602000, liabilities: 319828000 },
  kaipara: { assets: 1191620000, liabilities: 78192000 },
  auckland: { assets: 50282000000, liabilities: 15875000000 },
  thames: { assets: 2251411000, liabilities: 114362000 },
  hauraki: { assets: 876534000, liabilities: 116639000 },
  waikatod: { assets: 2776770000, liabilities: 265860000 },
  matamata: { assets: 1041981000, liabilities: 83777000 },
  hamilton: { assets: 6765782000, liabilities: 1205658000 },
  waipa: { assets: 2681642000, liabilities: 351743000 },
  otorohanga: { assets: 427986000, liabilities: 16939000 },
  swaikato: { assets: 640662000, liabilities: 55897000 },
  waitomo: { assets: 711273000, liabilities: 41767000 },
  taupo: { assets: 2156498000, liabilities: 231909000 },
  wbop: { assets: 1949343000, liabilities: 156204000 },
  tauranga: { assets: 7820214000, liabilities: 1326499000 },
  rotorua: { assets: 2256862000, liabilities: 499291000 },
  whakatane: { assets: 1386004000, liabilities: 185537000 },
  kawerau: { assets: 119505000, liabilities: 17144000 },
  opotiki: { assets: 346857000, liabilities: 14136000 },
  gisborne: { assets: 2976707000, liabilities: 261524000 },
  wairoa: { assets: 535881000, liabilities: 33816000 },
  hastings: { assets: 3381175000, liabilities: 476045000 },
  napier: { assets: 2486523000, liabilities: 53894000 },
  chb: { assets: 1102638000, liabilities: 65202000 },
  newplymouth: { assets: 4022419000, liabilities: 397623000 },
  stratford: { assets: 534717000, liabilities: 40882000 },
  staranaki: { assets: 1470603000, liabilities: 169038000 },
  ruapehu: { assets: 602412000, liabilities: 66191000 },
  whanganui: { assets: 1553606000, liabilities: 205418000 },
  rangitikei: { assets: 806154000, liabilities: 50614000 },
  manawatu: { assets: 1215994000, liabilities: 111905000 },
  palmy: { assets: 2365474000, liabilities: 316890000 },
  tararua: { assets: 1219460000, liabilities: 89777000 },
  horowhenua: { assets: 1033043000, liabilities: 232128000 },
  kapiti: { assets: 2416162000, liabilities: 365885000 },
  porirua: { assets: 2344336000, liabilities: 328848000 },
  upperhutt: { assets: 1634870000, liabilities: 197141000 },
  hutt: { assets: 3611816000, liabilities: 572291000 },
  wellington: { assets: 12209905000, liabilities: 1873122000 },
  masterton: { assets: 1175577000, liabilities: 77664000 },
  carterton: { assets: 299872000, liabilities: 29881000 },
  swairarapa: { assets: 654281000, liabilities: 33286000 },
  tasman: { assets: 2727241000, liabilities: 408821000 },
  nelson: { assets: 2540685000, liabilities: 306147000 },
  marlborough: { assets: 2483564000, liabilities: 247217000 },
  buller: { assets: 582093000, liabilities: 56005000 },
  grey: { assets: 588317000, liabilities: 42577000 },
  westland: { assets: 572055000, liabilities: 45428000 },
  kaikoura: { assets: 317772000, liabilities: 17237000 },
  hurunui: { assets: 768794000, liabilities: 80928000 },
  waimakariri: { assets: 2855612000, liabilities: 229403000 },
  christchurch: { assets: 20836748000, liabilities: 2784881000 },
  selwyn: { assets: 3061730000, liabilities: 237098000 },
  ashburton: { assets: 1124563000, liabilities: 146120000 },
  timaru: { assets: 2030128000, liabilities: 258320000 },
  mackenzie: { assets: 425457000, liabilities: 27918000 },
  waimate: { assets: 540660000, liabilities: 9951000 },
  waitaki: { assets: 1324561000, liabilities: 85607000 },
  centralotago: { assets: 1200485000, liabilities: 45737000 },
  qldc: { assets: 3222826000, liabilities: 711214000 },
  dunedin: { assets: 5025332000, liabilities: 676562000 },
  clutha: { assets: 1941673000, liabilities: 138475000 },
  southlandd: { assets: 2309842000, liabilities: 63687000 },
  gore: { assets: 552716000, liabilities: 59688000 },
  invercargill: { assets: 1376630000, liabilities: 173594000 },
  chathams: { assets: 101744000, liabilities: 3236000 },
};

const hasFinancialPosition = (council) =>
  Number.isFinite(council?.assets24) &&
  Number.isFinite(council?.liabilities24) &&
  Number.isFinite(council?.pop) &&
  council.pop > 0;

export function calculateNetAssetsPerCapita(members) {
  const usable = members.filter(hasFinancialPosition);
  if (usable.length < 2 || usable.length !== members.length) {
    return {
      mergedPerResident: null,
      mergedLiabilitiesPerResident: null,
      totalAssets: null,
      totalLiabilities: null,
      totalNetAssets: null,
      rows: [],
      liabilityRows: [],
      missing: members.filter((member) => !hasFinancialPosition(member)),
    };
  }

  const totalPopulation = usable.reduce((sum, member) => sum + member.pop, 0);
  const totalAssets = usable.reduce((sum, member) => sum + member.assets24, 0);
  const totalLiabilities = usable.reduce(
    (sum, member) => sum + member.liabilities24,
    0
  );
  const totalNetAssets = totalAssets - totalLiabilities;
  const mergedPerResident = totalNetAssets / totalPopulation;
  const mergedLiabilitiesPerResident = totalLiabilities / totalPopulation;
  const rows = usable
    .map((council) => {
      const before = (council.assets24 - council.liabilities24) / council.pop;
      return {
        council,
        before,
        after: mergedPerResident,
        change: mergedPerResident - before,
        liabilitiesPerResident: council.liabilities24 / council.pop,
      };
    })
    .sort((a, b) => b.change - a.change);
  const liabilityRows = usable
    .map((council) => {
      const before = council.liabilities24 / council.pop;
      return {
        council,
        before,
        after: mergedLiabilitiesPerResident,
        change: mergedLiabilitiesPerResident - before,
      };
    })
    .sort((a, b) => b.change - a.change);

  return {
    mergedPerResident,
    mergedLiabilitiesPerResident,
    totalAssets,
    totalLiabilities,
    totalNetAssets,
    rows,
    liabilityRows,
    missing: [],
  };
}
