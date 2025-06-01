import { toast } from "react-toastify";

export const notify = (msg, type) => {
  if (type === "warn") toast.warn(msg);
  else if (type === "success") toast.success(msg);
  else if (type === "error") toast.error(msg);
};

// دالة التحقق من صحة البيانات
export const validatePatientForm = ({
  firstname,
  lastname,
  salutation,
  dateOfBirth,
  ethnicity,
}) => {
  if (!firstname.trim()) {
    notify("Name is required", "warn");
    return false;
  }
  if (!lastname.trim()) {
    notify("Name is required", "warn");
    return false;
  }
  if (!salutation) {
    notify("Gender is required", "warn");
    return false;
  }
  if (!dateOfBirth) {
    notify("Date of Birth is required", "warn");
    return false;
  }

  // ✅ تحقق إن تاريخ الميلاد في الماضي
  const dob = new Date(dateOfBirth);
  const now = new Date();

  if (isNaN(dob.getTime())) {
    notify("Date of Birth is invalid", "warn");
    return false;
  }

  if (dob >= now) {
    notify("Date of Birth must be in the past", "warn");
    return false;
  }

  if (!ethnicity) {
    notify("Ethnicity is required", "warn");
    return false;
  }

  // ✅ لو كل حاجة تمام
  return true;
};
