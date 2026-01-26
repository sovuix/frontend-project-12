import * as yup from 'yup';

export const registrationSchema = yup.object({
    username: yup
        .string()
        .trim()
        .required('Обязательное поле')
        .min(3, 'Не менее 3 символов')
        .max(50, 'Не более 20 символов'),

    password: yup
        .string()
        .required('Обязательное поле')
        .min(6, 'Не менее 6 символов'),

    confirmPassword: yup
        .string()
        .required('Подтвердите пароль')
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают'), // сравниваем с password
});

export const createModalSchema = (existingNames = []) => {
    return yup.object({
        channelname: yup
            .string()
            .trim()
            .required('Обязательное поле')
            .min(3, 'Не менее 3 символов')
            .max(50, 'Не более 20 символов')
            .notOneOf(existingNames, 'Название должно быть уникальным'),
    });
};
