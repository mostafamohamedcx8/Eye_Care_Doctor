import { toast } from "react-toastify";

export const notify = (msg, type) => {
  if (type === "warn") toast.warn(msg);
  else if (type === "success") toast.success(msg);
  else if (type === "error") toast.error(msg);
};

export const validateSignupForm = ({
  firstname,
  lastname,
  email,
  password,
  passwordConfirm,
  dateOfBirthDay,
  dateOfBirthMonth,
  dateOfBirthYear,
  salutation,
  state,
  city,
  fullAddress,
  postalCode,
  t, // Add t as a parameter
}) => {
  if (!firstname.trim()) {
    notify(t("Signupvalidation.notifyFirstNameRequired"), "warn");
    return false;
  }
  if (!lastname.trim()) {
    notify(t("Signupvalidation.notifyLastNameRequired"), "warn");
    return false;
  }
  if (!email.trim()) {
    notify(t("Signupvalidation.notifyEmailRequired"), "warn");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    notify(t("Signupvalidation.notifyInvalidEmail"), "warn");
    return false;
  }
  if (!password) {
    notify(t("Signupvalidation.notifyPasswordRequired"), "warn");
    return false;
  }
  if (password.length < 6) {
    notify(t("Signupvalidation.notifyPasswordLength"), "warn");
    return false;
  }
  if (password !== passwordConfirm) {
    notify(t("Signupvalidation.notifyPasswordsMismatch"), "warn");
    return false;
  }
  if (!dateOfBirthDay || !dateOfBirthMonth || !dateOfBirthYear) {
    notify(t("Signupvalidation.notifyDateOfBirthRequired"), "warn");
    return false;
  }
  if (!salutation) {
    notify(t("Signupvalidation.notifySalutationRequired"), "warn");
    return false;
  }
  if (!state) {
    notify(t("Signupvalidation.notifyStateRequired"), "warn");
    return false;
  }
  if (!city) {
    notify(t("Signupvalidation.notifyCityRequired"), "warn");
    return false;
  }
  if (!postalCode || !/^\d{5}$/.test(postalCode)) {
    notify(t("Signupvalidation.notifyPostalCodeInvalid"), "warn");
    return false;
  }
  if (!fullAddress.trim()) {
    notify(t("Signupvalidation.notifyFullAddressRequired"), "warn");
    return false;
  }

  return true;
};

export const validateLogin = ({ email, password, t }) => {
  if (!email || email.trim() === "") {
    notify(t("Signupvalidation.notifyEmailRequired"), "warn");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    notify(t("Signupvalidation.notifyInvalidEmail"), "warn");
    return false;
  }

  if (!password || password.length < 6) {
    notify(t("Signupvalidation.notifyPasswordLength"), "warn");
    return false;
  }

  return true;
};

export const validateForgetPassword = ({ email, t }) => {
  if (!email || email.trim() === "") {
    notify(t("Signupvalidation.notifyEmailRequired"), "warn");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    notify(t("Signupvalidation.notifyInvalidEmail"), "warn");
    return false;
  }

  return true;
};

export const validationResetPassword = ({
  newpassword,
  confirmnewPassword,
  t,
}) => {
  if (!newpassword) {
    notify(t("Signupvalidation.notifyPasswordRequired"), "warn");
    return false;
  }
  if (newpassword.length < 6) {
    notify(t("Signupvalidation.notifyPasswordLength"), "warn");
    return false;
  }
  if (newpassword !== confirmnewPassword) {
    notify(t("Signupvalidation.notifyPasswordsMismatch"), "warn");
    return false;
  }
  return true;
};
