class MoneyService {
  toMoney(cents: number): string {
    const normalized = Number.isFinite(cents) ? Math.trunc(cents) : 0;
    const sign = normalized < 0 ? '-' : '';
    const absolute = Math.abs(normalized);
    const hryvnia = Math.floor(absolute / 100);
    const kopiyky = absolute % 100;

    return `${sign}${hryvnia}.${kopiyky.toString().padStart(2, '0')} ₴`;
  }

  toCents(value: string): number | null {
    const normalized = value.trim().replace(',', '.');

    if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
      return null;
    }

    const [hryvnia, fraction = ''] = normalized.split('.');
    const cents = Number(hryvnia) * 100 + Number(fraction.padEnd(2, '0'));

    return Number.isSafeInteger(cents) ? cents : null;
  }
}

export const moneyService = new MoneyService();
