import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';

import type { ArchivePeriod } from './types';

export const periods: { id: ArchivePeriod; label: string }[] = [
  { id: 'all', label: 'Всі' },
  { id: 'today', label: 'Сьогодні' },
  { id: 'yesterday', label: 'Вчора' },
  { id: 'week', label: 'Тиждень' },
  { id: 'month', label: 'Місяць' },
];

export const archivePeriodRange = (period: ArchivePeriod): { from?: string; to?: string } => {
  const now = dateFns.now();
  const today = dateFns.format(now, DATE_FORMATS.isoDate);

  if (period === 'today') {
    return { from: today, to: today };
  }

  if (period === 'yesterday') {
    const yesterday = dateFns.format(dateFns.subDays(now, 1), DATE_FORMATS.isoDate);
    return { from: yesterday, to: yesterday };
  }

  if (period === 'week') {
    return { from: dateFns.format(dateFns.subDays(now, 7), DATE_FORMATS.isoDate), to: today };
  }

  if (period === 'month') {
    return { from: dateFns.format(dateFns.subDays(now, 30), DATE_FORMATS.isoDate), to: today };
  }

  return {};
};

export const archivePeriodFromRange = (range: { from?: string; to?: string }): ArchivePeriod | null => {
  const from = range.from ?? '';
  const to = range.to ?? '';

  for (const period of periods) {
    const preset = archivePeriodRange(period.id);

    if ((preset.from ?? '') === from && (preset.to ?? '') === to) {
      return period.id;
    }
  }

  return null;
};
