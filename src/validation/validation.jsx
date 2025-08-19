import { CToast } from "../components/common/toast/CToast";

export function checkRequiredFields(fields, data) {
  const requiredFieldsKeys = fields
    .filter((f) => f.required)
    .map((f) => f.name);
  const requiredData = requiredFieldsKeys.filter(
    (rf) => data[rf].length >= 1 || data[rf] >= 1
  );
  if (requiredData.length === requiredFieldsKeys.length) return true;

  return false;
}
export const regexValidation = (data, pattern, message) => {
  if (!data.match(pattern)) {
    CToast("error", message);
    return false;
  }
  return true;
};

export const conditionalValidation = (condition, message) => {
  if (!condition) {
    CToast("error", message);

    return false;
  }
  return true;
};
