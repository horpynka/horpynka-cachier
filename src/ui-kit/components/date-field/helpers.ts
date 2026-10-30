import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';

export const toPickerDate = (value: string): Date => {
  const parsed = dateFns.parse(value, DATE_FORMATS.isoDate);

  return dateFns.isValid(parsed) ? parsed : dateFns.today();
};
