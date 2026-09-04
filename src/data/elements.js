/**
 * 元素数据：IUPAC 1–18 族 + 中学常用相对原子质量（近似值）
 * groupCn：中国中学教材常用主族/副族标注
 */
export const elements = [
  // Period 1
  { z: 1, symbol: 'H', en: 'Hydrogen', zh: '氢', ar: 1, group: 1, period: 1, category: 'nonmetal', groupCn: 'IA' },
  { z: 2, symbol: 'He', en: 'Helium', zh: '氦', ar: 4, group: 18, period: 1, category: 'noble', groupCn: '0' },
  // Period 2
  { z: 3, symbol: 'Li', en: 'Lithium', zh: '锂', ar: 7, group: 1, period: 2, category: 'metal', groupCn: 'IA' },
  { z: 4, symbol: 'Be', en: 'Beryllium', zh: '铍', ar: 9, group: 2, period: 2, category: 'metal', groupCn: 'IIA' },
  { z: 5, symbol: 'B', en: 'Boron', zh: '硼', ar: 11, group: 13, period: 2, category: 'metalloid', groupCn: 'IIIA' },
  { z: 6, symbol: 'C', en: 'Carbon', zh: '碳', ar: 12, group: 14, period: 2, category: 'nonmetal', groupCn: 'IVA' },
  { z: 7, symbol: 'N', en: 'Nitrogen', zh: '氮', ar: 14, group: 15, period: 2, category: 'nonmetal', groupCn: 'VA' },
  { z: 8, symbol: 'O', en: 'Oxygen', zh: '氧', ar: 16, group: 16, period: 2, category: 'nonmetal', groupCn: 'VIA' },
  { z: 9, symbol: 'F', en: 'Fluorine', zh: '氟', ar: 19, group: 17, period: 2, category: 'nonmetal', groupCn: 'VIIA' },
  { z: 10, symbol: 'Ne', en: 'Neon', zh: '氖', ar: 20, group: 18, period: 2, category: 'noble', groupCn: '0' },
  // Period 3
  { z: 11, symbol: 'Na', en: 'Sodium', zh: '钠', ar: 23, group: 1, period: 3, category: 'metal', groupCn: 'IA' },
  { z: 12, symbol: 'Mg', en: 'Magnesium', zh: '镁', ar: 24, group: 2, period: 3, category: 'metal', groupCn: 'IIA' },
  { z: 13, symbol: 'Al', en: 'Aluminium', zh: '铝', ar: 27, group: 13, period: 3, category: 'metal', groupCn: 'IIIA' },
  { z: 14, symbol: 'Si', en: 'Silicon', zh: '硅', ar: 28, group: 14, period: 3, category: 'metalloid', groupCn: 'IVA' },
  { z: 15, symbol: 'P', en: 'Phosphorus', zh: '磷', ar: 31, group: 15, period: 3, category: 'nonmetal', groupCn: 'VA' },
  { z: 16, symbol: 'S', en: 'Sulfur', zh: '硫', ar: 32, group: 16, period: 3, category: 'nonmetal', groupCn: 'VIA' },
  { z: 17, symbol: 'Cl', en: 'Chlorine', zh: '氯', ar: 35.5, group: 17, period: 3, category: 'nonmetal', groupCn: 'VIIA' },
  { z: 18, symbol: 'Ar', en: 'Argon', zh: '氩', ar: 40, group: 18, period: 3, category: 'noble', groupCn: '0' },
  // Period 4
  { z: 19, symbol: 'K', en: 'Potassium', zh: '钾', ar: 39, group: 1, period: 4, category: 'metal', groupCn: 'IA' },
  { z: 20, symbol: 'Ca', en: 'Calcium', zh: '钙', ar: 40, group: 2, period: 4, category: 'metal', groupCn: 'IIA' },
  { z: 21, symbol: 'Sc', en: 'Scandium', zh: '钪', ar: 45, group: 3, period: 4, category: 'transition', groupCn: 'IIIB' },
  { z: 22, symbol: 'Ti', en: 'Titanium', zh: '钛', ar: 48, group: 4, period: 4, category: 'transition', groupCn: 'IVB' },
  { z: 23, symbol: 'V', en: 'Vanadium', zh: '钒', ar: 51, group: 5, period: 4, category: 'transition', groupCn: 'VB' },
  { z: 24, symbol: 'Cr', en: 'Chromium', zh: '铬', ar: 52, group: 6, period: 4, category: 'transition', groupCn: 'VIB' },
  { z: 25, symbol: 'Mn', en: 'Manganese', zh: '锰', ar: 55, group: 7, period: 4, category: 'transition', groupCn: 'VIIB' },
  { z: 26, symbol: 'Fe', en: 'Iron', zh: '铁', ar: 56, group: 8, period: 4, category: 'transition', groupCn: 'VIII' },
  { z: 27, symbol: 'Co', en: 'Cobalt', zh: '钴', ar: 59, group: 9, period: 4, category: 'transition', groupCn: 'VIII' },
  { z: 28, symbol: 'Ni', en: 'Nickel', zh: '镍', ar: 59, group: 10, period: 4, category: 'transition', groupCn: 'VIII' },
  { z: 29, symbol: 'Cu', en: 'Copper', zh: '铜', ar: 64, group: 11, period: 4, category: 'transition', groupCn: 'IB' },
  { z: 30, symbol: 'Zn', en: 'Zinc', zh: '锌', ar: 65, group: 12, period: 4, category: 'transition', groupCn: 'IIB' },
  { z: 31, symbol: 'Ga', en: 'Gallium', zh: '镓', ar: 70, group: 13, period: 4, category: 'metal', groupCn: 'IIIA' },
  { z: 32, symbol: 'Ge', en: 'Germanium', zh: '锗', ar: 73, group: 14, period: 4, category: 'metalloid', groupCn: 'IVA' },
  { z: 33, symbol: 'As', en: 'Arsenic', zh: '砷', ar: 75, group: 15, period: 4, category: 'metalloid', groupCn: 'VA' },
  { z: 34, symbol: 'Se', en: 'Selenium', zh: '硒', ar: 79, group: 16, period: 4, category: 'nonmetal', groupCn: 'VIA' },
  { z: 35, symbol: 'Br', en: 'Bromine', zh: '溴', ar: 80, group: 17, period: 4, category: 'nonmetal', groupCn: 'VIIA' },
  { z: 36, symbol: 'Kr', en: 'Krypton', zh: '氪', ar: 84, group: 18, period: 4, category: 'noble', groupCn: '0' },
  // Period 5（常用）
  { z: 37, symbol: 'Rb', en: 'Rubidium', zh: '铷', ar: 85, group: 1, period: 5, category: 'metal', groupCn: 'IA' },
  { z: 38, symbol: 'Sr', en: 'Strontium', zh: '锶', ar: 88, group: 2, period: 5, category: 'metal', groupCn: 'IIA' },
  { z: 47, symbol: 'Ag', en: 'Silver', zh: '银', ar: 108, group: 11, period: 5, category: 'transition', groupCn: 'IB' },
  { z: 48, symbol: 'Cd', en: 'Cadmium', zh: '镉', ar: 112, group: 12, period: 5, category: 'transition', groupCn: 'IIB' },
  { z: 50, symbol: 'Sn', en: 'Tin', zh: '锡', ar: 119, group: 14, period: 5, category: 'metal', groupCn: 'IVA' },
  { z: 53, symbol: 'I', en: 'Iodine', zh: '碘', ar: 127, group: 17, period: 5, category: 'nonmetal', groupCn: 'VIIA' },
  { z: 54, symbol: 'Xe', en: 'Xenon', zh: '氙', ar: 131, group: 18, period: 5, category: 'noble', groupCn: '0' },
  // Period 6（常用）
  { z: 55, symbol: 'Cs', en: 'Caesium', zh: '铯', ar: 133, group: 1, period: 6, category: 'metal', groupCn: 'IA' },
  { z: 56, symbol: 'Ba', en: 'Barium', zh: '钡', ar: 137, group: 2, period: 6, category: 'metal', groupCn: 'IIA' },
  { z: 79, symbol: 'Au', en: 'Gold', zh: '金', ar: 197, group: 11, period: 6, category: 'transition', groupCn: 'IB' },
  { z: 80, symbol: 'Hg', en: 'Mercury', zh: '汞', ar: 201, group: 12, period: 6, category: 'transition', groupCn: 'IIB' },
  { z: 82, symbol: 'Pb', en: 'Lead', zh: '铅', ar: 207, group: 14, period: 6, category: 'metal', groupCn: 'IVA' },
];

/** IUPAC 族号 → 中国中学主族/副族标注 */
export const GROUP_LABELS = [
  { iupac: 1, cn: 'IA', note: '主族' },
  { iupac: 2, cn: 'IIA', note: '主族' },
  { iupac: 3, cn: 'IIIB', note: '副族' },
  { iupac: 4, cn: 'IVB', note: '副族' },
  { iupac: 5, cn: 'VB', note: '副族' },
  { iupac: 6, cn: 'VIB', note: '副族' },
  { iupac: 7, cn: 'VIIB', note: '副族' },
  { iupac: 8, cn: 'VIII', note: '副族' },
  { iupac: 9, cn: 'VIII', note: '副族' },
  { iupac: 10, cn: 'VIII', note: '副族' },
  { iupac: 11, cn: 'IB', note: '副族' },
  { iupac: 12, cn: 'IIB', note: '副族' },
  { iupac: 13, cn: 'IIIA', note: '主族' },
  { iupac: 14, cn: 'IVA', note: '主族' },
  { iupac: 15, cn: 'VA', note: '主族' },
  { iupac: 16, cn: 'VIA', note: '主族' },
  { iupac: 17, cn: 'VIIA', note: '主族' },
  { iupac: 18, cn: '0', note: '主族' },
];

export const coreElements = elements.filter((e) =>
  ['H', 'He', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'K', 'Ca', 'Fe', 'Cu', 'Zn', 'Ag', 'I', 'Ba'].includes(e.symbol)
);

export const compounds = [
  { formula: 'H₂O', en: 'water', zh: '水', mr: 18 },
  { formula: 'CO₂', en: 'carbon dioxide', zh: '二氧化碳', mr: 44 },
  { formula: 'O₂', en: 'oxygen', zh: '氧气', mr: 32 },
  { formula: 'N₂', en: 'nitrogen', zh: '氮气', mr: 28 },
  { formula: 'H₂', en: 'hydrogen', zh: '氢气', mr: 2 },
  { formula: 'NaCl', en: 'sodium chloride', zh: '氯化钠', mr: 58.5 },
  { formula: 'CaCO₃', en: 'calcium carbonate', zh: '碳酸钙', mr: 100 },
  { formula: 'Ca(OH)₂', en: 'calcium hydroxide', zh: '氢氧化钙', mr: 74 },
  { formula: 'HCl', en: 'hydrogen chloride', zh: '氯化氢', mr: 36.5 },
  { formula: 'H₂SO₄', en: 'sulfuric acid', zh: '硫酸', mr: 98 },
  { formula: 'NaOH', en: 'sodium hydroxide', zh: '氢氧化钠', mr: 40 },
  { formula: 'Fe₂O₃', en: 'iron(III) oxide', zh: '氧化铁', mr: 160 },
  { formula: 'CuO', en: 'copper(II) oxide', zh: '氧化铜', mr: 80 },
  { formula: 'MgO', en: 'magnesium oxide', zh: '氧化镁', mr: 40 },
  { formula: 'CH₄', en: 'methane', zh: '甲烷', mr: 16 },
  { formula: 'NH₃', en: 'ammonia', zh: '氨', mr: 17 },
  { formula: 'SO₂', en: 'sulfur dioxide', zh: '二氧化硫', mr: 64 },
  { formula: 'HNO₃', en: 'nitric acid', zh: '硝酸', mr: 63 },
  { formula: 'KCl', en: 'potassium chloride', zh: '氯化钾', mr: 74.5 },
  { formula: 'FeCl₃', en: 'iron(III) chloride', zh: '氯化铁', mr: 162.5 },
];

/** 生成标准周期表格子（18 列 × 周期行，含族标题） */
export function buildPeriodicGrid() {
  const byKey = new Map(elements.map((e) => [`${e.period}-${e.group}`, e]));
  const maxPeriod = 6;
  const cells = [];
  for (let p = 1; p <= maxPeriod; p++) {
    for (let g = 1; g <= 18; g++) {
      // 第 6 周期中间大量镧系空位：仅显示有数据的格子，其余留空占位
      const el = byKey.get(`${p}-${g}`) || null;
      cells.push({ period: p, group: g, element: el });
    }
  }
  return cells;
}
