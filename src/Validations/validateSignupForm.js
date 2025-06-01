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
  Specialty,
  fullAddress,
  postalCode,
}) => {
  if (!firstname.trim()) {
    notify("First name is required", "warn");
    return false;
  }
  if (!lastname.trim()) {
    notify("Last name is required", "warn");
    return false;
  }
  if (!email.trim()) {
    notify("Email is required", "warn");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    notify("Invalid email format", "warn");
    return false;
  }
  if (!password) {
    notify("Password is required", "warn");
    return false;
  }
  if (password.length < 6) {
    notify("Password must be at least 6 characters", "warn");
    return false;
  }
  if (password !== passwordConfirm) {
    notify("Passwords do not match", "warn");
    return false;
  }
  if (!Specialty) {
    notify("Specialty is required", "warn");
    return false;
  }
  if (!dateOfBirthDay || !dateOfBirthMonth || !dateOfBirthYear) {
    notify("Complete Date of Birth is required", "warn");
    return false;
  }
  if (!salutation) {
    notify("salutation is required", "warn");
    return false;
  }
  if (!state) {
    notify("State is required", "warn");
    return false;
  }
  if (!city) {
    notify("City is required", "warn");
    return false;
  }
  if (!postalCode || !/^\d{5}$/.test(postalCode)) {
    notify("Postal Code must be exactly 5 digits", "warn");
    return false;
  }
  if (!fullAddress.trim()) {
    notify("Full address is required", "warn");
    return false;
  }

  return true;
};

export const validateLogin = ({ email, password, role }) => {
  // فحص الإيميل
  if (!email || email.trim() === "") {
    notify("Email is required", "warn");
    return false;
  }

  // صيغة الإيميل
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    notify("Invalid email format", "warn");
    return false;
  }

  // فحص كلمة المرور
  if (!password || password.length < 6) {
    notify("Password must be at least 6 characters", "warn");
    return false;
  }

  return true;
};

export const validateForgetPassword = ({ email, password, role }) => {
  // فحص الإيميل
  if (!email || email.trim() === "") {
    notify("Email is required", "warn");
    return false;
  }

  // صيغة الإيميل
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    notify("Invalid email format", "warn");
    return false;
  }

  return true;
};

export const validationResetPassword = ({
  newpassword,
  confirmnewPassword,
}) => {
  if (!newpassword) {
    notify("Password is required", "warn");
    return false;
  }
  if (newpassword.length < 6) {
    notify("Password must be at least 6 characters", "warn");
    return false;
  }
  if (newpassword !== confirmnewPassword) {
    notify("Passwords do not match", "warn");
    return false;
  }
  return true;
};
