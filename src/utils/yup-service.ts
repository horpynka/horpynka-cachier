import * as yup from 'yup';

import { moneyService } from '@/src/utils/money-service';

class YupService {
  requiredString(message = 'Обовʼязкове поле.') {
    return yup.string().trim().required(message);
  }

  email(message = 'Некоректна електронна пошта.') {
    return this.requiredString('Введіть електронну пошту.')
      .email(message)
      .max(255, 'Електронна пошта завдовга.');
  }

  password() {
    return yup
      .string()
      .required('Введіть пароль.')
      .min(8, `Пароль повинен містити щонайменше 8 символів.`)
      .max(255, 'Пароль завдовгий.');
  }

  optionalCountedQuantity(
    message = 'Фактична кількість має бути цілим невід’ємним числом.',
  ) {
    return yup
      .string()
      .defined()
      .test('counted-quantity', message, (value) => {
        const trimmed = value.trim();

        if (trimmed === '') {
          return true;
        }

        if (!/^\d+$/.test(trimmed)) {
          return false;
        }

        return Number.isSafeInteger(Number(trimmed));
      })
  }

  money(message = 'Вкажіть суму.') {
    return this.requiredString(message).test(
      'kopecks',
      'Вкажіть коректну суму.',
      (value) => typeof value === 'string' && moneyService.toCents(value) !== null,
    );
  }
}

export const yupService = new YupService();
