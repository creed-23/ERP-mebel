/**
 * CSS custom-property rangini haqiqiy rgb qiymatga aylantiradi.
 * ApexCharts var(--...) ni tushunmaydi, shuning uchun probe element
 * orqali resolve qilamiz (theme almashganda qayta chaqiriladi).
 */
function resolve(expr: string): string {
  const el = document.createElement('span');
  el.style.color = expr;
  el.style.display = 'none';
  document.body.appendChild(el);
  const rgb = getComputedStyle(el).color;
  el.remove();
  return rgb || expr;
}

export interface ThemeChartColors {
  primary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  purple: string;
  teal: string;
  text: string;
  textMuted: string;
  border: string;
  card: string;
}

export function readChartColors(): ThemeChartColors {
  return {
    primary: resolve('var(--color-primary)'),
    success: resolve('var(--color-success)'),
    warning: resolve('var(--color-warning)'),
    danger: resolve('var(--color-danger)'),
    info: resolve('var(--color-info)'),
    purple: '#7c3aed',
    teal: '#0d9488',
    text: resolve('var(--color-text-primary)'),
    textMuted: resolve('var(--color-text-secondary)'),
    border: resolve('var(--color-border)'),
    card: resolve('var(--color-bg-elevated)'),
  };
}
