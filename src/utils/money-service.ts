class MoneyService {
  toMoney(cents: number): string {
    const normalized = Number.isFinite(cents) ? Math.trunc(cents) : 0;
    const sign = normalized < 0 ? '-' : '';
    const absolute = Math.abs(normalized);
    const hryvnia = Math.floor(absolute / 100);
    const kopiyky = absolute % 100;

    return `${sign}${hryvnia}.${kopiyky.toString().padStart(2, '0')} ₴`;
  }
}

export const moneyService = new MoneyService();