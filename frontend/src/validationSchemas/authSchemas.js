import * as yup from 'yup';

export const createRegistrationSchema = (t) =>
  yup.object({
    username: yup
      .string()
      .trim()
      .required(t("reg.reqField"))
      .min(3, t("reg.usernameCondition"))
      .max(20, t("reg.usernameCondition")),

    password: yup
      .string()
      .required(t("reg.reqField"))
      .min(6, t("reg.passCondition")),

    confirmPassword: yup
      .string()
      .required(t("reg.reqField"))
      .oneOf([yup.ref("password"), null], t("reg.passDontMatch")),
  });


export const createModalSchema = (t,existingNames) => 
    yup.object({
        channelname: yup
            .string()
            .trim()
      .required(t("channel.reqField"))
      .min(3, t("channel.channelNameCondition"))
      .max(20, t("channel.channelNameCondition"))
      .notOneOf(existingNames, t("channel.uniqueChannelName"))
    });

