/** To'liq ismdan avatar uchun bosh harflarni qaytaradi: "Aziz Karimov" → "AK" */
export function initials(name: string): string {
  return (name || '')
    .trim()
    .split(/\s+/)
    .map((w) => w[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
