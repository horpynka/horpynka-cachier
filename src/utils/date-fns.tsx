import {
  addDays,
  addMonths,
  addYears,
  compareAsc,
  compareDesc,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  formatDistance,
  formatDistanceToNow,
  formatRelative,
  isAfter,
  isBefore,
  isEqual,
  isFuture,
  isPast,
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isTomorrow,
  isValid,
  isYesterday,
  parse,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subYears,
  type FormatOptions,
  type FormatRelativeOptions,
} from 'date-fns';
import { uk } from 'date-fns/locale';

export type DateInput = Date | string | number;

export const DATE_FORMATS = {
  short: 'dd.MM.yyyy',
  long: 'd MMMM yyyy',
  withWeekday: 'EEEE, d MMMM',
  time: 'HH:mm',
  datetime: 'dd.MM.yyyy HH:mm',
  monthYear: 'LLLL yyyy',
  dayAndMonth: 'd MMMM',
} as const;

class DateFnsService {
  readonly locale = uk;

  now(): Date {
    return new Date();
  }

  today(): Date {
    return startOfDay(new Date());
  }

  toDate(value: DateInput): Date {
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string') {
      const isoDate = parseISO(value);

      if (isValid(isoDate)) {
        return isoDate;
      }

      return new Date(value);
    }

    return new Date(value);
  }

  format(
    value: DateInput,
    pattern: string = DATE_FORMATS.short,
    options?: Omit<FormatOptions, 'locale'>,
  ): string {
    return format(this.toDate(value), pattern, {
      ...options,
      locale: this.locale,
    });
  }

  formatRelative(
    value: DateInput,
    baseDate: DateInput = this.now(),
    options?: Omit<FormatRelativeOptions, 'locale'>,
  ): string {
    return formatRelative(this.toDate(value), this.toDate(baseDate), {
      ...options,
      locale: this.locale,
    });
  }

  formatDistance(
    value: DateInput,
    baseDate: DateInput = this.now(),
    options?: Omit<FormatOptions, 'locale'>,
  ): string {
    return formatDistance(this.toDate(value), this.toDate(baseDate), {
      ...options,
      locale: this.locale,
    });
  }

  formatDistanceToNow(
    value: DateInput,
    options?: Omit<FormatOptions, 'locale'>,
  ): string {
    return formatDistanceToNow(this.toDate(value), {
      ...options,
      locale: this.locale,
    });
  }

  parse(value: string, pattern: string, referenceDate: DateInput = this.now()): Date {
    return parse(value, pattern, this.toDate(referenceDate), {
      locale: this.locale,
    });
  }

  parseISO(value: string): Date {
    return parseISO(value);
  }

  isValid(value: DateInput): boolean {
    return isValid(this.toDate(value));
  }

  isToday(value: DateInput): boolean {
    return isToday(this.toDate(value));
  }

  isYesterday(value: DateInput): boolean {
    return isYesterday(this.toDate(value));
  }

  isTomorrow(value: DateInput): boolean {
    return isTomorrow(this.toDate(value));
  }

  isSameDay(left: DateInput, right: DateInput): boolean {
    return isSameDay(this.toDate(left), this.toDate(right));
  }

  isSameMonth(left: DateInput, right: DateInput): boolean {
    return isSameMonth(this.toDate(left), this.toDate(right));
  }

  isSameYear(left: DateInput, right: DateInput): boolean {
    return isSameYear(this.toDate(left), this.toDate(right));
  }

  isBefore(left: DateInput, right: DateInput): boolean {
    return isBefore(this.toDate(left), this.toDate(right));
  }

  isAfter(left: DateInput, right: DateInput): boolean {
    return isAfter(this.toDate(left), this.toDate(right));
  }

  isEqual(left: DateInput, right: DateInput): boolean {
    return isEqual(this.toDate(left), this.toDate(right));
  }

  isPast(value: DateInput): boolean {
    return isPast(this.toDate(value));
  }

  isFuture(value: DateInput): boolean {
    return isFuture(this.toDate(value));
  }

  addDays(value: DateInput, amount: number): Date {
    return addDays(this.toDate(value), amount);
  }

  subDays(value: DateInput, amount: number): Date {
    return subDays(this.toDate(value), amount);
  }

  addMonths(value: DateInput, amount: number): Date {
    return addMonths(this.toDate(value), amount);
  }

  subMonths(value: DateInput, amount: number): Date {
    return subMonths(this.toDate(value), amount);
  }

  addYears(value: DateInput, amount: number): Date {
    return addYears(this.toDate(value), amount);
  }

  subYears(value: DateInput, amount: number): Date {
    return subYears(this.toDate(value), amount);
  }

  startOfDay(value: DateInput): Date {
    return startOfDay(this.toDate(value));
  }

  endOfDay(value: DateInput): Date {
    return endOfDay(this.toDate(value));
  }

  startOfWeek(value: DateInput): Date {
    return startOfWeek(this.toDate(value), { locale: this.locale });
  }

  endOfWeek(value: DateInput): Date {
    return endOfWeek(this.toDate(value), { locale: this.locale });
  }

  startOfMonth(value: DateInput): Date {
    return startOfMonth(this.toDate(value));
  }

  endOfMonth(value: DateInput): Date {
    return endOfMonth(this.toDate(value));
  }

  differenceInDays(left: DateInput, right: DateInput): number {
    return differenceInDays(this.toDate(left), this.toDate(right));
  }

  differenceInHours(left: DateInput, right: DateInput): number {
    return differenceInHours(this.toDate(left), this.toDate(right));
  }

  differenceInMinutes(left: DateInput, right: DateInput): number {
    return differenceInMinutes(this.toDate(left), this.toDate(right));
  }

  compareAsc(left: DateInput, right: DateInput): number {
    return compareAsc(this.toDate(left), this.toDate(right));
  }

  compareDesc(left: DateInput, right: DateInput): number {
    return compareDesc(this.toDate(left), this.toDate(right));
  }
}

export const dateFns = new DateFnsService();
