export const pricing = {
  rates: { 'Косметический': 180, 'Капитальный': 330, 'Под ключ': 480 },
  housing: { 'Новостройка': 1, 'Вторичное жильё': 1.15 },
  extras: { 'Электрика': 35, 'Сантехника': 40, 'Подготовка стен': 25, 'Укладка плитки': 30 },
  range: { min: 0.9, max: 1.2 }, area: { min: 20, max: 150 },
};
export type Repair = keyof typeof pricing.rates;
export type Housing = keyof typeof pricing.housing;
export type Extra = keyof typeof pricing.extras;
export function calculate(area: number, repair: Repair, housing: Housing, extras: Extra[]) {
  const safeArea = Math.min(pricing.area.max, Math.max(pricing.area.min, Number.isFinite(area) ? area : pricing.area.min));
  const base = safeArea * (pricing.rates[repair] * pricing.housing[housing] + extras.reduce((sum, item) => sum + pricing.extras[item], 0));
  return { min: Math.round(base * pricing.range.min / 100) * 100, max: Math.round(base * pricing.range.max / 100) * 100 };
}
