import * as yup from 'yup';

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
}

export const yupService = new YupService();
