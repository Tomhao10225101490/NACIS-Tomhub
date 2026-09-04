/** 常见元素：符号、中英文名、原子序数、相对原子质量（中学常用近似值） */
export const elements = [
  { z: 1, symbol: 'H', en: 'Hydrogen', zh: '氢', ar: 1, group: 1, period: 1, category: 'nonmetal' },
  { z: 2, symbol: 'He', en: 'Helium', zh: '氦', ar: 4, group: 18, period: 1, category: 'noble' },
  { z: 3, symbol: 'Li', en: 'Lithium', zh: '锂', ar: 7, group: 1, period: 2, category: 'metal' },
  { z: 4, symbol: 'Be', en: 'Beryllium', zh: '铍', ar: 9, group: 2, period: 2, category: 'metal' },
  { z: 5, symbol: 'B', en: 'Boron', zh: '硼', ar: 11, group: 13, period: 2, category: 'metalloid' },
  { z: 6, symbol: 'C', en: 'Carbon', zh: '碳', ar: 12, group: 14, period: 2, category: 'nonmetal' },
  { z: 7, symbol: 'N', en: 'Nitrogen', zh: '氮', ar: 14, group: 15, period: 2, category: 'nonmetal' },
  { z: 8, symbol: 'O', en: 'Oxygen', zh: '氧', ar: 16, group: 16, period: 2, category: 'nonmetal' },
  { z: 9, symbol: 'F', en: 'Fluorine', zh: '氟', ar: 19, group: 17, period: 2, category: 'nonmetal' },
  { z: 10, symbol: 'Ne', en: 'Neon', zh: '氖', ar: 20, group: 18, period: 2, category: 'noble' },
  { z: 11, symbol: 'Na', en: 'Sodium', zh: '钠', ar: 23, group: 1, period: 3, category: 'metal' },
  { z: 12, symbol: 'Mg', en: 'Magnesium', zh: '镁', ar: 24, group: 2, period: 3, category: 'metal' },
  { z: 13, symbol: 'Al', en: 'Aluminium', zh: '铝', ar: 27, group: 13, period: 3, category: 'metal' },
  { z: 14, symbol: 'Si', en: 'Silicon', zh: '硅', ar: 28, group: 14, period: 3, category: 'metalloid' },
  { z: 15, symbol: 'P', en: 'Phosphorus', zh: '磷', ar: 31, group: 15, period: 3, category: 'nonmetal' },
  { z: 16, symbol: 'S', en: 'Sulfur', zh: '硫', ar: 32, group: 16, period: 3, category: 'nonmetal' },
  { z: 17, symbol: 'Cl', en: 'Chlorine', zh: '氯', ar: 35.5, group: 17, period: 3, category: 'nonmetal' },
  { z: 18, symbol: 'Ar', en: 'Argon', zh: '氩', ar: 40, group: 18, period: 3, category: 'noble' },
  { z: 19, symbol: 'K', en: 'Potassium', zh: '钾', ar: 39, group: 1, period: 4, category: 'metal' },
  { z: 20, symbol: 'Ca', en: 'Calcium', zh: '钙', ar: 40, group: 2, period: 4, category: 'metal' },
  { z: 24, symbol: 'Cr', en: 'Chromium', zh: '铬', ar: 52, group: 6, period: 4, category: 'metal' },
  { z: 25, symbol: 'Mn', en: 'Manganese', zh: '锰', ar: 55, group: 7, period: 4, category: 'metal' },
  { z: 26, symbol: 'Fe', en: 'Iron', zh: '铁', ar: 56, group: 8, period: 4, category: 'metal' },
  { z: 29, symbol: 'Cu', en: 'Copper', zh: '铜', ar: 64, group: 11, period: 4, category: 'metal' },
  { z: 30, symbol: 'Zn', en: 'Zinc', zh: '锌', ar: 65, group: 12, period: 4, category: 'metal' },
  { z: 35, symbol: 'Br', en: 'Bromine', zh: '溴', ar: 80, group: 17, period: 4, category: 'nonmetal' },
  { z: 47, symbol: 'Ag', en: 'Silver', zh: '银', ar: 108, group: 11, period: 5, category: 'metal' },
  { z: 53, symbol: 'I', en: 'Iodine', zh: '碘', ar: 127, group: 17, period: 5, category: 'nonmetal' },
  { z: 56, symbol: 'Ba', en: 'Barium', zh: '钡', ar: 137, group: 2, period: 6, category: 'metal' },
  { z: 80, symbol: 'Hg', en: 'Mercury', zh: '汞', ar: 201, group: 12, period: 6, category: 'metal' },
  { z: 82, symbol: 'Pb', en: 'Lead', zh: '铅', ar: 207, group: 14, period: 6, category: 'metal' },
];

/** 初中必须熟练掌握的核心元素（默认真空/测验优先） */
export const coreElements = elements.filter((e) =>
  ['H', 'He', 'C', 'N', 'O', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'K', 'Ca', 'Fe', 'Cu', 'Zn', 'Ag'].includes(e.symbol)
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
];
